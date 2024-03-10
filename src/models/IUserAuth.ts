export interface IUserAuth {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  username: string;
  first_name: string;
  birthdate: string;
  role_id: number;
  registered_at: string;
}
