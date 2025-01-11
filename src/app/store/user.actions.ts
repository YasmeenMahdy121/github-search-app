import { createAction, props } from '@ngrx/store';
import { IUser } from '../shared/models/IUser';
import { IRepository } from '../shared/models/IRepository';

// Action for search users
export const searchUsers = createAction(
  '[Search User] Search Users',
  props<{
    query: string;
    page: number;
    pageSize: number;
    filterBy: string;
    sortBy: string;
  }>()
);

// Action for search users success
export const searchUsersSuccess = createAction(
  '[Search User] Search Users Success',
  props<{ users: IUser[] }>()
);

// Action for select total users
export const setTotal = createAction(
  '[Search User] Total Users',
  props<{ total: number }>()
);

// Action for search users failer
export const searchUsersFailure = createAction(
  '[User List] Search Users Failure',
  props<{ error: string }>()
);

// Action for selecting a user
export const selectUser = createAction(
  '[User Details] Select User',
  props<{ userName: string }>()
);

// Action for success of loading user details
export const loadUserDetailsSuccess = createAction(
  '[User Details] Load User Details Success',
  props<{ user: IUser }>()
);

// Action for failure of loading user details
export const loadUserDetailsFailure = createAction(
  '[User Details] Load User Details Failure',
  props<{ error: string }>()
);

// Action to load user repositories
export const loadUserRepositories = createAction(
  '[User] Load User Repositories',
  props<{ userName: string }>()
);

// Action for success of loading repositories
export const loadUserRepositoriesSuccess = createAction(
  '[User] Load User Repositories Success',
  props<{ repositories: IRepository[] }>()
);

// Action for failure of loading repositories
export const loadUserRepositoriesFailure = createAction(
  '[User] Load User Repositories Failure',
  props<{ error: string }>()
);
