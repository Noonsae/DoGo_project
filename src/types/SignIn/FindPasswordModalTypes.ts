export interface FormState {
  email: string;
  phone: string;
  otp: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  modalType: 'input' | 'reset' | 'success';
  showConfirmPassword: boolean;
  showPassword: boolean;
  activeTab: 'user' | 'business';
  name: string;
}

export interface ErrorState {
  email?: string;
  phone?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
}
