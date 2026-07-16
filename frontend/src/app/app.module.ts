import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';


import { SettingsModule } from './settings';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { validationMessage } from './core/validators/validation-message';
import { FormlyWrapperAddons } from './shared/formly/addons.wrapper';
import { addonsExtension } from './shared/formly/addons.extension';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegisterModule } from './views/register/register.module';
import { BookingModel } from './shared/models/booking.model';
import { BookingDetailModule } from './views/booking-detail/booking-detail.module';
import { SummaryModule } from './views/summary/summary.module';
import { ThankyouModule } from './views/thankyou/thankyou.module';
import { SurveyModule } from './views/survey/survey.module';
import { SurveyValidatorDirective } from './shared/directives/survey-validation.directive';
import { TimeSlotFilterPipe } from './shared/pipes/timeslot-filter';
import { BookingModule } from './views/booking/booking.module';
import { MasterModule } from './views/master/master.module';


@NgModule({ declarations: [
        AppComponent,
        FormlyWrapperAddons,
        SurveyValidatorDirective,
    ],
    bootstrap: [AppComponent], imports: [
        // angular
        BrowserAnimationsModule,
        BrowserModule,
        NgHttpLoaderModule.forRoot(),
        // features
        SettingsModule,
        // app
        AppRoutingModule,
        // core & shared
        CoreModule,
        SharedModule,
        // formly
        FormlyMaterialModule,
        FormlyModule.forRoot({
            validationMessages: validationMessage,
            wrappers: [
                { name: 'addons', component: FormlyWrapperAddons },
            ],
            extensions: [
                { name: 'addons', extension: { onPopulate: addonsExtension } },
            ],
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
