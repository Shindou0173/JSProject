import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  RegisterService(fromData: FormData):Observable<any>{
    return this.http.post<any>('http://localhost:80/PHPapi/Login/RegisterClient.php',fromData);
  }
}
