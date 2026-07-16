import { FormlyFieldConfig } from "@ngx-formly/core";

export function requiredValidatorMessage(err, field: FormlyFieldConfig) {
  return 'This field is required.';
}

export function minlengthValidationMessage(err, field) {
  return `Should have at least ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}

export function emailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid email address`;
}

export function nameValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid name`;
}

export function passwordValidatorMessage(err, field: FormlyFieldConfig) {
  return `Passwords must have at least one digit, one lowercase('a' - 'z'), one uppercase('A' - 'Z') and one special character.`;
}

export function roleNameValidatorMessage(err, field: FormlyFieldConfig) {
  return `This role name has been used.`;
}

export function LinkValidatorMessage(err, field: FormlyFieldConfig) {
  return `Invalid link.`;
}

export function alphaNumericValidatorMessage(err, field: FormlyFieldConfig) {
  return `Only alphabets and numbers are allowed.`;
}

export function alphaNumericSpaceValidatorMessage(err, field: FormlyFieldConfig) {
  return `Only alphabets, numbers and space are allowed.`;
}

export function numericValidatorMessage(err, field: FormlyFieldConfig) {
  return `Only numbers are allowed.`;
}

export const validationMessage = [
  { name: "required", message: requiredValidatorMessage },
  { name: "minlength", message: minlengthValidationMessage },
  { name: "maxlength", message: maxlengthValidationMessage },
  { name: "min", message: minValidationMessage },
  { name: "max", message: maxValidationMessage },
  { name: "email", message: emailValidatorMessage },
  { name: "name", message: nameValidatorMessage },
  { name: "password", message: passwordValidatorMessage },
  { name: "rolename", message: roleNameValidatorMessage },
  { name: "link", message: LinkValidatorMessage },
  { name: "alphaNumeric", message: alphaNumericValidatorMessage },
  { name: "alphaNumericSpace", message: alphaNumericSpaceValidatorMessage },
  { name: "numeric", message: numericValidatorMessage },
];
