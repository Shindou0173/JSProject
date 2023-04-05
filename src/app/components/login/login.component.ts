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
    interface MyJsonObject {
      username: string;
      password: string;
    }

    const myObject: MyJsonObject = {
      username: "quy@123",
      password: "1"
    };

    const jsonString = JSON.stringify(myObject);

    fetch('http://localhost:3000/login',{
      method: 'POST',
      body: jsonString
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
