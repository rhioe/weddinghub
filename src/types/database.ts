export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          full_name: string | null
          avatar_url: string | null
          role: 'customer' | 'vendor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      vendor_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          slug: string
          category_id: string | null
          city: string
          description: string | null
          whatsapp: string
          instagram: string | null
          website: string | null
          verified: boolean
          featured: boolean
          is_active: boolean
          total_reviews: number
          avg_rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          slug: string
          category_id?: string | null
          city: string
          description?: string | null
          whatsapp: string
          instagram?: string | null
          website?: string | null
          verified?: boolean
          featured?: boolean
          is_active?: boolean
          total_reviews?: number
          avg_rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          slug?: string
          category_id?: string | null
          city?: string
          description?: string | null
          whatsapp?: string
          instagram?: string | null
          website?: string | null
          verified?: boolean
          featured?: boolean
          is_active?: boolean
          total_reviews?: number
          avg_rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          created_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          vendor_id: string
          image_url: string
          caption: string | null
          file_size: number | null
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          image_url: string
          caption?: string | null
          file_size?: number | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          image_url?: string
          caption?: string | null
          file_size?: number | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          created_at?: string
        }
      }
      packages: {
        Row: {
          id: string
          vendor_id: string
          name: string
          price: number
          description: string | null
          details: string | null
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          name: string
          price: number
          description?: string | null
          details?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          name?: string
          price?: number
          description?: string | null
          details?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          customer_id: string
          vendor_id: string
          package_id: string | null
          wedding_date: string | null
          budget: number | null
          location: string | null
          message: string | null
          status: 'pending' | 'responded' | 'negotiation' | 'deal' | 'done' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          vendor_id: string
          package_id?: string | null
          wedding_date?: string | null
          budget?: number | null
          location?: string | null
          message?: string | null
          status?: 'pending' | 'responded' | 'negotiation' | 'deal' | 'done' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          vendor_id?: string
          package_id?: string | null
          wedding_date?: string | null
          budget?: number | null
          location?: string | null
          message?: string | null
          status?: 'pending' | 'responded' | 'negotiation' | 'deal' | 'done' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          inquiry_id: string
          customer_id: string
          vendor_id: string
          rating: number
          comment: string | null
          vendor_reply: string | null
          created_at: string
        }
        Insert: {
          id?: string
          inquiry_id: string
          customer_id: string
          vendor_id: string
          rating: number
          comment?: string | null
          vendor_reply?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          inquiry_id?: string
          customer_id?: string
          vendor_id?: string
          rating?: number
          comment?: string | null
          vendor_reply?: string | null
          created_at?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          customer_id: string
          vendor_id: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          vendor_id: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          vendor_id?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}