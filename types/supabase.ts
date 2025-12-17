export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: number;
          title: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

export type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];
