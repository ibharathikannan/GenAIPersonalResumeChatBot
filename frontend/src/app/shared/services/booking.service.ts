import { BaseService } from './base/base.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BookingModel } from '../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService extends BaseService {
    private service: string;

    headers = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient) {
        super();
        this.service = this.api + 'api/BookingService';
    }

    getBooking(bookingRef: string) {
        return this.http.post(`${this.service}/GetBooking?bookingRef=${bookingRef}`, null);
    }

    cancelBooking(bookingModel: BookingModel) {
        return this.http.post(`${this.service}/CancelBooking`, bookingModel);
    }

}