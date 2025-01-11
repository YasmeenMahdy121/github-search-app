import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRepository } from '../models/IRepository';
import { ApiRoutes } from '../routers/ApiRoutes';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private readonly env: string = environment.baseURL;
  constructor(private http: HttpClient) {}
  getUserDetails(userName: string): Observable<IUser> {
    return this.http.get<IUser>(
      `${this.env}${ApiRoutes.Users.details}/${userName}`
    );
  }
  getUserRepositories(userName: string): Observable<IRepository[]> {
    return this.http.get<IRepository[]>(
      `${this.env}${ApiRoutes.Users.details}/${userName}/repos`
    );
  }
}
