type Token = string;

interface User {
  name: string;
  lastName: string;
  email: string;
  birthDate: Date;
}

interface SessionContextModel {
  user?: User;
  token?: Token;
  login: () => Promise<string>;
  signUp: () => Promise<string>;
  logout: () => void;
}
