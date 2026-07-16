import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function ContactNumberValidator(regionCode: string=undefined): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let validNumber = false;
    try {
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(control.value, regionCode);
        validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (error) {
        
    }
    return validNumber? null : {'invalidNumber': {value: control.value}};
  };
}