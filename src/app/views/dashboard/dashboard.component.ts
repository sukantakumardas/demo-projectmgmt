import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ProjectModel } from '../../model/project.model';
import { NotificationModel } from '../../model/notification.model';
import { DashboardService } from './dashboard.service';
import { User } from '../../model/user.model';
import 'chart.piecelabel.js';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';
  username = sessionStorage.getItem('username');
  role = sessionStorage.getItem('role');
  userId = sessionStorage.getItem('userId');
  projects: ProjectModel[];
  projectCount: number = 0;
  region1Count: number = 0;
  region2Count: number = 0;
  statusDraft: number = 0;
  statusInProgress: number = 0;
  statusCompleted: number = 0;
  public pieChartLabels: string[] = ['Draft', 'In Progress', 'Completed'];
  public pieChartDataRegion1: number[] = [1, 1, 1];
  public pieChartDataRegion2: number[] = [1, 1, 1];
  public pieChartType = 'pie';
  public option1: any = {
    responsive: true,
    pieceLabel: {
      render: function (args) {
        return args.value;
      }
    }
  };
  public option2: any = {
    responsive: true,
    pieceLabel: {
      render: function (args) {
        return args.value;
      }
    }
  };
  public options: any = {
    responsive: true,
    legend: {
      display: true,
      position: 'top'
    },
    pieceLabel: {
      render: function (args) {
        console.log('pieceLabel' +  args.label + '&' + args.value);
        const label = args.label,
              value = args.value;
        return label + ' = ' + value;
      }
    }
  };
 /*  chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false
  };
  chartOptions2 = {
    responsive: true,
    maintainAspectRatio: false
  }; */
  constructor (private dashBoardService: DashboardService) {

  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {

    const user = new User(this.userId, '', '', this.role);
    this.dashBoardService.getProjects(user).subscribe((projectArr: ProjectModel[]) => {

      console.log(projectArr);
      this.pieChartDataRegion1 = [0, 0, 0];
      this.pieChartDataRegion2 = [0, 0, 0];
      for (let i = 0; i < projectArr.length; i++) {
        this.projectCount++;
        if (projectArr[i].geo === 'Region 1 (Ajmer,Udyapur-Jaipur)') {
            this.region1Count++;
            console.log('region1Count count is ' + this.region1Count);
            if (projectArr[i].status === 'draft') {
              this.pieChartDataRegion1[0] = this.pieChartDataRegion1[0] + 1;
            } else if (projectArr[i].status === 'In progress') {
              this.pieChartDataRegion1[1] = this.pieChartDataRegion1[1] + 1;
            } else if (projectArr[i].status === 'Completed') {
              this.pieChartDataRegion1[2] = this.pieChartDataRegion1[2] + 1;
            }
        } else {
          this.region2Count++;
          if (this.pieChartDataRegion2.length === 0) {
            this.pieChartDataRegion2 = [0, 0, 0];
          }
          console.log('region2Count count is ' + this.region2Count);
          if (projectArr[i].status === 'draft') {
            this.pieChartDataRegion2[0] = this.pieChartDataRegion2[0] + 1;
          } else if (projectArr[i].status === 'In progress') {
            this.pieChartDataRegion2[1] = this.pieChartDataRegion2[1] + 1;
          } else if (projectArr[i].status === 'Completed') {
            this.pieChartDataRegion2[2] = this.pieChartDataRegion2[2] + 1;
          }
        }
    }
    });

  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
