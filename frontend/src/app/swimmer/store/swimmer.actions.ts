export class AddSwimmer {
    static readonly type = '[Swimmer] Add Swimmer';
    constructor(public name: any) {}
  }

  export class ResetSwimmer {
    static readonly type = '[User] Reset Swimmer';
  }