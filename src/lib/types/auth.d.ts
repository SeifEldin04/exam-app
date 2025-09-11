export type AuthResponse = {
  token: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    accessToken: string;
  } & DatabaseProperties;
};
