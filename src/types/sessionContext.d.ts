type Token = string;

interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  bday: Date;
  creationDate: Date;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface SignupInfo {
  name: string;
  last_name: string;
  bday: Date;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  last_name: string;
  bday: string;
  creationDate: string;
  email: string;
}

interface SessionContextModel {
  wordsCount: number;
  updateWordsCount: () => Promise<void>;
  user?: User;
  token?: Token;
  login: (data: LoginInfo) => Promise<boolean>;
  signUp: (data: SignupInfo) => Promise<boolean>;
  logout: () => void;
  refresh: () => Promise<void>;
  hash: (password: string) => string;
}
