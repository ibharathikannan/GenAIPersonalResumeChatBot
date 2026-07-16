import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SurveyModel } from '../models/survey.model';
import { BaseService } from './base/base.service';

@Injectable({
    providedIn: 'root'
})
export class SurveyService extends BaseService {
    private service: string;

    headers = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient) {
        super();
        this.service = this.api + 'api/v1/SurveyService';
    }

    getSurvey(bookingRef: string) {
        return this.http.post<any>(
            `${this.service}/GetSurvey?bookingRef=${bookingRef}`, null
          );
    }

    submitSurvey(survey: SurveyModel) {
        return this.http.post<any>(
            `${this.service}/Submit`, survey
          );
    }
}