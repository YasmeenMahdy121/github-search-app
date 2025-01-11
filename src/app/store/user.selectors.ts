import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer';

export const selectUserState = createFeatureSelector<State>('users');

// Select the list of users
export const selectUsers = createSelector(
  selectUserState,
  (state: State) => state?.users
);

export const selectTotal = createSelector(
  selectUserState,
  (state: State) => state.total
);

// Select loading state
export const selectLoading = createSelector(
  selectUserState,
  (state: State) => state.loading
);

// Select error state
export const selectError = createSelector(
  selectUserState,
  (state: State) => state.error
);

// Select selected user details
export const selectSelectedUser = createSelector(
  selectUserState,
  (state: State) => state.selectedUser
);

// Select repositories of the selected user
export const selectSelectedUserRepositories = createSelector(
  selectUserState,
  (state: State) => state.selectedUserRepositories
);
