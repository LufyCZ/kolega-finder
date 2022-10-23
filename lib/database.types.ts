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
      lecture: {
        Row: {
          id: number
          subject: string
          created_at: string | null
          updated_at: string | null
          creator: string
          room: string
          name: string | null
        }
        Insert: {
          id?: number
          subject: string
          created_at?: string | null
          updated_at?: string | null
          creator: string
          room: string
          name?: string | null
        }
        Update: {
          id?: number
          subject?: string
          created_at?: string | null
          updated_at?: string | null
          creator?: string
          room?: string
          name?: string | null
        }
      }
      lectureSeats: {
        Row: {
          id: number
          lecture: number
          seat: number
          user_id: string
        }
        Insert: {
          id?: number
          lecture: number
          seat: number
          user_id: string
        }
        Update: {
          id?: number
          lecture?: number
          seat?: number
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      seat_taken: {
        Args: { lecture: number; seat: number }
        Returns: boolean
      }
      user_per_lecture_count: {
        Args: { lecture: number; user_id: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
