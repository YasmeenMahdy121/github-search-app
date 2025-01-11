import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { IUser } from '../shared/models/IUser';
import { IRepository } from '../shared/models/IRepository';

export interface State {
  users: IUser[];
  total: number;
  selectedUser: IUser | null;
  selectedUserRepositories: IRepository[];
  loading: boolean;
  error: string | null;
}

// initial state
export const initialState: State = {
  users: [],
  total: 0,
  selectedUser: null,
  selectedUserRepositories: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  // Handle search users action
  on(UserActions.searchUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Handle search users success
  on(UserActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),

  // Handle search users success
  on(UserActions.setTotal, (state, { total }) => ({
    ...state,
    total,
  })),

  // Handle search users failure
  on(UserActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handle user selection
  on(UserActions.selectUser, (state, { userName }) => ({
    ...state,
    selectedUser: state.users.find((user) => user.login === userName) || null,
  })),

  // Handle loading user details success
  on(UserActions.loadUserDetailsSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
  })),

  // Handle loading user details failure
  on(UserActions.loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Handle loading user repositories
  on(UserActions.loadUserRepositoriesSuccess, (state, { repositories }) => ({
    ...state,
    selectedUserRepositories: repositories,
  })),

  // Handle loading user repositories failure
  on(UserActions.loadUserRepositoriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
