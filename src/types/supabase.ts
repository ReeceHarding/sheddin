export interface Database {
  public: {
    Tables: {
      user_configs: {
        Row: {
          id: string;
          user_id: string;
          config_name: string;
          options: Record<string, string>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          config_name: string;
          options: Record<string, string>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          config_name?: string;
          options?: Record<string, string>;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}