import { Component, VERSION } from '@angular/core';
import { AddmonService } from '../../services/addmon.services';
@Component({
  selector: 'app-addmon',
  templateUrl: './addmon.component.html',
  styleUrls: ['./addmon.component.css']
})
export class AddmonComponent {
  constructor(){

  }
  Addmon(ProductName:string, Price:string, ProductDesc:string, Img:string){
    const formData:FormData = new FormData()
    formData.append('ProductName',ProductName);
    formData.append('Price',Price);
    formData.append('ProductDesc',ProductDesc);
    formData.append('Img',Img);
    fetch('http://localhost:80/PHPapi/Product/AddProduct.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      alert('Add ok!')
      console.log(data);
      location.href = 'http://localhost:4200/Menu'
    })
  }
}
