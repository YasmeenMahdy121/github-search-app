import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/IUser';
import {
  selectError,
  selectLoading,
  selectTotal,
  selectUsers,
} from '../../store/user.selectors';
import { searchUsers } from '../../store/user.actions';
import { AppRoutes } from '../../shared/routers/appRouters';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  routes = AppRoutes;
  searchUsers = {
    query: '',
    page: 1,
    pageSize: 5,
    filterBy: '',
    sortBy: '',
  };
  users$: Observable<IUser[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  total$: Observable<number>;
  pageIndex: number = 0;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.total$ = this.store.select(selectTotal);
  }
  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(pageNum?: number): void {
    this.setPageNum(pageNum ? pageNum : 1);
    this.store.dispatch(
      searchUsers({
        ...this.searchUsers,
        query: this.searchUsers.query.trim() ? this.searchUsers.query : '*',
      })
    );
  }

  onPageChange(event: any): void {
    this.onSearch(event.pageIndex + 1);
  }
  setPageNum(pageNum: number) {
    this.pageIndex = pageNum - 1;
    this.searchUsers.page = pageNum;
  }
}
