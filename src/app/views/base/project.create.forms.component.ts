import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../../model/project.model';
import { ProjectService } from '../../services/project/project.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  templateUrl: 'project.create.forms.component.html'
})
export class ProjectCreationFormComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private projectService: ProjectService, private dashservice: DashboardService, private router: Router, private route: ActivatedRoute) {}
  projectId: number;
  projectCreatedBy: string;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  project: ProjectModel = {'id': 0, 'projectName': '', 'startDate': '',
  'timeLine': 0, 'cost': 0, 'geo': '0',
  'projIncharge': '', 'auditIncharge': '',
  'projInchargeEmail': '', 'auditInchargeEmail': '',
  'status': 'draft', 'createdBy': ''};
  success: boolean;
  message: string;
  ngOnInit(): void {
    this.success = false;
    this.message = '';
    this.projectId = this.route.snapshot.params['id'];
    if (this.projectId !== undefined && this.projectId > 0 ) {
    this.dashservice.getProjectById(this.projectId).subscribe((data: ProjectModel) => {
      console.log(data);
      this.project = data;
      this.projectCreatedBy = data.createdBy;
    });
  }
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
  createProject (projectForm: ProjectModel) {
    this.project = projectForm;
    if (this.projectId !== undefined && this.projectId > 0 ) {
      // Edit is called
      if (this.projectCreatedBy !== undefined && this.projectCreatedBy !== null) {
        this.project.createdBy = this.projectCreatedBy;
      } else {
        this.project.createdBy = sessionStorage.getItem('userId');
      }

      this.projectService.update(this.project, this.projectId).subscribe(
        data =>  {
          console.log('PUT Request is successful ', data);
          this.message =  'Project updated successfully';
          this.success = true;
        },
        error => {
          console.log('Error', error);
          this.message = 'Project updation failed';
          this.success = false;
        });
    } else {
     this.project.createdBy = sessionStorage.getItem('userId');
    console.log(this.project);
    this.projectService.create(this.project).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        this.message =  'Project created successfully';
        this.success = true;
      },
      error => {
        console.log('Error', error);
        this.message = 'Project creation failed';
        this.success = false;
      }
    );
    }


  }

}
