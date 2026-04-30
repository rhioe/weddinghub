export const INQUIRY_STATUS = {
  pending: 'Menunggu',
  responded: 'Direspon',
  negotiation: 'Negosiasi',
  deal: 'Deal',
  done: 'Selesai',
  cancelled: 'Dibatalkan',
} as const

export const PRODUCT_STATUS = {
  pending: 'Menunggu Review',
  approved: 'Aktif',
  rejected: 'Ditolak',
} as const

export const COMMISSION_STATUS = {
  unpaid: 'Belum Dibayar',
  paid: 'Sudah Dibayar',
  waived: 'Dibebaskan',
} as const

export type InquiryStatus = keyof typeof INQUIRY_STATUS
export type ProductStatus = keyof typeof PRODUCT_STATUS
export type CommissionStatus = keyof typeof COMMISSION_STATUS