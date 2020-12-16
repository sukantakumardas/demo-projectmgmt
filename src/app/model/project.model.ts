import { NotificationModel } from './notification.model';

export class ProjectModel {

    constructor(
      public id: number,
      public projectName: string,
      public startDate: string,
      public timeLine: number,
      public cost: number,
      public geo: string,
      public projIncharge: string,
      public projInchargeEmail: string,
      public auditIncharge: string,
      public auditInchargeEmail: string,
      public status: string,
      public createdBy: string
    ) {  }
}
