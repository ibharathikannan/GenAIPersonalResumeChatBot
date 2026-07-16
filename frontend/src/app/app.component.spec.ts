import { TestBed, async } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';

import { AppComponent } from './app.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule, NgHttpLoaderModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
