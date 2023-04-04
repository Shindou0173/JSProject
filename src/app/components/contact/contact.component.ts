import { ReservationService } from '../../services/reservation.services';
import{Component, OnInit} from '@angular/core';
import { getCookie } from 'typescript-cookie';
@Component({
  selector:'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls:['./contact.component.css']
})

export class ContactComponent{
  constructor(private reservationService: ReservationService) {

  }
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
    this.reservationService.ReservationService(formData).subscribe(
      res=>{
        alert('Đặt bàn thành công, chúng tôi sẽ liên hệ đến bạn để xác nhận trong thời gian ngắn nhất!')
      },err=>{
        alert('Đặt bàn thất bại, xin hãy kiểm tra thông tin!');
      }
    )
  }
}
