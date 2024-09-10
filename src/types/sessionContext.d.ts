type Token = string;

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  birthDate: Date;
  creationDate: Date;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface SignupInfo {
  name: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
}

interface SessionContextModel {
  user?: User;
  token?: Token;
  login: (data: LoginInfo) => Promise<boolean>;
  signUp: (data: SignupInfo) => Promise<boolean>;
  logout: () => void;
}
