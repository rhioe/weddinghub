import { z } from 'zod'

export const reviewSchema = z.object({
  inquiry_id: z.string().min(1, 'Inquiry wajib'),
  vendor_id: z.string().min(1, 'Vendor wajib'),
  rating: z
    .number()
    .min(1, 'Rating minimal 1')
    .max(5, 'Rating maksimal 5'),
  comment: z
    .string()
    .max(500, 'Komentar maksimal 500 karakter')
    .nullable()
    .optional(),
})

export type ReviewInput = z.infer<typeof reviewSchema>