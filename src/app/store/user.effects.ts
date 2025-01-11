import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UsersListService } from '../shared/services/users-list.service';
import { UserDetailsService } from '../shared/services/user-details.service';
import { IUser } from '../shared/models/IUser';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersListService: UsersListService,
    private userDetailsService: UserDetailsService
  ) {}

  // Effect to search users
  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsers),
      mergeMap((action) =>
        this.usersListService.searchUsers(action).pipe(
          map((users) => UserActions.searchUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.searchUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect to load user details
  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      mergeMap((action) =>
        this.userDetailsService.getUserDetails(action.userName).pipe(
          map((user: IUser) => UserActions.loadUserDetailsSuccess({ user })),
          catchError((error) =>
            of(UserActions.loadUserDetailsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect to load user repositories
  loadUserRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      mergeMap((action) =>
        this.userDetailsService.getUserRepositories(action.userName).pipe(
          map((repositories) =>
            UserActions.loadUserRepositoriesSuccess({ repositories })
          ),
          catchError((error) =>
            of(
              UserActions.loadUserRepositoriesFailure({ error: error.message })
            )
          )
        )
      )
    )
  );
}
