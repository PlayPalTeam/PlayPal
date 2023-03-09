export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_id: string
          cost: number
          date: string | null
          profile_id: string | null
          selectedsport: string | null
          times: string[] | null
          turf_id: string | null
        }
        Insert: {
          booking_id?: string
          cost?: number
          date?: string | null
          profile_id?: string | null
          selectedsport?: string | null
          times?: string[] | null
          turf_id?: string | null
        }
        Update: {
          booking_id?: string
          cost?: number
          date?: string | null
          profile_id?: string | null
          selectedsport?: string | null
          times?: string[] | null
          turf_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          block: boolean | null
          full_name: string | null
          id: string
          phone_number: string | null
          request: string[] | null
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          block?: boolean | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          request?: string[] | null
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          block?: boolean | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          request?: string[] | null
          role?: string | null
          username?: string | null
        }
      }
      requests: {
        Row: {
          game: string | null
          game_date: string | null
          id: number
          people: string[] | null
          player_needed: number | null
          profile_id: string | null
          turf_id: string | null
        }
        Insert: {
          game?: string | null
          game_date?: string | null
          id?: number
          people?: string[] | null
          player_needed?: number | null
          profile_id?: string | null
          turf_id?: string | null
        }
        Update: {
          game?: string | null
          game_date?: string | null
          id?: number
          people?: string[] | null
          player_needed?: number | null
          profile_id?: string | null
          turf_id?: string | null
        }
      }
      sales: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          sale_date: string | null
          sale_price: number | null
          sales_id: string
          turf_id: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          sale_date?: string | null
          sale_price?: number | null
          sales_id?: string
          turf_id?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          sale_date?: string | null
          sale_price?: number | null
          sales_id?: string
          turf_id?: string | null
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
          price: number | null
          profile_id: string | null
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
          price?: number | null
          profile_id?: string | null
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
          price?: number | null
          profile_id?: string | null
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
