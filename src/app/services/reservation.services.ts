import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  ReservationService(fromData: FormData):Observable<any>{
    return this.http.post<any>('http://localhost:80/PHPapi/Reservation/CreateReservation.php',fromData);
  }
}
