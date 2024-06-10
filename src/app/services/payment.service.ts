import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  processPayment(paymentData: any): Observable<any> {
    return this.http.post<any>('API_ENDPOINT', paymentData);
  }
}