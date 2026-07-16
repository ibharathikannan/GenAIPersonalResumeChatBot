import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyContainerComponent } from './survey-container/survey-container.component';

const routes: Routes = [
  {
    path: ':bookingRef',
    component: SurveyContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
