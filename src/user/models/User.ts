export class User {
  id: number;
  name: string;
  password: string;
  role: string;
  constructor(id: number, name: string, password: string, role: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;
  }
}
