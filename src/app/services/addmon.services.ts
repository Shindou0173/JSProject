import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddmonService {

  constructor(private http:HttpClient) { }

  AddService(fromData: FormData):Observable<any>{
    return this.http.post<any>('http://localhost:80/PHPapi/Product/AddProduct.php',fromData)
  }
}