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
  login: () => void;
  signUp: () => void;
  logout: () => void;
}
