export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  nrOfCases: number;
  enabled: boolean;

  constructor(user: any = {email: null, password: null, role: null}) {
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }

}
