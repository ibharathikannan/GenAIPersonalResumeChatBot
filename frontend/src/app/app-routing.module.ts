import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core';

export function routeModule(path: string, loadChildren: string): object {
  return { path, loadChildren, canActivate: [AuthGuardService] };
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('app/views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'register',
    loadChildren:() => import('app/views/register/register.module').then(m=>m.RegisterModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('app/views/booking/booking.module').then(m=>m.BookingModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('app/views/survey/survey.module').then(m=>m.SurveyModule)
  },
  {
    path: 'bookingdetail',
    loadChildren:() => import('app/views/booking-detail/booking-detail.module').then(m=>m.BookingDetailModule)
  },  
  {
    path: 'summary',
    loadChildren: () => import('app/views/summary/summary.module').then(m=>m.SummaryModule)
  },
  {
    path: 'thankyou',
    loadChildren:() => import('app/views/thankyou/thankyou.module').then(m=>m.ThankyouModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
