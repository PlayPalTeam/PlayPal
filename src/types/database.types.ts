export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_id: string
          profile_id: string | null
          turf_id: string | null
          start_time: string | null
          end_time: string | null
          date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          booking_id?: string
          profile_id?: string | null
          turf_id?: string | null
          start_time?: string | null
          end_time?: string | null
          date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string
          profile_id?: string | null
          turf_id?: string | null
          start_time?: string | null
          end_time?: string | null
          date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: string | null
          inserted_at: string
          updated_at: string
          phone_number: number | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          inserted_at?: string
          updated_at?: string
          phone_number?: number | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          inserted_at?: string
          updated_at?: string
          phone_number?: number | null
        }
      }
      turfs: {
        Row: {
          turf_id: string
          turf_name: string | null
          location: string | null
          price_per_hour: number | null
          capacity: number | null
          created_at: string | null
          updated_at: string | null
          profile_id: string | null
        }
        Insert: {
          turf_id?: string
          turf_name?: string | null
          location?: string | null
          price_per_hour?: number | null
          capacity?: number | null
          created_at?: string | null
          updated_at?: string | null
          profile_id?: string | null
        }
        Update: {
          turf_id?: string
          turf_name?: string | null
          location?: string | null
          price_per_hour?: number | null
          capacity?: number | null
          created_at?: string | null
          updated_at?: string | null
          profile_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
