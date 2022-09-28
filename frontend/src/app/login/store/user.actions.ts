export class AddUser {
  static readonly type = '[User] Add User';
  constructor(
    public token: string,
    public username: string,
    public idrol: number
  ) {}
}

export class ResetUser {
  static readonly type = '[User] Reset User';
}

