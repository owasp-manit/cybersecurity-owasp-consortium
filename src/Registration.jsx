import React, { useState } from 'react';
import paymentQr from './assets/qr code.jpeg';
import './styles/registration.css';

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'];
const branchOptions = ['CSE', 'ECE', 'EE', 'ME', 'CE', 'Other'];

export default function Registration() {
  const [isManit, setIsManit] = useState(true);
  const [isCombo, setIsCombo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Convert the uploaded image to Base64
      const file = formData.get('paymentImage');
      if (file && file.size > 0) {
        const base64Str = await getBase64(file);
        const [_, base64Data] = base64Str.split(',');
        data.paymentImageBase64 = base64Data;
        data.paymentImageMime = file.type;
      }
      
      // Remove the raw file object so JSON.stringify doesn't choke on it
      delete data.paymentImage;
      
      // Include the toggle states
      data.isCombo = isCombo;
      data.isManit = isManit;

      if (isCombo) {
        data.members = [
          {
            name: data.member1Name,
            email: data.member1Email,
            phone: data.phone,
            college: data.college,
            year: data.year,
            branch: data.branch,
            scholar: data.scholarNo
          },
          {
            name: data.member2Name,
            email: data.member2Email,
            phone: data.phone, // Same phone for team
            college: data.college,
            year: data.year,
            branch: data.branch,
            scholar: data.scholarNo
          },
          {
            name: data.member3Name,
            email: data.member3Email,
            phone: data.phone,
            college: data.college,
            year: data.year,
            branch: data.branch,
            scholar: data.scholarNo
          }
        ];
      }


      // Determine the appropriate Apps Script URL based on user type
      let scriptURL = '';
      if (isManit) {
        scriptURL = 'https://script.google.com/macros/s/AKfycbxOl-wqQawjf0x6kHigAvYbdnlQQRY3mcDA_DNpf4XaENChTHo96FDAHTyalE0V6rSQ/exec'; // MANITIANS
      } else if (!isCombo) {
        scriptURL = 'https://script.google.com/macros/s/AKfycbwnNBGaOREmlL5fyEdiZ4Tr6JrUUIGgRyDpXDH2o-LVKW2CKddauc3_myJ118tRll2S/exec'; // ExternalSolo
      } else {
        scriptURL = 'https://script.google.com/macros/s/AKfycbxA72Ou-34k-5r2aod7WW-NwLIJmga789AydX3l_BAWy3ereBiYquHh0OMwVlCX2Y_J/exec'; // ExternalCombo
      }
      
      // We send it as text/plain to avoid Google CORS blocking the request
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        alert('Registration successful! Your details have been recorded and a confirmation email has been sent.');
        form.reset();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('There was a network error while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const price = isCombo ? '649' : '249';

  return (
    <main className="page reg-page">
      <div className="reg-container">
        <div className="reg-header">
          <span className="mono dim">01 — CYBERPULSE WORKSHOP</span>
          <h1 className="t">Secure Your Spot.</h1>
          <p>Join MANIT's premier ethical hacking and web security workshop. Please fill out the details below to register.</p>
        </div>

        <form className="reg-form" onSubmit={handleSubmit}>
          
          <div className="reg-toggles">
            <div className="reg-toggle-group">
              <span className="toggle-label">I AM FROM:</span>
              <div className="reg-toggle">
                <button type="button" className={isManit ? 'active' : ''} onClick={() => setIsManit(true)}>
                  MANIT Student
                </button>
                <button type="button" className={!isManit ? 'active' : ''} onClick={() => setIsManit(false)}>
                  External Participant
                </button>
              </div>
            </div>

            <div className="reg-toggle-group">
              <span className="toggle-label">REGISTRATION TYPE:</span>
              <div className="reg-toggle">
                <button type="button" className={!isCombo ? 'active' : ''} onClick={() => setIsCombo(false)}>
                  Solo
                </button>
                <button type="button" className={isCombo ? 'active' : ''} onClick={() => setIsCombo(true)}>
                  Combo (Team of 3)
                </button>
              </div>
            </div>
          </div>

          <div className="reg-grid">
            {isCombo ? (
              <>
                <label className="reg-field full-width">
                  <span>Team Name <b>*</b></span>
                  <input type="text" name="teamName" placeholder="Enter team name" required />
                </label>
                <label className="reg-field">
                  <span>Team Leader Phone <b>*</b></span>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" required />
                </label>
                <label className="reg-field">
                  <span>Leader Year & Branch <b>*</b></span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select name="year" required defaultValue=""><option value="" disabled>Year</option>{yearOptions.map(y => <option key={y} value={y}>{y}</option>)}</select>
                    <select name="branch" required defaultValue=""><option value="" disabled>Branch</option>{branchOptions.map(b => <option key={b} value={b}>{b}</option>)}</select>
                  </div>
                </label>
                {isManit ? (
                  <label className="reg-field full-width">
                    <span>Leader Scholar Number <b>*</b></span>
                    <input type="text" name="scholarNo" placeholder="e.g. 211112233" required />
                  </label>
                ) : (
                  <label className="reg-field full-width">
                    <span>College / University <b>*</b></span>
                    <input type="text" name="college" placeholder="Enter college name" required />
                  </label>
                )}
                
                <div className="combo-members">
                  {[1, 2, 3].map(num => (
                    <div key={num} className="combo-member-row">
                      <span className="mono dim">MEMBER 0{num} {num === 1 && '(LEADER)'}</span>
                      <div className="member-inputs">
                        <input type="text" name={`member${num}Name`} placeholder="Full Name" required />
                        <input type="email" name={`member${num}Email`} placeholder="Email Address" required />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <label className="reg-field">
                  <span>Full Name <b>*</b></span>
                  <input type="text" name="name" placeholder="John Doe" required />
                </label>

                <label className="reg-field">
                  <span>Email Address <b>*</b></span>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </label>

                <label className="reg-field">
                  <span>Phone Number <b>*</b></span>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" required />
                </label>

                {isManit ? (
                  <label className="reg-field">
                    <span>Scholar Number <b>*</b></span>
                    <input type="text" name="scholarNo" placeholder="e.g. 211112233" required />
                  </label>
                ) : (
                  <label className="reg-field">
                    <span>College / University <b>*</b></span>
                    <input type="text" name="college" placeholder="Enter college name" required />
                  </label>
                )}

                <label className="reg-field">
                  <span>Year <b>*</b></span>
                  <select name="year" required defaultValue="">
                    <option value="" disabled>Select Year</option>
                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </label>

                <label className="reg-field">
                  <span>Branch / Course <b>*</b></span>
                  <select name="branch" required defaultValue="">
                    <option value="" disabled>Select Branch</option>
                    {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </label>
              </>
            )}
          </div>

          {!isManit && (
            <div className="reg-payment">
              <div className="qr-box">
                <img src={paymentQr} alt="UPI QR Code" />
              </div>
              <div className="pay-info">
                <span>REGISTRATION FEE ({isCombo ? 'COMBO' : 'SOLO'})</span>
                <h2>₹{price}</h2>
                <p>Scan the QR code to pay via UPI. Once paid, upload the successful payment screenshot below.</p>
                <label className="reg-field">
                  <span>Payment Screenshot <b>*</b></span>
                  <input type="file" name="paymentImage" accept="image/*" required />
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="reg-submit" disabled={isSubmitting}>
            {isSubmitting ? 'PROCESSING...' : 'COMPLETE REGISTRATION →'}
          </button>
        </form>
      </div>
    </main>
  );
}
