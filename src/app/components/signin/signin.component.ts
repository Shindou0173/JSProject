import { RegisterService } from './../../services/register.services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private registerService: RegisterService){

  }
  Register(user:string, pass:string, repass:string){
    if(pass !== repass){
      alert("Incorrect password retype, try again!");
    }else{
      const formData:FormData = new FormData();
      formData.append('user', user);
      formData.append('pass', pass);
      this.registerService.RegisterService(formData).subscribe
          (res=>{
              alert("Register OK! You can now use this accout!");
        },err=>{
          alert(err);
        }
      )
    }
  }
}
