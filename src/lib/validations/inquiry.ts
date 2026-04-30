import { z } from 'zod'

export const inquirySchema = z.object({
  vendor_id: z.string().min(1, 'Vendor wajib dipilih'),
  package_id: z.string().nullable().optional(),
  wedding_date: z.string().nullable().optional(),
  budget: z
    .number()
    .min(0, 'Budget tidak boleh negatif')
    .nullable()
    .optional(),
  location: z
    .string()
    .max(200, 'Lokasi maksimal 200 karakter')
    .nullable()
    .optional(),
  message: z
    .string()
    .max(500, 'Pesan maksimal 500 karakter')
    .nullable()
    .optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>