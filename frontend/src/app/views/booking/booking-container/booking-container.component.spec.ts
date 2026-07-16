import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContainerComponent } from './booking-container.component';

describe('BookingContainerComponent', () => {
  let component: BookingContainerComponent;
  let fixture: ComponentFixture<BookingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
