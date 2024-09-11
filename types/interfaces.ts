export interface User {
  username: string;
  email: string;
  password: string;
  image: File | null;
  bio: string;
  date?: Date;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface UserProfile {
  user: {
    id: string;
    username: string;
    email: string;
    bio: string;
  };
}

export interface UpdateUser {
  id: string;
  username: string;
  email: string;
  bio: string;
  pathname: string;
}
