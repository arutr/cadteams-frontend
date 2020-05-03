export interface RegistrationForm {
  type: 'individual' | 'enterprise';
  username: string;
  email: string;
  password: string;
  newsletter: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}
