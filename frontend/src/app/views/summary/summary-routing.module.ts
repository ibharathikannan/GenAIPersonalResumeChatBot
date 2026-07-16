import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryContainerComponent } from './summary-container/summary-container.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
