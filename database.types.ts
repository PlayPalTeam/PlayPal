export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Bookings: {
        Row: {
          booking_date: string;
          booking_id: string;
          created_at: string;
          end_time: string;
          start_time: string;
          total_price: number;
          turf_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          booking_date: string;
          booking_id?: string;
          created_at?: string;
          end_time: string;
          start_time: string;
          total_price: number;
          turf_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          booking_date?: string;
          booking_id?: string;
          created_at?: string;
          end_time?: string;
          start_time?: string;
          total_price?: number;
          turf_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Bookings_turf_id_fkey";
            columns: ["turf_id"];
            referencedRelation: "Turfs";
            referencedColumns: ["turf_id"];
          },
          {
            foreignKeyName: "Bookings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "NormalUsers";
            referencedColumns: ["user_id"];
          },
        ];
      };
      NormalUsers: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          date_of_birth: string | null;
          first_name: string;
          last_name: string;
          role: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          first_name: string;
          last_name: string;
          role?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          first_name?: string;
          last_name?: string;
          role?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "NormalUsers_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      TurfOwners: {
        Row: {
          business_address: string;
          business_name: string;
          created_at: string;
          description: string;
          turf_owner_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          business_address: string;
          business_name: string;
          created_at?: string;
          description: string;
          turf_owner_id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          business_address?: string;
          business_name?: string;
          created_at?: string;
          description?: string;
          turf_owner_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "TurfOwners_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "NormalUsers";
            referencedColumns: ["user_id"];
          },
        ];
      };
      Turfs: {
        Row: {
          address: string;
          capacity: number;
          created_at: string;
          price: number;
          turf_id: string;
          turf_name: string;
          turf_owner_id: string;
          updated_at: string;
        };
        Insert: {
          address: string;
          capacity: number;
          created_at?: string;
          price: number;
          turf_id?: string;
          turf_name: string;
          turf_owner_id: string;
          updated_at?: string;
        };
        Update: {
          address?: string;
          capacity?: number;
          created_at?: string;
          price?: number;
          turf_id?: string;
          turf_name?: string;
          turf_owner_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Turfs_turf_owner_id_fkey";
            columns: ["turf_owner_id"];
            referencedRelation: "TurfOwners";
            referencedColumns: ["turf_owner_id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
