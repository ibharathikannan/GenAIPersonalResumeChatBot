import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankyouRoutingModule } from './thankyou-routing.module';
import { ThankyouContainerComponent } from './thankyou-container/thankyou-container.component';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [ThankyouContainerComponent],
  imports: [
    CommonModule,
    ThankyouRoutingModule,
    SharedModule
  ]
})
export class ThankyouModule { }
