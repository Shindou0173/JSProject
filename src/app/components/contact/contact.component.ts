
import{Component, OnInit} from '@angular/core';
import { getCookie } from 'typescript-cookie';
@Component({
  selector:'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls:['./contact.component.css']
})

export class ContactComponent{
  constructor() {

  }
  Reservated(name:string, email:string, phone:string, date:string, time:string, note:string){
    const formData:FormData =new FormData();
    let user:string = getCookie('user')!;
    const booking ={
      name: name,
      email: email,
      sdt: phone,
      time: time,
      date: date,
      note: note,
      username: user
    }
    fetch('http://localhost:3000/booking/add',{
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify(booking)
    })
    alert('Booking table OK! Returning to Homepage!');
    location.href= 'http://localhost:4200/Home'
  }
}
