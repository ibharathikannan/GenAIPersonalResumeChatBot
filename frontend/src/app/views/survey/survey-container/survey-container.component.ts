import { Component, OnInit, ChangeDetectionStrategy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { surveyValidator } from '@app/shared/directives/survey-validation.directive';
import { Advise, ConsiderBuying, Effective, InformationSourceTypes, ProgramRate, SurveyModel } from '@app/shared/models/survey.model';
import { SurveyService } from '@app/shared/services/survey.service';

import { environment as env } from '@env/environment';
import { SurveyMessageComponent } from './survey-message/survey-message.component';
@Component({
  selector: 'anms-survey-container',
  templateUrl: './survey-container.component.html',
  styleUrls: ['./survey-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SurveyContainerComponent implements OnInit {
  public informationSourceTypes = InformationSourceTypes.sort(
    (a, b) => a.order - b.order
  );

  public programRate = ProgramRate.sort(
    (a, b) => a.id - b.id
  );

  public considerBuying = ConsiderBuying.sort(
    (a, b) => a.order - b.order
  );

  public advises = Advise.sort(
    (a, b) => a.order - b.order
  );

  public effectives = Effective.sort(
    (a, b) => a.id - b.id
  );

  private bookingRefNo: string;
  private bookingId: number;

  surveyForm = this.fb.group({
    informationSource: ['', Validators.required],
    informationSourceComment: [''],
    bookingProcess: ['', Validators.required],
    experience: ['', Validators.required],
    trialDuration: ['', Validators.required],
    customerService: ['', Validators.required],
    introductionTraining: ['', Validators.required],
    deviceRecommend: [],
    advise: this.fb.array([]),
    adviseComment: [''],
    acquainted: ['', Validators.required],
    influenced: ['', Validators.required],
    recommend: [true],
  }, { validator: surveyValidator });

  get informationSource() { return this.surveyForm.get('informationSource'); };
  get informationSourceComment() { return this.surveyForm.get('informationSourceComment'); };

  get bookingProcess() { return this.surveyForm.get('bookingProcess'); };
  get experience() { return this.surveyForm.get('experience'); };
  get trialDuration() { return this.surveyForm.get('trialDuration'); };
  get customerService() { return this.surveyForm.get('customerService'); };
  get introductionTraining() { return this.surveyForm.get('introductionTraining'); };

  @ViewChildren('deviceCheckboxes') deviceCheckboxes: QueryList<ElementRef>;
  get device() { return this.surveyForm.get('device'); };

  @ViewChildren('adviseCheckboxes') adviseCheckboxes: QueryList<ElementRef>;
  get advise() { return this.surveyForm.get('advise'); };
  get adviseComment() { return this.surveyForm.get('adviseComment'); };

  get acquainted() { return this.surveyForm.get('acquainted'); };
  get influenced() { return this.surveyForm.get('influenced'); };

  get recommend() { return this.surveyForm.get('recommend'); };
  get deviceRecommend() { return this.surveyForm.get('deviceRecommend');};

  public error = {
    errors: ['']
  };
  public surveyId: number;
  public shareLink: string;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.shareLink = env.shareLink;

    this.bookingRefNo = this.route.snapshot.paramMap.get('bookingRef');

    this.surveyService.getSurvey(this.bookingRefNo).subscribe(
      (res) => {
        this.bookingId = res.bookingId;
        this.message = '';
      },
      (err) => {
        if (err.error.status == 400) {
          this.message = "You have already completed the survey. We thank you and look forward to serving you again.";
        }
        else {
          this.message = "We are unable to locate your record. Please click on the link in your SMS message and try again.";
        }
      }
    );
  }

  onSubmitSurvey = () => {
    if (!this.surveyForm.invalid) {
      const formValue = this.surveyForm.value;
      const advise = {
        type: formValue.advise,
        comment: formValue.adviseComment
      };

      //if (!formValue.device.includes('20')) {
      //  advise.type = [];
      //  advise.comment = '';
      //}

      const surveyRequest: SurveyModel = {
        bookingId: this.bookingId,
        bookingRefNo: this.bookingRefNo,
        informationSource: {
          type: formValue.informationSource,
          comment: formValue.informationSourceComment
        },
        rates: {
          bookingProcess: formValue.bookingProcess,
          experience: formValue.experience,
          trialDuration: formValue.trialDuration,
          customerService: formValue.customerService,
          introductionTraining: formValue.introductionTraining,
        },
        deviceRecommend: formValue.deviceRecommend,
        advise: advise,
        effective: {
          acquainted: formValue.acquainted,
          influenced: formValue.influenced
        },
        recommend: formValue.recommend
      }

      //console.log(surveyRequest);


      this.surveyService.submitSurvey(surveyRequest).subscribe((res) => {
        this.message = "You have successfully submitted the survey! We thank you and look forward to serving you again.";
      },
        (err) => {
          this.error = err.error;
        });
    }
  }

  onChangeInformationSource = (e) => {
    if (this.surveyForm.controls['informationSource'].value !== '20') {
      this.surveyForm.get('informationSourceComment').setValue('');
    }
  }

  // onChangeAdvise = (e) => {
  //   if (this.surveyForm.controls['advise'].value !== '20') {
  //     this.surveyForm.get('adviseComment').setValue('');
  //   }
  // }

  onConsiderBuyingChange = (e) => {
    const formArray: FormArray = this.surveyForm.get('device') as FormArray;
    const formAdviseArray: FormArray = this.surveyForm.get('advise') as FormArray;

    if (e.target.checked) {
      if (e.target.value === '20') {
        this.deviceCheckboxes.forEach((element) => {
          if (element.nativeElement.value !== '20') {
            element.nativeElement.checked = false;
          }
        });

        formArray.clear();
        formArray.push(new FormControl(e.target.value));
      } else {
        formArray.clear();
        this.deviceCheckboxes.forEach((element) => {
          if (element.nativeElement.value === '20') {
            element.nativeElement.checked = false;
          } else if (element.nativeElement.checked === true) {
            formArray.push(new FormControl(element.nativeElement.value));
          }
        });
      }
    }
    else {
      formArray.removeAt(formArray.value.findIndex(i => i === e.target.value));
    }

    if (!this.surveyForm.get('device').value.includes('20')) {
      formAdviseArray.clear();
      this.surveyForm.get('adviseComment').setValue('');
    }
  }

  onAdviseChange = (e) => {
    const formArray: FormArray = this.surveyForm.get('advise') as FormArray;
    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value));
    } else {
      formArray.removeAt(formArray.value.findIndex(i => i === e.target.value));
    }

    if (!this.surveyForm.get('advise').value.includes('20')) {
      this.surveyForm.get('adviseComment').setValue('');
    }

    // console.log(this.surveyForm.get('advise').value);
    // console.log(this.surveyForm.get('advise').value.includes('20'));
  }

  openDialog = () => {
    this.dialog.open(SurveyMessageComponent);
  }
}
