import{Component, OnInit} from '@angular/core';
import { getCookie } from 'typescript-cookie';
@Component({
  selector:'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls:['./contact.component.css']
})

export class ContactComponent{
  constructor() {}
  Reservated(name:string, email:string, phone:string, date:string, time:string, note:string){
    const formData:FormData =new FormData();
    let user:string = getCookie('user')!;
    formData.append('name',name);
    formData.append('email',email);
    formData.append('phone',phone);
    formData.append('date',date);
    formData.append('time',time);
    formData.append('note',note);
    formData.append('byUser',user);
    fetch('http://localhost:80/PHPapi/Reservation/CreateReservation.php',{
      method: 'POST',
      body:formData
    })
    .then(res => res.json())
    .then(data=>{
        alert(data)
    })
  }
}
