export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  passwordConfirmation: string;
  name: string;
}

export interface UserResponse {
  id: number;
  provider: string;
  uid: string;
  allowPassword: boolean;
  name: string | null;
  nickname: string | null;
  image: string | null;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AuthResponseSuccess {
  status: "success";
  data: UserResponse;
}

export interface AuthResponseError {
  status: "error";
  data: UserResponse;
  errors: {
    fullMessages: string[];
  };
}

export type AuthResponse = AuthResponseSuccess | AuthResponseError;
