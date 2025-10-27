export type UserType = 'Individu' | 'Lembaga';

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  no_hp: string;
  user_type: UserType;
  address: string;
  created_at: string;
  is_active: boolean;
}
