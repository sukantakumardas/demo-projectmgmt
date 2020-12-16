export class User {

    constructor(
      public userId: string,
      public password: string,
      public userName?: string,
      public role?: string
    ) {  }
}
