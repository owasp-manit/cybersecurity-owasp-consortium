// ===== CTF / CHALLENGES DATA =====

export const challenges = [
  { id: 1, title: 'Web XSS Ground', category: 'Web', difficulty: 'easy', points: 100, solves: 42, description: 'Find and exploit a stored XSS vulnerability in the target application.' },
  { id: 2, title: 'Crypto Hidden in Plain Sight', category: 'Crypto', difficulty: 'medium', points: 200, solves: 28, description: 'Decrypt the message using classical cipher techniques and frequency analysis.' },
  { id: 3, title: 'Forensics Memory Dump', category: 'Forensics', difficulty: 'medium', points: 250, solves: 15, description: 'Analyze a memory dump to find hidden credentials and reconstruct the attack timeline.' },
  { id: 4, title: 'Reverse Binary Odyssey', category: 'Reverse', difficulty: 'hard', points: 400, solves: 8, description: 'Reverse engineer a stripped binary to find the hidden flag.' },
  { id: 5, title: 'Pwn Heap Overflow', category: 'Pwn', difficulty: 'hard', points: 500, solves: 3, description: 'Exploit a heap overflow vulnerability to gain remote code execution.' },
  { id: 6, title: 'OSINT Digital Footprint', category: 'OSINT', difficulty: 'easy', points: 150, solves: 35, description: 'Use open-source intelligence techniques to find the target\'s hidden online presence.' },
];

export const leaderboard = [
  { rank: 1, team: 'ByteBandits', score: 2450, members: 3 },
  { rank: 2, team: 'NullPointers', score: 2100, members: 4 },
  { rank: 3, team: 'StackSmashers', score: 1850, members: 3 },
  { rank: 4, team: 'CryptoKnights', score: 1600, members: 2 },
  { rank: 5, team: 'ShellShockers', score: 1400, members: 4 },
  { rank: 6, team: 'BinaryBrains', score: 1200, members: 3 },
  { rank: 7, team: 'PacketStorm', score: 1050, members: 2 },
  { rank: 8, team: 'ZeroDaySquad', score: 900, members: 3 },
];

export const pastCTFs = [
  { year: 'CTF 2025', label: 'View Results →', link: '#' },
  { year: 'CTF 2024', label: 'View Results →', link: '#' },
  { year: 'CTF 2023', label: 'View Results →', link: '#' },
];

export const categories = ['All', 'Web', 'Crypto', 'Forensics', 'Reverse', 'OSINT', 'Pwn'];
