export const CITIES = [
  { name: 'Banjarmasin', slug: 'banjarmasin' },
  { name: 'Samarinda', slug: 'samarinda' },
  { name: 'Pontianak', slug: 'pontianak' },
  { name: 'Balikpapan', slug: 'balikpapan' },
  { name: 'Palangkaraya', slug: 'palangkaraya' },
] as const

export type City = (typeof CITIES)[number]