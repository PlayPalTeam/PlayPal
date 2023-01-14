export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			bookings: {
				Row: {
					turfs: {
						turf_name: string;
						location: string;
					};
					booking_id: string;
					created_at: string | null;
					date: string | null;
					end_time: string | null;
					profile_id: string | null;
					start_time: string | null;
					turf_id: string | null;
					updated_at: string | null;
				};
				Insert: {
					booking_id?: string;
					created_at?: string | null;
					date?: string | null;
					end_time?: string | null;
					profile_id?: string | null;
					start_time?: string | null;
					turf_id?: string | null;
					updated_at?: string | null;
				};
				Update: {
					booking_id?: string;
					created_at?: string | null;
					date?: string | null;
					end_time?: string | null;
					profile_id?: string | null;
					start_time?: string | null;
					turf_id?: string | null;
					updated_at?: string | null;
				};
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					full_name: string | null;
					id: string;
					inserted_at: string;
					phone_number: number | null;
					role: string | null;
					updated_at: string;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					full_name?: string | null;
					id: string;
					inserted_at?: string;
					phone_number?: number | null;
					role?: string | null;
					updated_at?: string;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					full_name?: string | null;
					id?: string;
					inserted_at?: string;
					phone_number?: number | null;
					role?: string | null;
					updated_at?: string;
					username?: string | null;
				};
			};
			requests: {
				Row: {
					created_at: string | null;
					game: string | null;
					game_date: string | null;
					player_needed: number | null;
					profile_id: string | null;
					request_id: string;
					turf_id: string | null;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					game?: string | null;
					game_date?: string | null;
					player_needed?: number | null;
					profile_id?: string | null;
					request_id?: string;
					turf_id?: string | null;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					game?: string | null;
					game_date?: string | null;
					player_needed?: number | null;
					profile_id?: string | null;
					request_id?: string;
					turf_id?: string | null;
					updated_at?: string | null;
				};
			};
			turfs: {
				Row: {
					avatar_url: string | null;
					capacity: number | null;
					created_at: string | null;
					daytime: string | null;
					description: string | null;
					location: string | null;
					price_per_hour: number | null;
					profile_id: string | null;
					turf_id: string;
					turf_name: string | null;
					updated_at: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					capacity?: number | null;
					created_at?: string | null;
					daytime?: string | null;
					description?: string | null;
					location?: string | null;
					price_per_hour?: number | null;
					profile_id?: string | null;
					turf_id?: string;
					turf_name?: string | null;
					updated_at?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					capacity?: number | null;
					created_at?: string | null;
					daytime?: string | null;
					description?: string | null;
					location?: string | null;
					price_per_hour?: number | null;
					profile_id?: string | null;
					turf_id?: string;
					turf_name?: string | null;
					updated_at?: string | null;
				};
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
	};
}
