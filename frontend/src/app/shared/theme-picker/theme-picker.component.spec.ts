import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemePickerComponent } from './theme-picker.component';
import { MockStore, TestingModule } from '@testing/utils';
import { Store } from '@ngrx/store';
import { ActionSettingsChangeTheme } from '@app/settings/settings.actions';

describe('ThemePickerComponent', () => {
  let component: ThemePickerComponent;
  let fixture: ComponentFixture<ThemePickerComponent>;
  let store: MockStore<any>;
  let dispatchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    store.setState({
      settings: {
        theme: 'DEFAULT-THEME',
        autoNightMode: true,
        stickyHeader: true,
        pageAnimations: true,
        pageAnimationsDisabled: false,
        elementsAnimations: true,
        language: 'en'
      }
    });
    fixture = TestBed.createComponent(ThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ActionSettingsChangeTheme on change theme', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    
    component.installTheme('NATURE-THEME');
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ActionSettingsChangeTheme({ theme: 'NATURE-THEME' })
    );
  });
  
});
