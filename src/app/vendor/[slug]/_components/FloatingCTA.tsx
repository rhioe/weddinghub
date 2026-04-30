'use client'

import { useState } from 'react'
import { ContactButton } from '@/components/vendor/ContactButton'
import { InquiryForm } from '@/components/vendor/InquiryForm'
import { Button } from '@/components/ui/Button'

interface FloatingCTAProps {
  vendor: {
    id: string
    business_name: string
    whatsapp: string
  }
}

export function FloatingCTA({ vendor }: FloatingCTAProps) {
  const [showInquiry, setShowInquiry] = useState(false)

  return (
    <>
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3 safe-bottom z-40">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowInquiry(true)}
            className="flex-1"
          >
            Kirim Inquiry
          </Button>
          <ContactButton
            whatsapp={vendor.whatsapp}
            label="WhatsApp"
            fullWidth={false}
          />
        </div>
      </div>

      {/* Desktop floating */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowInquiry(true)}
            className="shadow-float bg-white"
          >
            Kirim Inquiry
          </Button>
          <ContactButton
            whatsapp={vendor.whatsapp}
            label="Hubungi WhatsApp"
            fullWidth={false}
          />
        </div>
      </div>

      {/* Inquiry Form Modal */}
      <InquiryForm
        vendor={vendor}
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
      />
    </>
  )
}