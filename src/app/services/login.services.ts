import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  LoginService(fromData: FormData):Observable<any>{
    return this.http.post<any>('http://localhost:80/PHPapi/Login/Signin.php',fromData);
  }
}
