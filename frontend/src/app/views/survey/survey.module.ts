import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { SurveyContainerComponent } from './survey-container/survey-container.component';
import { SurveyRoutingModule } from './survey-routing.module';

// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { SurveyMessageComponent } from './survey-container/survey-message/survey-message.component';

@NgModule({
  imports: [
    CommonModule,
    SurveyRoutingModule,
    SharedModule,
    // ShareButtonsModule,
  ],
  declarations: [SurveyContainerComponent, SurveyMessageComponent]
})
export class SurveyModule { }
