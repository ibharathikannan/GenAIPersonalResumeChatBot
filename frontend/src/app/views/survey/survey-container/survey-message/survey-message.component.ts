import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anms-survey-message',
  templateUrl: './survey-message.component.html',
  styleUrls: ['./survey-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyMessageComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SurveyMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly notificationService: NotificationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
