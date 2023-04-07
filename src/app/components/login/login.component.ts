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
  Login(user: string, pass: string) {
    const myObject = {
      username: user,
      password: pass
    };

    fetch('http://localhost:3000/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(myObject)
    })
      .then(res => res.json())
      .then(data => {
        if (data == "1") {
          alert("Login OK! Admin role detected!");
          setCookie("permission", "1");
          location.href = 'http://localhost:4200/Adminpage'
        } else if (data == "2") {
          setCookie("permission", "2");
          alert("Login successful!");
          location.href = 'http://localhost:4200/Home'
        } else {
          alert("Login failed")
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred. Please try again later.")
      });
  }
}
