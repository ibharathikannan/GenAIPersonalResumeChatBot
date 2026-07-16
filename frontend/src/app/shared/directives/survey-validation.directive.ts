import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const surveyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const result = {
        sourceCommentInvalid: false,
        adviseInvalid: false,
        adviseCommentInvalid: false,
    };
    const informationSource =  control.get('informationSource');
    const sourceComment = control.get('informationSourceComment');
    if (informationSource) {
        const informationSourceValue = informationSource.value;
        if (informationSourceValue === '20') {
            const sourceCommentValue = sourceComment.value;
            if (!sourceCommentValue) {
                result.sourceCommentInvalid = true;
            }
        }
    }
    
    const device = control.get('device');
    const advise = control.get('advise');
    if (device && advise) {
        const deviceValue = device.value;
        const adviseValue = advise.value;
        if (deviceValue.length && deviceValue[0] === '20' && !adviseValue.length) {
            result.adviseInvalid = true;
        }
    }

    const adviseComment = control.get('adviseComment');
    if (advise) {
        const adviseValue = advise.value;
        if (adviseValue.length && adviseValue.includes('20')) {
            const adviseCommentValue = adviseComment.value;
            if (!adviseCommentValue) {
                result.adviseCommentInvalid = true;
            }
        }
    }

    return result.sourceCommentInvalid 
        || result.adviseCommentInvalid 
        || result.adviseInvalid
        ? result : null;
};

@Directive({
  selector: '[appSurveyValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SurveyValidatorDirective, multi: true }]
})
export class SurveyValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return surveyValidator(control);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/