export interface UserMetadata {
  email: string;
  role: string;
}

export interface SupabaseUser {
  id: string;
  email: string;
  created_at: string;
  app_metadata: UserMetadata;
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          contact_id: string;
          content: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          contact_id?: string;
          content: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          contact_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'answers_contact_id_fkey';
            columns: ['contact_id'];
            isOneToOne: false;
            referencedRelation: 'contacts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'answers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      bookings: {
        Row: {
          check_in_date: string;
          check_out_date: string;
          created_at: string;
          id: string;
          room_id: string;
          status: string;
          user_id: string;
        };
        Insert: {
          check_in_date: string;
          check_out_date: string;
          created_at?: string;
          id?: string;
          room_id?: string;
          status: string;
          user_id?: string;
        };
        Update: {
          check_in_date?: string;
          check_out_date?: string;
          created_at?: string;
          id?: string;
          room_id?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      contacts: {
        Row: {
          booking_id: string | null;
          content: string;
          created_at: string;
          hotel_id: string | null;
          id: string;
          room_id: string | null;
          title: string;
          user_id: string | null;
        };
        Insert: {
          booking_id?: string | null;
          content: string;
          created_at: string;
          hotel_id?: string | null;
          id?: string;
          room_id?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          booking_id?: string | null;
          content?: string;
          created_at?: string;
          hotel_id?: string | null;
          id?: string;
          room_id?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'contacts_booking_id_fkey';
            columns: ['booking_id'];
            isOneToOne: false;
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contacts_hotel_id_fkey';
            columns: ['hotel_id'];
            isOneToOne: false;
            referencedRelation: 'hotels';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contacts_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contacts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      hotels: {
        Row: {
          address: string;
          check_in: string;
          check_out: string;
          contact_id: string;
          description: string;
          hotel_img_url: Json | null;
          id: string;
          kind: string;
          main_img_url: string;
          min_price: number;
          name: string;
          stars: number;
          user_id: string;
          facilities: Record<string, boolean> | null; // 추가된 JSONB 칼럼
          services: Record<string, boolean> | null; // 추가된 JSONB 칼럼
        };
        Insert: {
          address: string;
          check_in: string;
          check_out: string;
          contact_id?: string;
          description: string;
          hotel_img_url?: Json | null;
          id?: string;
          kind: string;
          main_img_url: string;
          min_price: number;
          name: string;
          stars: number;
          user_id?: string;
          facilities?: Record<string, null> | null; // 추가된 JSONB 칼럼
          services?: Record<string, null> | null; // 추가된 JSONB 칼럼
        };
        Update: {
          address?: string;
          check_in?: string;
          check_out?: string;
          contact_id?: string;
          description?: string;
          hotel_img_url?: Json | null;
          id?: string;
          kind?: string;
          main_img_url?: string;
          min_price?: number;
          name?: string;
          stars?: number;
          user_id?: string;
          facilities?: Record<string, boolean> | null; // 추가된 JSONB 칼럼
          services?: Record<string, boolean> | null; // 추가된 JSONB 칼럼
        };
        Relationships: [
          {
            foreignKeyName: 'hotels_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      reviews: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          rating: number;
          review_img_url: Json | null;
          room_id: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          rating: number;
          review_img_url?: Json | null;
          room_id?: string;
          user_id?: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          rating?: number;
          review_img_url?: Json | null;
          room_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      rooms: {
        Row: {
          bed_type: string;
          hotel_id: string;
          id: string;
          price: number;
          room_img_url: Json | null;
          room_type: string;
        };
        Insert: {
          bed_type: string;
          hotel_id?: string;
          id?: string;
          price: number;
          room_img_url?: Json | null;
          room_type: string;
        };
        Update: {
          bed_type?: string;
          hotel_id?: string;
          id?: string;
          price?: number;
          room_img_url?: Json | null;
          room_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rooms_hotel_id_fkey';
            columns: ['hotel_id'];
            isOneToOne: false;
            referencedRelation: 'hotels';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          business_number: number | null;
          created_at: string;
          email: string;
          id: string;
          nickname: string | null;
          phone_number: number;
          role: string;
          user_info: Json | null;
          user_name: string;
        };
        Insert: {
          business_number?: number | null;
          created_at?: string;
          email: string;
          id?: string;
          nickname?: string | null;
          phone_number: number;
          role: string;
          user_info?: Json | null;
          user_name: string;
        };
        Update: {
          business_number?: number | null;
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string | null;
          phone_number?: number;
          role?: string;
          user_info?: Json | null;
          user_name?: string;
        };
        Relationships: [];
      };
      favorites: {
        // 새로운 테이블 추가
        Row: {
          id: string; // 기본 키
          created_at: string; // 생성 시점
          hotel_id: string; // 외래 키: hotels 테이블의 id
          user_id: string; // 외래 키: users 테이블의 id
        };
        Insert: {
          id?: string; // 선택적으로 기본 키 설정
          created_at?: string; // 선택적으로 생성 시점 설정
          hotel_id: string; // 필수: hotels 테이블의 id
          user_id: string; // 필수: users 테이블의 id
        };
        Update: {
          id?: string; // 선택적으로 업데이트
          created_at?: string; // 선택적으로 업데이트
          hotel_id?: string; // 선택적으로 업데이트
          user_id?: string; // 선택적으로 업데이트
        };
        Relationships: [
          {
            foreignKeyName: 'favorites_hotel_id_fkey'; // 외래 키 이름
            columns: ['hotel_id']; // 현재 테이블의 참조 열
            isOneToOne: false; // 다대일 관계
            referencedRelation: 'hotels'; // 참조 테이블
            referencedColumns: ['id']; // 참조 테이블의 열
          },
          {
            foreignKeyName: 'favorites_user_id_fkey'; // 외래 키 이름
            columns: ['user_id']; // 현재 테이블의 참조 열
            isOneToOne: false; // 다대일 관계
            referencedRelation: 'users'; // 참조 테이블
            referencedColumns: ['id']; // 참조 테이블의 열
          }
        ];
      };
    };
    Views: {
      /* ... */
    };
    Functions: {
      /* ... */
    };
    Enums: {
      /* ... */
    };
    CompositeTypes: {
      /* ... */
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
