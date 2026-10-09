import React, { useState, useCallback, useRef } from 'react';
import { CYBERPULSE } from '../../cyberpulse.config';
import PaymentBlock from './PaymentBlock';
import SuccessCard from './SuccessCard';

// ── Field ───────────────────────────────────────────────────
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

// ── Validate one person's fields ─────────────────────────────
function validatePerson(p, prefix) {
  const errs = {};
  if (!p.name?.trim()) errs[`${prefix}name`] = 'Name is required.';
  if (!p.email?.trim()) {
    errs[`${prefix}email`] = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())) {
    errs[`${prefix}email`] = 'Enter a valid email address.';
  }
  if (!p.phone?.trim()) {
    errs[`${prefix}phone`] = 'Phone is required.';
  } else {
    const digits = p.phone.replace(/\D/g, '').replace(/^91/, '');
    if (digits.length !== 10) errs[`${prefix}phone`] = 'Enter a valid 10-digit number.';
  }
  if (!p.college?.trim()) errs[`${prefix}college`] = 'College name is required.';
  if (!p.branch) errs[`${prefix}branch`] = 'Select a branch.';
  return errs;
}

function validateSolo(f) {
  return validatePerson(f, '');
}

function validateCombo(members) {
  let errs = {};
  members.forEach((m, i) => {
    const prefix = `m${i}_`;
    const me = validatePerson(m, prefix);
    Object.assign(errs, me);
  });
  // Duplicate email check
  const emails = members.map(m => m.email?.trim().toLowerCase()).filter(Boolean);
  const dups = emails.filter((e, i) => emails.indexOf(e) !== i);
  if (dups.length) errs['dup_email'] = `Duplicate email found: ${dups[0]}`;
  // Duplicate phone check
  const phones = members.map(m => m.phone?.replace(/\D/g, '').replace(/^91/, '')).filter(s => s.length === 10);
  const dupPhones = phones.filter((p, i) => phones.indexOf(p) !== i);
  if (dupPhones.length) errs['dup_phone'] = 'Two members share the same phone number.';
  return errs;
}

