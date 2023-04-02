import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(){}
  Register(user:string, pass:string, repass:string){
    if(pass !== repass){
      alert("Incorrect password retype, try again!");
    }else{
      const formData:FormData = new FormData();
      formData.append('user', user);
      formData.append('pass', pass);
      fetch('http://localhost:80/PHPapi/Login/RegisterClient.php',{
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data=> {
        alert(data);
      })
  }
}
}

