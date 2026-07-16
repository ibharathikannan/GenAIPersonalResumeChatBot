import { createAppState } from "@app/core";
import { selectSettings, selectSettingsStickyHeader, selectSettingsLanguage, selectTheme, selectAutoNightMode, selectNightTheme, selectHour, selectIsNightHour, selectEffectiveTheme } from '.';

describe('Settings Selectors', () => {
    let state = createAppState();

    it('selectSettings', () => {
        expect(selectSettings(state)).toBe(state.settings);
    });

    it('selectSettingsStickyHeader', () => {
        expect(selectSettingsStickyHeader(state)).toBe(state.settings.stickyHeader);
    });

    it('selectSettingsLanguage', () => {
        expect(selectSettingsLanguage(state)).toBe(state.settings.language);
    });

    it('selectTheme', () => {
        expect(selectTheme(state)).toBe(state.settings.theme);
    });

    it('selectAutoNightMode', () => {
        expect(selectAutoNightMode(state)).toBe(state.settings.autoNightMode);
    });

    it('selectNightTheme', () => {
        expect(selectNightTheme(state)).toBe(state.settings.nightTheme);
    });

    it('selectHour', () => {
        expect(selectHour(state)).toBe(state.settings.hour);
    });

    it('selectIsNightHour', () => {
        expect(selectIsNightHour(state)).toBe(false);
    });
    
    it('selectEffectiveTheme', () => {
        expect(selectEffectiveTheme(state)).toBe('default-theme');
    });
    
});
