import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, forkJoin, map, Observable, tap } from 'rxjs';
import { IUser } from '../models/IUser';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../routers/ApiRoutes';
import { UserDetailsService } from './user-details.service';
import { setTotal } from '../../store/user.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private readonly env: string = environment.baseURL;
  constructor(
    private http: HttpClient,
    private userDetailsService: UserDetailsService,
    private store: Store
  ) {}

  searchUsers(searchData: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.env}${ApiRoutes.Users.Search}?q=${searchData.query} type:${searchData.filterBy}&page=${searchData.page}&per_page=${searchData.pageSize}`
      )
      .pipe(
        map((response) => {
          this.store.dispatch(setTotal({ total: response.total_count }));
          const userRequests = response.items.map((user: IUser) =>
            this.userDetailsService.getUserDetails(user.login)
          );
          return forkJoin(userRequests);
        }),
        concatMap((usersObservable) => usersObservable),
        map((users: any) => {
          return this.sortUsers(users, searchData.sortBy);
        })
      );
  }

  private sortUsers(users: IUser[], sortBy: string): IUser[] {
    if (sortBy === 'login') {
      return users.sort((a, b) => a.login.localeCompare(b.login));
    } else if (sortBy === 'followers') {
      return users.sort((a, b) => b.followers - a.followers);
    } else if (sortBy === 'repositories') {
      return users.sort((a, b) => b.public_repos - a.public_repos);
    }
    return users;
  }
}
