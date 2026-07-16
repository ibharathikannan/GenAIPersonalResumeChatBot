import { Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  ViewEncapsulation 
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '@app/settings/settings.reducer';
import { selectTheme } from '@app/settings/settings.selectors';
import { ActionSettingsChangeTheme } from '@app/settings/settings.actions';

export interface DocsSiteTheme {
  name: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}

@Component({
  selector: 'eus-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent implements OnInit {
  currentTheme$: Observable<string>;
  currentTheme: string;

  themes: DocsSiteTheme[] = [
    {
      primary: '#2196F3',
      accent: '#78909C',
      name: 'DEFAULT-THEME',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E0E0E0',
      accent: '#3949AB',
      name: 'LIGHT-THEME',
      isDark: false,
    },
    {
      primary: '#795548',
      accent: '#BA68C8',
      name: 'NATURE-THEME',
      isDark: false,
    },
    {
      primary: '#616161',
      accent: '#0097A7',
      name: 'BLACK-THEME',
      isDark: true,
    },
  ];

  constructor(private store: Store<State>) { }

  ngOnInit() {    
    this.currentTheme$ = this.store.pipe(select(selectTheme));
    this.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  installTheme(theme){
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
  }

}
