// ============================================================
// CYBERPULSE EVENT CONFIG — fill in every "TBA" before going live
// ============================================================
import qrCodeImg from './assets/qr_code.jpeg';
export const CYBERPULSE = {
  // ── Basic event info ────────────────────────────────────────
  name: 'CYBERPULSE',
  tagline: 'Ethical Hacking & Web Security Workshop',
  hook: "Ever wondered how websites actually get hacked? Now's your chance to find out!",
  date: '2026-10-10T10:00:00+05:30',   // ISO, used by countdown
  dateLabel: '10 OCTOBER 2026',
  timeLabel: '10 AM – 4 PM',
  reportingTime: '9:30 AM',
  venue: 'Auditorium MANIT',
  mapsLink: 'https://maps.google.com/?q=MANIT+Bhopal',
  seatsLabel: 'TBA',             // e.g. "Limited to 100 seats"

  // ── Fees ────────────────────────────────────────────────────
  fees: {
    manit: 'FREE',
    solo: 249,
    combo: 649,
  },

  // ── Payment (external participants only) ────────────────────
  payment: {
    upiId: 'TBA@upi',
    payeeName: 'OWASP MANIT',
    qrImage: qrCodeImg,             // imported from src/assets/qr_code.jpeg
    verificationNote: 'Payment is verified manually. You will receive a confirmation on email/WhatsApp within 24 hours.',
  },

  // ── Registration ────────────────────────────────────────────
  registration: {
    endpoints: {
      manit: 'https://script.google.com/macros/s/AKfycbxOl-wqQawjf0x6kHigAvYbdnlQQRY3mcDA_DNpf4XaENChTHo96FDAHTyalE0V6rSQ/exec',
      solo: 'https://script.google.com/macros/s/AKfycbwnNBGaOREmlL5fyEdiZ4Tr6JrUUIGgRyDpXDH2o-LVKW2CKddauc3_myJ118tRll2S/exec',
      combo: 'https://script.google.com/macros/s/AKfycbxA72Ou-34k-5r2aod7WW-NwLIJmga789AydX3l_BAWy3ereBiYquHh0OMwVlCX2Y_J/exec',
      common: 'https://script.google.com/macros/s/AKfycbzMko1fNXMNcq6ONEKS0C890D-02h6wDRFMUU33s1V_qQxtqD5ON9Ef51fNTBhZQVYkag/exec'
    },
    allowedManitDomains: ['@stu.manit.ac.in'],
    scholarPattern: /^\d{9,12}$/,  // adjust digits as needed
    yearOptions: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'],
    branchOptions: ['CSE', 'ECE', 'EE', 'ME', 'CE', 'MCA', 'MBA', 'Other'],
  },

  // ── Links ────────────────────────────────────────────────────
  links: {
    whatsapp: 'https://chat.whatsapp.com/Irja93IwoylELxwRbgrvXN',  // e.g. 'https://chat.whatsapp.com/XXXXXX'
  },

  // ── Contact ─────────────────────────────────────────────────
  contact: {
    name: 'OWASP MANIT Team',
    email: 'owasp.chap.manit@gmail.com',
    phone: 'Dev Sharma: 7987554704 | Manya Mehta: 9024097786',
  },

  // ── Agenda ──────────────────────────────────────────────────
  agenda: [
    { time: '10:00 AM', title: 'Ethical Hacking Basics' },
    { time: '11:00 AM', title: 'Web Security & Common Attacks' },
    { time: '12:00 PM', title: 'Bug Bounty Fundamentals' },
    { time: '01:30 PM', title: 'Vulnerability Hunting' },
    { time: '02:30 PM', title: 'AI in Cybersecurity' },
    { time: '03:30 PM', title: 'Real-World Hacking Demos' },
  ],

  // ── What you'll learn cards ──────────────────────────────────
  learnings: [
    'How attackers think and operate',
    'Common web vulnerabilities (SQLi, XSS, CSRF…)',
    'Bug bounty methodology & responsible disclosure',
    'Using real hacking tools safely',
    'AI-powered offensive and defensive techniques',
  ],

  // ── Requirements / what to bring ────────────────────────────
  requirements: ['Laptop with charger', 'College ID card', 'Notebook & pen'],
  eligibility: 'Open to all MANIT and external students. Beginners are highly welcome — no prior experience needed.',

  // ── FAQ ─────────────────────────────────────────────────────
  faqs: [
    { q: 'Who can join this workshop?', a: 'Any student — from MANIT or any other college. Beginners are warmly welcome.' },
    { q: 'Is it really free for MANIT students?', a: 'Yes, absolutely FREE for all MANIT Bhopal students. No payment needed.' },
    { q: 'How does payment work for external participants?', a: 'Scan the UPI QR code shown on the registration form, pay the amount, and upload the payment screenshot. Payment is verified manually within 24 hours.' },
    { q: 'What are the Combo/Team rules?', a: 'A Combo registration is for a team of exactly 3 people. Fill in details for all three members. The fee is ₹649 for the whole team.' },
    { q: 'Will I get a certificate?', a: 'Yes! All participants who attend the full session will receive a certificate of participation.' },
    { q: 'What is the refund policy?', a: 'Registration fees are non-refundable once paid.' },
    { q: 'How do I contact the organisers?', a: 'Email us at owasp.chap.manit@gmail.com or call Dev Sharma (7987554704) / Manya Mehta (9024097786).' },
  ],

  // ── Organiser display ────────────────────────────────────────
  organiser: 'Cybersecurity OWASP Consortium, MANIT Bhopal',
};
