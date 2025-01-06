// 수파베이스 파입 정리 파일입니다.
// 테이블 마다 만들어주세요.
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type HotelsDatabase = {
  public: {
    Tables: {
      hotels: {
        Row: {
          id: string; // uuid
          name: string; // text
          stars: number; // int2
          address: string; // text
          contact_id: string; // uuid
          description: string; // text
          main_img_url: string; // text
          check_in: string; // text
          check_out: string; // text
          min_price: number; // int8
          kind: string; // text
          user_id: string; // uuid
          hotel_img_url: Json; // jsonb
        };
        Insert: {
          id?: string; // uuid
          name?: string; // text
          stars?: number; // int2
          address?: string; // text
          contact_id?: string; // uuid
          description?: string; // text
          main_img_url?: string; // text
          check_in?: string; // text
          check_out?: string; // text
          min_price?: number; // int8
          kind?: string; // text
          user_id?: string; // uuid
          hotel_img_url?: Json; // jsonb
        };
        Update: {
          id?: string; // uuid
          name?: string; // text
          stars?: number; // int2
          address?: string; // text
          contact_id?: string; // uuid
          description?: string; // text
          main_img_url?: string; // text
          check_in?: string; // text
          check_out?: string; // text
          min_price?: number; // int8
          kind?: string; // text
          user_id?: string; // uuid
          hotel_img_url?: Json; // jsonb
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
