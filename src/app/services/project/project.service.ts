import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../model/user.model';
import { ProjectModel } from '../../model/project.model';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) { }
  api = 'http://localhost:3000/projects/';

create(project: ProjectModel): any {
    return this.http.post(this.api, project);
}
update(project: ProjectModel, id: number): any {
  return this.http.put(this.api + '/' + id + '/', project);
}
}
