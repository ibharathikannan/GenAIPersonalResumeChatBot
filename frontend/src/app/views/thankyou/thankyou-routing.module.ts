import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThankyouContainerComponent } from './thankyou-container/thankyou-container.component';

const routes: Routes = [
  {
    path: '',
    component: ThankyouContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankyouRoutingModule { }
