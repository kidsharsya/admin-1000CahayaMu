export type UserType = 'Individu' | 'Lembaga';

export interface IndividualProfile {
  full_name: string;
  gender: 'male' | 'female';
}

export interface InstitutionProfile {
  name: string;
}

export interface UserTypes {
  id: string;
  email: string;
  no_hp: string;
  user_type: UserType;
  address: string;
  created_at: string;
  is_active: boolean;
  individual_profile?: IndividualProfile;
  institution_profile?: InstitutionProfile;
}
