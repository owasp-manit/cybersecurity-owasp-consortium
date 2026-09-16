// ===== TEAM DATA =====

// Helper to generate a gradient avatar placeholder (B/W OS Theme)
function avatarUrl(name, bg = '000000') {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=ffffff&size=400&font-size=0.33&bold=true&format=svg`;
}

export const faculty = [
  { name: 'Dr. Anil Sharma', role: 'Faculty Advisor', linkedin: null, image: null },
  { name: 'Dr. Rajesh Kumar', role: 'Faculty Co-Advisor', linkedin: null, image: null },
];

export const finalYear = [
  { name: 'Pulkit Gangil', role: 'President', linkedin: 'https://www.linkedin.com/in/pulkit1504/', image: '/src/assets/team/Pulkit-Gangil.jpg' },
  { name: 'Pradeep Singh Yadav', role: 'Vice President', linkedin: 'https://www.linkedin.com/in/pradeepsinghyadav/', image: '/src/assets/team/Pradeep-Singh-Yadav.jpg' },
  { name: 'Abizer Mhowwala', role: 'Treasurer', linkedin: 'https://www.linkedin.com/in/abizer-mhowwala-9668492aa/', image: '/src/assets/team/Abizer-Mhowwala.jpg' },
  { name: 'Ashish Mishra', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/ashish-mishra-54419231a/', image: '/src/assets/team/Ashish-Mishra.jpg' },
  { name: 'Tanishq Aggarwal', role: 'Co-Coordinator', linkedin: 'https://www.linkedin.com/in/tanishq-agrawal1?utm_source=share_via&utm_content=profile&utm_medium=member_android', image: '/src/assets/team/Tanishq-Agrawal.jpeg' },
];

export const coreTeam = [
  { name: 'Mudit Kalya', role: 'Technical Head', linkedin: 'https://www.linkedin.com/in/mudit-kalya-884479324', image: '/src/assets/team/Mudit-Kalya.jpeg' },
  { name: 'Raghav Verma', role: 'Web Development Head', linkedin: 'https://www.linkedin.com/in/raghav-verma-9b845a318', image: '/src/assets/team/Raghav-Verma.jpeg' },
  { name: 'Shivansh Kumar Sahu', role: 'Event Management Head', linkedin: null, image: '/src/assets/team/Shivansh-Kumar-Sahu.jpg' },
  { name: 'Aditya Barnwal', role: 'Financial Head', linkedin: null, image: '/src/assets/team/Aaditya-Barnwal.jpg' },
  { name: 'Ashu Debnath', role: 'Logistics Head', linkedin: null, image: '/src/assets/team/Ashu-Debnath.jpg' },
  { name: 'Riddhi Jaiswal', role: 'Designer Head', linkedin: null, image: '/src/assets/team/Riddhi-Jaiswal.jpg' },
  { name: 'Kavya Chanap', role: 'Video-Editing Head', linkedin: 'https://www.linkedin.com/in/kavya-chanap-05537b348', image: '/src/assets/team/Kavya-Chanap.jpg' },
  { name: 'Sanjana Kori', role: 'Content Head', linkedin: 'https://www.linkedin.com/in/sanjna-kori-245b5232b', image: '/src/assets/team/Sanjana-Kabir.jpg' },
  { name: 'Pranjali Tiwari', role: 'Designer Lead', linkedin: null, image: '/src/assets/team/pranjali-tiwari.jpg' },
  { name: 'Prabhat Singh Raj', role: 'Content Lead', linkedin: null, image: '/src/assets/team/Prabhat-Singh-Raj.jpg' },
  { name: 'Khushboo Gaud', role: 'PR Head', linkedin: 'https://www.linkedin.com/in/khushboo-gond-046919356', image: '/src/assets/team/Khushboo-Gaud.jpg' },
  { name: 'Vishal Sharma', role: 'Sponsorship Head', linkedin: null, image: '/src/assets/team/vishal-sharma.jpg' },
];

export const members = [
  { name: 'Saurav Sahu', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Sharsti Garg', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Shubham Atram', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Aditi Khatri', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Amit Baghel', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Arjit Yadav', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Chirag Gurjar', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Dev Sharma', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Harsh Rathore', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Himanshi Dangi', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Kanishk Tiwari', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Manya Mehta', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Prarthana Sharma', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Serine Ros Anto', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Shlok Gupta', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Sumit Maurya', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Viha Sooden', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Nitin Kumar', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Yashika Gupta', role: 'Upcoming Lead', linkedin: null, image: null },
  { name: 'Khemendra Singh Jatav', role: 'Upcoming Lead', linkedin: null, image: null },
];

// Generate placeholder avatar for members without images
export function getAvatar(name) {
  // B/W OS theme - alternating shades of dark gray/black
  const shades = ['000000', '0a0a0a', '111111', '1a1a1a'];
  const idx = name.charCodeAt(0) % shades.length;
  return avatarUrl(name, shades[idx]);
}
