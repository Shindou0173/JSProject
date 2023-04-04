import { response } from 'express';
import { LoginService } from '../../services/login.services';
import { Component } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService){

  }
  Login(user:string, pass:string){
    const formData:FormData= new FormData();
    formData.append('user',user);
    formData.append('pass',pass);
    this.loginService.LoginService(formData).subscribe
      (res=>{
          if(res === "2"){
            setCookie('permission', res, { expires: 7 })
            window.location.href = "http://localhost:4200/Home";
            alert("Đăng nhập thành công!");
          }else{
            if(res === "1"){
              setCookie('permission', res, { expires: 7 })
              window.location.href = "http://localhost:4200/Adminpage";
              alert("Đăng nhập thành công, tài khoản cấp quản trị!");
            }else{
              alert("Login failed");
            }
          }
      },err=>{
        alert(err)
      }
    )
  }
}
