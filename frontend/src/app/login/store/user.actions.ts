  export class AddToken {
    static readonly type = '[User] Add Token';
    constructor(public token: string,public username: string,public idrol:number) {}
  }