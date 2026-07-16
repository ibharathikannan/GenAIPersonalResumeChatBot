import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterContainerComponent } from './register-container/register-container.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffects } from './register.effects';
import { registerReducer } from './register.reducer';
import { Ng2TelInputModule } from '@app/shared/ng2-tel';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MasterContainerComponent } from './master-container/master-container.component';
import { MasterStoreDetailsComponent } from './master-store-details/master-store-details.component';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    // NgxIntlTelInputModule,
    Ng2TelInputModule, 
    StoreModule.forFeature('register', registerReducer),
    EffectsModule.forFeature([RegisterEffects])
  ],
  declarations: [RegisterContainerComponent, MasterContainerComponent, MasterStoreDetailsComponent]
})
export class RegisterModule { }
