import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouContainerComponent } from './thankyou-container.component';

describe('ThankyouContainerComponent', () => {
  let component: ThankyouContainerComponent;
  let fixture: ComponentFixture<ThankyouContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankyouContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
