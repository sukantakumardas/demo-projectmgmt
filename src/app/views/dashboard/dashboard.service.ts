import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { NotificationModel } from '../../model/notification.model';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) { }
  configUrl = 'http://localhost:3000/projects';
  notificationUrl = 'http://localhost:3000/notifications';

getProjects(user: User) {
    let url = null;
    if (user.role === 'admin') {
        url = this.configUrl + '?createdBy=' + user.userId;
    } else {
        url = this.configUrl;
    }
  console.log('URL is ' + url);
    return this.http.get(url);
}
projectCount() {
  let count = 0;
   this.http.get(this.configUrl).subscribe( (data: ProjectModel[]) => {
    count = data.length;
  });
  console.log('Project Count is ' + count);
  return count;
}
getProjectById(id: number) {
  const url = this.configUrl + '/' + id;
console.log('URL is ' + url);
  return this.http.get(url);
}
getNotification(userId: string) {
  return this.http.get(this.notificationUrl + '?to=' + userId);
}
createNotification(notification: NotificationModel) {
  return this.http.post(this.notificationUrl + '/', notification);
}
}
