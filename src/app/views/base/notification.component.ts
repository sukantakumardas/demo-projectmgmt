import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationModel } from '../../model/notification.model';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { LoginService } from '../../services/login/login.service';
import { ProjectService } from '../../services/project/project.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private dashservice: DashboardService, private datepipe: DatePipe, private loginService: LoginService) {}
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  notification: NotificationModel = {'id': 0, 'from': null, 'message': null, 'to': null,
  'date': null};
  userArr: User[] = [];
  success: boolean;
  message: string;
  ngOnInit(): void {
    this.success = false;
    this.message = '';
    const userId = sessionStorage.getItem('userId');
    this.loginService.getUsers().subscribe((userList: User[]) => {
      if (userList !== null && userList !== undefined) {
        userList.forEach(user => {
          if (user.userId !== userId) {
            this.userArr.push(user);
          }
        });
      }
      console.log(this.userArr);
    });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  createNotification (notification: NotificationModel) {
    this.notification = notification;
    this.notification.from = sessionStorage.getItem('userId');
    this.notification.date = this.formatDate(new Date());
    console.log(this.notification);
    this.dashservice.createNotification(this.notification).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        this.message =  'Notification created successfully';
        this.success = true;
      },
      error => {
        console.log('Error', error);
        this.message = 'Notification creation failed';
        this.success = false;
      }
    );

  }
  formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const dateStr = this.datepipe.transform(date, 'MM/dd/yyyy');
    const strTime = dateStr + ' ' + hours + '.' + minutes + ' ' + ampm;
    return strTime;
  }

}
