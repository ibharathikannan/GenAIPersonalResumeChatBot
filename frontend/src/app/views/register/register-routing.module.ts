import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterContainerComponent } from './register-container/register-container.component';
import { MasterContainerComponent } from './master-container/master-container.component';
import { MasterStoreDetailsComponent } from './master-store-details/master-store-details.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterContainerComponent
  },
  {
    path: 'master',
    component: MasterContainerComponent
  },
  {
    path: 'master/:id',
    component: MasterStoreDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
