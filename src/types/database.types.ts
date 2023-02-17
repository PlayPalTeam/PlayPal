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
          created_at: string | null
          date: string | null
          end_time: string | null
          profile_id: string | null
          selectedsport: string | null
          start_time: string | null
          times: string[] | null
          turf_id: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          booking_id?: string
          created_at?: string | null
          date?: string | null
          end_time?: string | null
          profile_id?: string | null
          selectedsport?: string | null
          start_time?: string | null
          times?: string[] | null
          turf_id?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          date?: string | null
          end_time?: string | null
          profile_id?: string | null
          selectedsport?: string | null
          start_time?: string | null
          times?: string[] | null
          turf_id?: string | null
          updated_at?: string | null
          user?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          block: boolean | null
          full_name: string | null
          id: string
          phone_number: number | null
          request: string[] | null
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          block?: boolean | null
          full_name?: string | null
          id: string
          phone_number?: number | null
          request?: string[] | null
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          block?: boolean | null
          full_name?: string | null
          id?: string
          phone_number?: number | null
          request?: string[] | null
          role?: string | null
          username?: string | null
        }
      }
      requests: {
        Row: {
          created_at: string | null
          game: string | null
          game_date: string | null
          id: number
          people: string[] | null
          player_needed: number | null
          profile_id: string | null
          turf_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          game?: string | null
          game_date?: string | null
          id?: number
          people?: string[] | null
          player_needed?: number | null
          profile_id?: string | null
          turf_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          game?: string | null
          game_date?: string | null
          id?: number
          people?: string[] | null
          player_needed?: number | null
          profile_id?: string | null
          turf_id?: string | null
          updated_at?: string | null
        }
      }
      turfs: {
        Row: {
          address: string | null
          amenities: string[] | null
          capacity: number | null
          close_hour: string | null
          description: string | null
          open_hour: string | null
          owner: string | null
          price: number | null
          sports: string[] | null
          turf_id: string
          turf_image: string | null
          turf_name: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          capacity?: number | null
          close_hour?: string | null
          description?: string | null
          open_hour?: string | null
          owner?: string | null
          price?: number | null
          sports?: string[] | null
          turf_id?: string
          turf_image?: string | null
          turf_name?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          capacity?: number | null
          close_hour?: string | null
          description?: string | null
          open_hour?: string | null
          owner?: string | null
          price?: number | null
          sports?: string[] | null
          turf_id?: string
          turf_image?: string | null
          turf_name?: string | null
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
      roles: "lister" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

