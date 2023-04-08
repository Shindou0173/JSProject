
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(){

  }
  Register(user:string, pass:string, repass:string){
    const info = {
      username: user,
      password: pass
    }
    console.log(JSON.stringify(info))
    if(pass !== repass){
      alert("Incorrect password retype, try again!");
    }else{
      fetch('http://localhost:3000/auth/RegisterClient',{
        headers: { 'Content-Type':'application/json' },
        method: 'POST',
        body: JSON.stringify(info)
      }).then(res => console.log(res))
    }
    alert('Register Success!')
    location.href = 'http://localhost:4200/Login'
  }
}
