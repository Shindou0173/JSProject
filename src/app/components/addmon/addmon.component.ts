import { Component, VERSION } from '@angular/core';
import { AddmonService } from '../../services/addmon.services';
@Component({
  selector: 'app-addmon',
  templateUrl: './addmon.component.html',
  styleUrls: ['./addmon.component.css']
})
export class AddmonComponent {
  constructor(){}
  Addmon(ProductName:string, Price:string, ProductDesc:string){
    const mon = {
      name: ProductName,
      price: Price,
      desc: ProductDesc
    };

    fetch('http://localhost:3000/product/add', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(mon)
    })
    .then(res => res.json())
    .then(data => {
      alert('Add ok!')
      console.log(data);
      location.href = 'http://localhost:4200/Menu'
    })
  }
}
