import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationModel } from '../../model/notification.model';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { DashboardService } from '../../views/dashboard/dashboard.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = true;
  public navItems = navItems;
  public display = true;
  public username: string;
  public role: string;
  public userId: string;
  messageCount: number = 0;
  notificationArr: NotificationModel[] = [];
  @ViewChild('largeModal') public largeModal: ModalDirective;
  constructor (private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userId');
    console.log('user name is ' + this.username);
    const user = new User(this.userId, '', '', this.role);
    this.dashboardService.getNotification(this.userId).subscribe((arr: NotificationModel[]) => {

      console.log(arr);
      this.notificationArr = arr;
      this.messageCount = arr.length;
    console.log(this.notificationArr);
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
    console.log('sidebarMinimized ==' + this.sidebarMinimized);
  }
}
