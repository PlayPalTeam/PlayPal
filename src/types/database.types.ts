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
        }
      }
      bookings_duplicate: {
        Row: {
          booking_id: string
          created_at: string | null
          date: string | null
          end_time: string | null
          profile_id: string | null
          start_time: string | null
          starttimes: number | null
          turf_id: string | null
          updated_at: string | null
        }
        Insert: {
          booking_id?: string
          created_at?: string | null
          date?: string | null
          end_time?: string | null
          profile_id?: string | null
          start_time?: string | null
          starttimes?: number | null
          turf_id?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          date?: string | null
          end_time?: string | null
          profile_id?: string | null
          start_time?: string | null
          starttimes?: number | null
          turf_id?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          phone_number: number | null
          request: string[] | null
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          phone_number?: number | null
          request?: string[] | null
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
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
          amenities: string[] | null
          avatar_url: string | null
          capacity: number | null
          created_at: string | null
          description: string | null
          ending_hours: string | null
          location: string | null
          opening_hours: string | null
          price_per_hour: number | null
          profile_id: string | null
          sports: string[] | null
          turf_id: string
          turf_name: string | null
          updated_at: string | null
          venuerules: string | null
        }
        Insert: {
          amenities?: string[] | null
          avatar_url?: string | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          ending_hours?: string | null
          location?: string | null
          opening_hours?: string | null
          price_per_hour?: number | null
          profile_id?: string | null
          sports?: string[] | null
          turf_id?: string
          turf_name?: string | null
          updated_at?: string | null
          venuerules?: string | null
        }
        Update: {
          amenities?: string[] | null
          avatar_url?: string | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          ending_hours?: string | null
          location?: string | null
          opening_hours?: string | null
          price_per_hour?: number | null
          profile_id?: string | null
          sports?: string[] | null
          turf_id?: string
          turf_name?: string | null
          updated_at?: string | null
          venuerules?: string | null
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