// ── Person sub-form ──────────────────────────────────────────
function PersonForm({ prefix, data, errors, onChange, onBlur, showSameCollege, leaderCollege, isLeader }) {
  const { yearOptions, branchOptions } = CYBERPULSE.registration;
  const set = (k, v) => onChange(k, v);
  const [sameCollege, setSameCollege] = useState(false);

  const handleSameCollege = (checked) => {
    setSameCollege(checked);
    if (checked && leaderCollege) set('college', leaderCollege);
  };

  return (
    <div className="cp-member-card">
      <h4>{isLeader ? 'MEMBER 01 — TEAM LEADER' : `MEMBER 0${Number(prefix[1]) + 1} — PARTICIPANT`}</h4>
      <div className="cp-form">
        <div className="cp-form-row">
          <Field label="Full Name" required error={errors[`${prefix}name`]}>
            <input type="text" autoComplete="name" value={data.name || ''} onChange={e => set('name', e.target.value)} onBlur={() => onBlur(`${prefix}name`)} className={errors[`${prefix}name`] ? 'error' : ''} placeholder="Full name" />
          </Field>
          <Field label="Email" required error={errors[`${prefix}email`]}>
            <input type="email" autoComplete="email" value={data.email || ''} onChange={e => set('email', e.target.value)} onBlur={() => onBlur(`${prefix}email`)} className={errors[`${prefix}email`] ? 'error' : ''} placeholder="email@example.com" />
          </Field>
        </div>
        <div className="cp-form-row">
          <Field label="Phone" required error={errors[`${prefix}phone`]}>
            <input type="tel" autoComplete="tel" value={data.phone || ''} onChange={e => set('phone', e.target.value)} onBlur={() => onBlur(`${prefix}phone`)} className={errors[`${prefix}phone`] ? 'error' : ''} placeholder="+91 98765 43210" />
          </Field>
          <Field label="Branch / Course" required error={errors[`${prefix}branch`]}>
            <select value={data.branch || ''} onChange={e => set('branch', e.target.value)} onBlur={() => onBlur(`${prefix}branch`)} className={errors[`${prefix}branch`] ? 'error' : ''}>
              <option value="">Select Branch</option>
              {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        </div>
        <Field label="College / University" required error={errors[`${prefix}college`]}>
          <input type="text" value={data.college || ''} onChange={e => set('college', e.target.value)} onBlur={() => onBlur(`${prefix}college`)} className={errors[`${prefix}college`] ? 'error' : ''} placeholder="College name" disabled={!isLeader && sameCollege} />
        </Field>
        {showSameCollege && (
          <label className="cp-check-label">
            <input type="checkbox" checked={sameCollege} onChange={e => handleSameCollege(e.target.checked)} />
            <span>Same college as Member 01</span>
          </label>
        )}
      </div>
    </div>
  );
}

// ── Main OutsideForm ─────────────────────────────────────────
export default function OutsideForm({ onClose }) {
  const [tab, setTab] = useState('solo'); // solo | combo
  const [soloFields, setSoloFields] = useState({ name: '', email: '', phone: '', college: '', branch: '' });
  const [members, setMembers] = useState([
    { name: '', email: '', phone: '', college: '', branch: '' },
    { name: '', email: '', phone: '', college: '', branch: '' },
    { name: '', email: '', phone: '', college: '', branch: '' },
  ]);
  const [screenshot, setScreenshot] = useState(null);
  const [utr, setUtr] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');
  const [regId, setRegId] = useState('');
  const submittingRef = useRef(false);

  const price = tab === 'solo' ? CYBERPULSE.fees.solo : CYBERPULSE.fees.combo;

  const setSoloField = (k, v) => {
    setSoloFields(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const setMemberField = (idx, k, v) => {
    setMembers(ms => ms.map((m, i) => i === idx ? { ...m, [k]: v } : m));
    const key = `m${idx}_${k}`;
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const clearFieldError = (key) => {
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    // Validate
    let errs = {};
    if (tab === 'solo') {
      errs = validateSolo(soloFields);
    } else {
      errs = validateCombo(members);
    }

    if (!screenshot) errs.screenshot = 'Payment screenshot is required.';

    setErrors(errs);
    if (Object.keys(errs).length) {
      setTimeout(() => document.querySelector('.cp-field input.error, .cp-field select.error')?.focus(), 50);
      return;
    }

    submittingRef.current = true;
    setStatus('loading');
    try {
      // Compress screenshot to base64
      let screenshotB64 = '';
      if (screenshot) {
        screenshotB64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(screenshot.compressed || screenshot.file);
        });
      }

      // Generate unique registration ID
      const id = 'CP-2026-' + Math.random().toString(36).slice(2, 8).toUpperCase();

      const basePayload = {
        regId: id,
        type: 'outside',
        isManit: false,
        isCombo: tab === 'combo',
        paymentImageBase64: screenshotB64,
        paymentImageMime: screenshot.file?.type || 'image/png',
        plan: tab,
        utr,
        _hp: '',
        submittedAt: new Date().toISOString(),
      };

      const payload = tab === 'solo' 
        ? {
            ...basePayload,
            name: soloFields.name,
            email: soloFields.email,
            phone: soloFields.phone.replace(/\D/g, '').slice(-10),
            scholar: 'N/A',
            college: soloFields.college,
            year: '',
            branch: soloFields.branch,
          }
        : {
            ...basePayload,
            members: members.map(m => ({ ...m, scholar: 'N/A', phone: m.phone.replace(/\D/g, '').slice(-10) })),
          };

      const endpoint = tab === 'solo' ? CYBERPULSE.registration.endpoints.solo : CYBERPULSE.registration.endpoints.combo;
      const commonEndpoint = CYBERPULSE.registration.endpoints.common;
      
      if (!endpoint || !commonEndpoint) {
        console.warn('[CYBERPULSE] No registration endpoint configured.');
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
        
        const text = await res.text();
        try {
          const result = JSON.parse(text);
          if (result.status === 'error') {
            const msg = result.message.toLowerCase();
            if (!msg.includes('email') && !msg.includes('too many times')) {
              throw new Error(result.message);
            }
          }
        } catch (e) {
          if (e.message && !e.message.includes('Unexpected token') && !e.message.includes('is not valid JSON')) {
            throw new Error('Server Error: ' + e.message);
          }
        }
      }

      setRegId(id);
      setStatus('success');
    } catch (err) {
      submittingRef.current = false;
      setStatus('error');
      setErrMsg(err.message);
    }
  };

  if (status === 'success') {
    return (
      <SuccessCard
        regId={regId}
        name={tab === 'solo' ? soloFields.name : members[0].name}
        email={tab === 'solo' ? soloFields.email : members[0].email}
        isManit={false}
        plan={tab}
        onClose={onClose}
      />
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form className="cp-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div className="cp-hp" aria-hidden="true">
        <input type="text" name="_hp" tabIndex="-1" autoComplete="off" />
      </div>

      {/* Solo / Combo tab toggle */}
      <div className="cp-modal-tabs" role="tablist" aria-label="Registration type">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'solo'}
          className={`cp-modal-tab ${tab === 'solo' ? 'active' : ''}`}
          onClick={() => setTab('solo')}
        >
          SOLO — ₹{CYBERPULSE.fees.solo}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'combo'}
          className={`cp-modal-tab ${tab === 'combo' ? 'active' : ''}`}
          onClick={() => setTab('combo')}
        >
          COMBO (3) — ₹{CYBERPULSE.fees.combo}
        </button>
        <div className={`cp-tab-thumb ${tab === 'combo' ? 'right' : ''}`} aria-hidden="true" />
      </div>

      {/* Live price display */}
      <div className="cp-live-price" aria-live="polite">
        Amount payable: <span className="cp-price-num">₹{price}</span>
      </div>

      {hasErrors && (
        <div className="cp-error-banner" role="alert">
          {errors.dup_email && <p>⚠ {errors.dup_email}</p>}
          {errors.dup_phone && <p>⚠ {errors.dup_phone}</p>}
          {!errors.dup_email && !errors.dup_phone && <p>⚠ Please fix the errors below before submitting.</p>}
        </div>
      )}

      {tab === 'solo' ? (
        // ── SOLO FIELDS ──────────────────────────────────────
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <Field label="Full Name" required error={errors.name}>
            <input type="text" autoComplete="name" value={soloFields.name} onChange={e => setSoloField('name', e.target.value)} className={errors.name ? 'error' : ''} placeholder="Full name" />
          </Field>
          <div className="cp-form-row">
            <Field label="Email" required error={errors.email}>
              <input type="email" autoComplete="email" value={soloFields.email} onChange={e => setSoloField('email', e.target.value)} className={errors.email ? 'error' : ''} placeholder="email@college.edu" />
            </Field>
            <Field label="Phone" required error={errors.phone}>
              <input type="tel" autoComplete="tel" value={soloFields.phone} onChange={e => setSoloField('phone', e.target.value)} className={errors.phone ? 'error' : ''} placeholder="+91 98765 43210" />
            </Field>
          </div>
          <Field label="College / University" required error={errors.college}>
            <input type="text" value={soloFields.college} onChange={e => setSoloField('college', e.target.value)} className={errors.college ? 'error' : ''} placeholder="Your college name" />
          </Field>
          <Field label="Branch / Course" required error={errors.branch}>
            <select value={soloFields.branch} onChange={e => setSoloField('branch', e.target.value)} className={errors.branch ? 'error' : ''}>
              <option value="">Select Branch</option>
              {CYBERPULSE.registration.branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        </div>
      ) : (
        // ── COMBO FIELDS ─────────────────────────────────────
        <div>

          <div style={{ marginTop: '1.5rem' }}>
            {members.map((m, i) => (
              <PersonForm
                key={i}
                prefix={`m${i}_`}
                data={m}
                errors={errors}
                isLeader={i === 0}
                showSameCollege={i > 0}
                leaderCollege={members[0].college}
                onChange={(k, v) => setMemberField(i, k, v)}
                onBlur={() => {
                  // Re-validate combo on blur
                  const newErrs = validateCombo(members);
                  setErrors(e => ({ ...e, ...newErrs }));
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Payment block — always shown for external */}
      <PaymentBlock
        amount={price}
        screenshot={screenshot}
        onScreenshot={setScreenshot}
        screenshotError={errors.screenshot}
        utr={utr}
        onUtr={setUtr}
      />

      <div style={{ marginTop: '1.5rem' }}>
        {status === 'error' && (
          <p style={{ color: 'var(--red)', font: '.8rem var(--mono)', marginBottom: '1rem' }}>⚠ {errMsg}</p>
        )}
        <button type="submit" className="cp-submit-btn" disabled={status === 'loading'}>
          {status === 'loading' ? 'SUBMITTING...' : 'COMPLETE REGISTRATION'}
        </button>
      </div>
    </form>
  );
}
