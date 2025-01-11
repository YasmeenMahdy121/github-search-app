import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/IUser';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectLoading,
  selectSelectedUser,
  selectSelectedUserRepositories,
} from '../../store/user.selectors';
import { loadUserRepositories, selectUser } from '../../store/user.actions';
import { IRepository } from '../../shared/models/IRepository';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  // stored date
  selectedUser$: Observable<IUser | null>;
  selectedUserRepositories$: Observable<IRepository[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.selectedUserRepositories$ = this.store.select(
      selectSelectedUserRepositories
    );
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('userName')!;
    this.store.dispatch(selectUser({ userName }));
    this.store.dispatch(loadUserRepositories({ userName }));
  }
}
