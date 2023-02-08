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
      admin: {
        Row: {
          user_id: string
        }
        Insert: {
          user_id: string
        }
        Update: {
          user_id?: string
        }
      }
      lecture: {
        Row: {
          created_at: string | null
          creator: string
          id: number
          name: string | null
          room: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator: string
          id?: number
          name?: string | null
          room: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator?: string
          id?: number
          name?: string | null
          room?: string
          subject?: string
          updated_at?: string | null
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
        Args: {
          lecture: number
          seat: number
        }
        Returns: boolean
      }
      user_per_lecture_count: {
        Args: {
          lecture: number
          user_id: string
        }
        Returns: number
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
