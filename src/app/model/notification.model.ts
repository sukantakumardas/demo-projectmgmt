export class NotificationModel {

    constructor(
      public id: number,
      public from: string,
      public to: string,
      public message: string,
      public date: string
      ) {  }
}
