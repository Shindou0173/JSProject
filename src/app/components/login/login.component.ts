import { json, response } from 'express';
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
  Login(user:string , pass:string ) {
    const myObject = {
      username: user,
      password: pass
    };

    console.log(JSON.stringify(myObject));

    fetch('http://localhost:3000/auth/login', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(myObject)
    })
    .then(res => res.json)
    .then(data => {
      if(data.toString() == "1"){
        alert("Login OK! Admin role detected!");
      }else{
        if(data.toString() == "2"){
          alert("Login successful!");
        }else{
          alert(data)
        }
      }
    })
  }
}
