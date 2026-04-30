export const CATEGORIES = [
  { name: 'Venue', slug: 'venue', icon: '🏛️' },
  { name: 'Katering', slug: 'katering', icon: '🍽️' },
  { name: 'MUA & Kecantikan', slug: 'mua-kecantikan', icon: '💄' },
  { name: 'Dekorasi', slug: 'dekorasi', icon: '🌸' },
  { name: 'Fotografer', slug: 'fotografer', icon: '📸' },
  { name: 'Videografer', slug: 'videografer', icon: '🎥' },
  { name: 'Busana Pengantin', slug: 'busana-pengantin', icon: '👰' },
  { name: 'Undangan & Percetakan', slug: 'undangan-percetakan', icon: '💌' },
  { name: 'Wedding Organizer', slug: 'wedding-organizer', icon: '📋' },
  { name: 'Hiburan', slug: 'hiburan', icon: '🎵' },
  { name: 'Souvenir', slug: 'souvenir', icon: '🎁' },
  { name: 'Wedding Cake', slug: 'wedding-cake', icon: '🎂' },
  { name: 'Cincin & Aksesoris', slug: 'cincin-aksesoris', icon: '💍' },
  { name: 'Transport', slug: 'transport', icon: '🚗' },
] as const

export type Category = (typeof CATEGORIES)[number]