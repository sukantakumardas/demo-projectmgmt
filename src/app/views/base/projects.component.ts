import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  templateUrl: 'projects.component.html'
})
export class ProjectsComponent implements OnInit {
  username = sessionStorage.getItem('username');
  role = sessionStorage.getItem('role');
  userId = sessionStorage.getItem('userId');
  projects: ProjectModel[];
  constructor(private dashservice: DashboardService, private router: Router) { }
  ngOnInit(): void {
    const user = new User(this.userId, '', '', this.role);
    this.dashservice.getProjects(user).subscribe((projectArr: ProjectModel[]) => {
      this.projects = projectArr;
      console.log(projectArr);
    });
  }
  editProject (id) {
    console.log('selected id is ' + id);
    this.router.navigate(['/base/create-project', id]);
  }

}
