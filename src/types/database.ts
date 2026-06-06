export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string
            username: string
            full_name: string | null
            avatar_url: string | null
            bio: string | null
            website: string | null
            twitter: string | null
            created_at: string
            updated_at: string
          }
          Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string; username: string }
          Update: Partial<Database['public']['Tables']['profiles']['Row']>
        }
      }
      Views: Record<string, never>
      Functions: Record<string, never>
      Enums: Record<string, never>
    }
  }