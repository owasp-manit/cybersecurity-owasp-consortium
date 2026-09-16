// ===== TEAM DATA =====

// Helper to generate a gradient avatar placeholder (B/W OS Theme)
function avatarUrl(name, bg = '000000') {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=ffffff&size=400&font-size=0.33&bold=true&format=svg`;
}

export const faculty = [
  { name: 'Dr. Anil Sharma', role: 'Faculty Advisor', linkedin: '#', image: null },
  { name: 'Dr. Rajesh Kumar', role: 'Faculty Co-Advisor', linkedin: '#', image: null },
  { name: 'Prof. Neha Singh', role: 'Faculty Mentor', linkedin: '#', image: null },
  { name: 'Prof. Vivek Patel', role: 'Faculty Mentor', linkedin: '#', image: null },
];

export const finalYear = [
  { name: 'Ashish Mishra', role: 'President', linkedin: '#', github: '#', instagram: '#', image: null },
  { name: 'Rohan Verma', role: 'Vice President', linkedin: '#', github: '#', instagram: '#', image: null },
  { name: 'Ananya Singh', role: 'Technical Lead', linkedin: '#', github: '#', instagram: '#', image: null },
];

export const coreTeam = [
  { name: 'Karan S.', role: 'Event Lead', linkedin: '#', github: '#', image: null },
  { name: 'Priya D.', role: 'Content Lead', linkedin: '#', github: '#', image: null },
  { name: 'Siddharth M.', role: 'CTF Lead', linkedin: '#', github: '#', image: null },
  { name: 'Megha T.', role: 'Design Lead', linkedin: '#', github: '#', image: null },
  { name: 'Arjun P.', role: 'Web Developer', linkedin: '#', github: '#', image: null },
  { name: 'Riya K.', role: 'Social Media', linkedin: '#', github: '#', image: null },
  { name: 'Dev R.', role: 'Research Lead', linkedin: '#', github: '#', image: null },
  { name: 'Sneha G.', role: 'Outreach Lead', linkedin: '#', github: '#', image: null },
  { name: 'Vikram J.', role: 'Operations', linkedin: '#', github: '#', image: null },
  { name: 'Pooja L.', role: 'Sponsorship', linkedin: '#', github: '#', image: null },
  { name: 'Rahul N.', role: 'Documentation', linkedin: '#', github: '#', image: null },
  { name: 'Isha V.', role: 'Community Manager', linkedin: '#', github: '#', image: null },
];

export const members = [
  { name: 'Aman C.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Ritika S.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Aditya P.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Disha B.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Rohan G.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Diya V.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Vivek J.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Tanvi R.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Harsh M.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Nisha K.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Akash T.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Kavya L.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Suraj N.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Pallavi D.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Nikhil S.', role: 'Member', linkedin: '#', github: '#', image: null },
  { name: 'Swati A.', role: 'Member', linkedin: '#', github: '#', image: null },
];

// Generate placeholder avatar for members without images
export function getAvatar(name) {
  // B/W OS theme - alternating shades of dark gray/black
  const shades = ['000000', '0a0a0a', '111111', '1a1a1a'];
  const idx = name.charCodeAt(0) % shades.length;
  return avatarUrl(name, shades[idx]);
}
