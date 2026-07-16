import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailContainerComponent } from './booking-detail-container.component';

describe('BookingDetailContainerComponent', () => {
  let component: BookingDetailContainerComponent;
  let fixture: ComponentFixture<BookingDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
