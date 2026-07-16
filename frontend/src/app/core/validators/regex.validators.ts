import { ValidationErrors, FormControl } from "@angular/forms";

export function CustomEmailValidator(control: FormControl): ValidationErrors {
   return !control.value || 
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(control.value) ? null : { "email": true };
}

export function CustomNameValidator(control: FormControl): ValidationErrors {
  return !control.value ||
        /^[a-zA-Z0-9 ]*$/
        .test(control.value) ? null : { "name": true };
}

export function CustomNameTrimValidator(control: FormControl): ValidationErrors {
  const isWhitespace = (control.value || '').trim().length < 2;
  const isValid = !isWhitespace;
  return isValid ? null : { 'name': true };
}

export function CustomNumberValidator(control: FormControl): ValidationErrors {
  return !control.value ||
        /^[0-9]*$/
        .test(control.value) ? null : { "numeric": true };
}

export function CustomPasswordValidator(control: FormControl): ValidationErrors {
  return !control.value ||
      /(?=.*?[0-9])(?=.*?[A-Z]).+(?=.*?[a-z]).+(?=.*?[!@#$%^&+=]).+/
      .test(control.value) ? null : { "password": true };
}///^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)(?=.*[!@#$%^&*+=])[A-Za-z\\d!$%@#£€*?&]{4,}$/

export function CustomMenuLinkValidator(control: FormControl): ValidationErrors{
  return !control.value || /^\/+[A-z0-9]*$/.test(control.value) ? null : { "link": true };
}

export function CustomAlphaNumericValidator(control: FormControl): ValidationErrors{
  return !control.value ||
          /^[a-zA-Z0-9]*$/
          .test(control.value) ? null : { "alphaNumeric": true };
}

export function CustomAlphaNumericSpaceValidator(control: FormControl): ValidationErrors {
  return !control.value ||
        /^[a-zA-Z0-9 ]*$/
        .test(control.value) ? null : { "alphaNumericSpace": true };
}
