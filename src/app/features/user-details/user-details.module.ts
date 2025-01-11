import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
  },
];

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UserDetailsModule {}
