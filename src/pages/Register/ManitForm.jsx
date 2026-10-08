import React, { useState, useRef } from 'react';
import { CYBERPULSE } from '../../cyberpulse.config';
import SuccessCard from './SuccessCard';

function Field({ label, required, hint, error, children }) {
  return (
    <div className="cp-field">
      <label>{label}{required && <b> *</b>}</label>
      {children}
      {hint && !error && <p className="cp-field-hint">{hint}</p>}
      {error && <p className="cp-field-error" role="alert">⚠ {error}</p>}
    </div>
  );
}

function validate(fields) {
  const errs = {};
  if (!fields.name?.trim()) errs.name = 'Full name is required.';
  if (!fields.email?.trim() || !/^\S+@\S+\.\S+$/.test(fields.email)) {
    errs.email = 'Valid email is required.';
  } else {
    const domains = CYBERPULSE.registration.allowedManitDomains || [];
    if (domains.length > 0) {
      const emailDomain = fields.email.substring(fields.email.lastIndexOf('@')).toLowerCase();
      if (!domains.some(d => emailDomain === d.toLowerCase())) {
        errs.email = `Must use a college email (${domains.join(', ')}).`;
      }
    }
  }
  
  if (!fields.phone?.trim()) {
    errs.phone = 'Phone number is required.';
  } else {
    const digits = fields.phone.replace(/\D/g, '').replace(/^91/, '');
    if (digits.length !== 10) errs.phone = 'Enter a valid 10-digit Indian phone number.';
  }
  
  const pat = CYBERPULSE.registration.scholarPattern;
  if (!fields.scholar?.trim()) {
    errs.scholar = 'Scholar number is required.';
  } else if (pat && !pat.test(fields.scholar.trim())) {
    errs.scholar = 'Invalid scholar number format.';
  } else if (!errs.email && fields.email) {
    const emailPrefix = fields.email.substring(0, fields.email.indexOf('@')).toLowerCase();
    if (emailPrefix !== fields.scholar.trim().toLowerCase()) {
      errs.scholar = 'Scholar number must match the email prefix.';
    }
  }
  
  if (!fields.year) errs.year = 'Please select your year.';
  if (!fields.branch) errs.branch = 'Please select your branch.';
  return errs;
}

export default function ManitForm({ onClose }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', scholar: '', year: '', branch: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');
  const [regId, setRegId] = useState('');
  const submittingRef = useRef(false);

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const handleBlur = (k) => {
    const errs = validate(fields);
    if (errs[k]) setErrors(e => ({ ...e, [k]: errs[k] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setTimeout(() => {
        const firstBad = document.querySelector('.cp-field input.error, .cp-field select.error');
        firstBad?.focus();
      }, 50);
      return;
    }

    submittingRef.current = true;
    setStatus('loading');
    try {
      const id = 'CP-2026-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      const payload = {
        regId: id,
        type: 'manit',
        name: fields.name,
        email: fields.email,
        phone: fields.phone.replace(/\D/g, '').slice(-10),
        scholar: fields.scholar,
        college: 'MANIT',
        year: fields.year,
        branch: fields.branch,
        isManit: true,
        _hp: '',
        submittedAt: new Date().toISOString(),
      };

      const endpoint = CYBERPULSE.registration.endpoints.manit;
      const commonEndpoint = CYBERPULSE.registration.endpoints.common;
      
      if (!endpoint || !commonEndpoint) {
        console.warn('[CYBERPULSE] No registration endpoint configured. Set CYBERPULSE.registration.endpoints in cyberpulse.config.js');
        await new Promise(r => setTimeout(r, 1200));
      } else {
        const fetchOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        };
        
        // Submit to both specific and common endpoints concurrently
        const [res] = await Promise.all([
          fetch(endpoint, fetchOptions),
          fetch(commonEndpoint, fetchOptions).catch(e => console.error('Common endpoint failed', e))
        ]);
        
        const result = await res.json();
        if (result.status === 'error') throw new Error('Google Script Error: ' + result.message);
      }

      setRegId(id);
      setStatus('success');
    } catch (err) {
      submittingRef.current = false;
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <SuccessCard
        regId={regId}
        name={fields.name}
        email={fields.email}
        isManit={true}
        onClose={onClose}
      />
    );
  }

  const { yearOptions, branchOptions } = CYBERPULSE.registration;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form className="cp-form" onSubmit={handleSubmit} noValidate>
      <div className="cp-hp" aria-hidden="true">
        <input type="text" name="_hp" tabIndex="-1" autoComplete="off" />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <span className="cp-badge-free" style={{ fontSize: '.85rem', padding: '.3rem 1rem' }}>FREE FOR MANIT STUDENTS</span>
        <p style={{ color: '#999', marginTop: '.75rem', fontSize: '.88rem' }}>
          Fill in your details below. No payment required.
        </p>
      </div>

      {hasErrors && (
        <div className="cp-error-banner" role="alert" aria-live="assertive">
          Please fix the errors below before submitting.
        </div>
      )}

      <Field label="Full Name" required hint="" error={errors.name}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={fields.name}
          onChange={e => set('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={errors.name ? 'error' : ''}
          placeholder="John Doe"
          aria-describedby={errors.name ? 'err-name' : undefined}
        />
      </Field>

      <Field
        label="Email Address"
        required
        hint={CYBERPULSE.registration.allowedManitDomains?.length > 0 ? `Must end with ${CYBERPULSE.registration.allowedManitDomains.join(', ')}` : "You can use any valid email"}
        error={errors.email}
      >
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={fields.email}
          onChange={e => set('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={errors.email ? 'error' : ''}
          placeholder="yourname@gmail.com"
        />
      </Field>

      <div className="cp-form-row">
        <Field label="Phone Number" required error={errors.phone}>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={fields.phone}
            onChange={e => set('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={errors.phone ? 'error' : ''}
            placeholder="+91 98765 43210"
          />
        </Field>
        <Field label="Scholar Number" required error={errors.scholar}>
          <input
            type="text"
            name="scholar"
            autoComplete="off"
            value={fields.scholar}
            onChange={e => set('scholar', e.target.value)}
            onBlur={() => handleBlur('scholar')}
            className={errors.scholar ? 'error' : ''}
            placeholder="e.g. 202101001"
          />
        </Field>
      </div>

      <div className="cp-form-row">
        <Field label="Year" required error={errors.year}>
          <select
            name="year"
            value={fields.year}
            onChange={e => set('year', e.target.value)}
            onBlur={() => handleBlur('year')}
            className={errors.year ? 'error' : ''}
          >
            <option value="">Select Year</option>
            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
        <Field label="Branch / Course" required error={errors.branch}>
          <select
            name="branch"
            value={fields.branch}
            onChange={e => set('branch', e.target.value)}
            onBlur={() => handleBlur('branch')}
            className={errors.branch ? 'error' : ''}
          >
            <option value="">Select Branch</option>
            {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
      </div>

      <div className="cp-modal-footer" style={{ margin: '0 -2rem -2rem', padding: '1.2rem 2rem' }}>
        {status === 'error' && (
          <p style={{ color: 'var(--red)', font: '.8rem var(--mono)', flex: 1 }}>⚠ {errMsg}</p>
        )}
        <button
          type="submit"
          className="cp-submit-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'SUBMITTING...' : 'COMPLETE REGISTRATION'}
        </button>
      </div>
    </form>
  );
}
