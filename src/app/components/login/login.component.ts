import { response } from 'express';
import { Component } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(){

  }
  Login(user:string, pass:string){
    const formData:FormData= new FormData();
    formData.append('user',user);
    formData.append('pass',pass);
    fetch('http://localhost:80/PHPapi/Login/Signin.php',{
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data=> {
      if(data === "2"){
        setCookie('permission', data, { expires: 7 })
        window.location.href = "http://localhost:4200/Home";
        alert("Đăng nhập thành công!");
      }else{
        if(data === "1"){
          setCookie('permission', data, { expires: 7 })
          window.location.href = "http://localhost:4200/Adminpage";
          alert("Đăng nhập thành công, tài khoản cấp quản trị!");
        }else{
          alert("Login failed");
        }
      }
    })
  }
}
