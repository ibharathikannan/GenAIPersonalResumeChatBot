import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryContainerComponent } from './summary-container/summary-container.component';
import { SharedModule } from '@app/shared';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [SummaryContainerComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ]
})
export class SummaryModule { }
