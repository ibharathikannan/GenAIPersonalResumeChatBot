import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStoreDetailsComponent } from './master-store-details.component';

describe('MasterStoreDetailsComponent', () => {
  let component: MasterStoreDetailsComponent;
  let fixture: ComponentFixture<MasterStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterStoreDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
