import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/routers/appRouters';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.usersList,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.usersList,
    loadChildren: () =>
      import('./features/users-list/users-list.module').then(
        (m) => m.UsersListModule
      ),
  },
  {
    path: AppRoutes.userDetails + '/:userName',
    loadChildren: () =>
      import('./features/user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
