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
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          inserted_at: string
          locality: string | null
          role: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          inserted_at?: string
          locality?: string | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          inserted_at?: string
          locality?: string | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
      }
      turfs: {
        Row: {
          addrerss: string | null
          created_at: string | null
          id: number
          name: string | null
          profile_id: string | null
        }
        Insert: {
          addrerss?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          profile_id?: string | null
        }
        Update: {
          addrerss?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
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

