import{Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { getCookie, setCookie } from 'typescript-cookie';

@Component({
  selector:'app-menu',
  templateUrl:'./menu.component.html',
  styleUrls:['./menu.component.css']
})


export class MenuComponent{
  constructor() {
    const queryParams = new URLSearchParams(window.location.search.substring(1));
    const table = queryParams.get("TableNo");
    fetch('http://localhost:3000/product/list')
    .then(response => response.json())
    .then(data => {
      interface Product {
        _id: string;
        name: string;
        price: string;
        desc: string;
      }
      const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
        if (tableBody) {
          data[0].forEach((product:Product) => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = product._id ? product._id : 'ko thay';
            row.insertCell().textContent = product.name ? product.name : 'ko thay';
            row.insertCell().textContent = product.price ? product.price +' VND' : 'ko thay';
            row.insertCell().textContent = product.desc ? product.desc : 'ko thay';
            row.insertCell().textContent = "";
            if(getCookie('permission') == "1"){
              if(table == null){
                row.contentEditable = 'true';
                row.cells[0].contentEditable='false';
                //Edit button
                const ApplyBtn = document.createElement('button');
                ApplyBtn.textContent = 'Edit';
                ApplyBtn.addEventListener('click', () => {
                  const mon = {
                    name: row.cells[1].textContent,
                    price: row.cells[2].textContent,
                    desc: row.cells[3].textContent
                  };
                  fetch('http://localhost:3000/product/edit/'+product._id+'', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PUT',
                    body: JSON.stringify(mon)
                  })
                  .then(res => {
                    alert('Edit OK!');
                    location.reload();
                  })
                });
                row.insertCell().appendChild(ApplyBtn);
                //Delete button
                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Delete';
                cancelBtn.addEventListener('click', () => {
                  const mon = {
                    name: row.cells[1].textContent,
                    price: row.cells[2].textContent,
                    desc: row.cells[3].textContent
                  };
                  fetch('http://localhost:3000/product/delete/'+product._id+'', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'DELETE',
                    body: JSON.stringify(mon)
                  })
                  .then(res=>{
                    alert('Delete OK!');
                    location.reload();
                  })
                });
                row.insertCell().appendChild(cancelBtn);
              }else{
                //Quantity
                row.contentEditable = 'false';
                row.insertCell().textContent = "";
                row.cells[4].contentEditable = 'true';
                //Order button
                const orderBtn = document.createElement('button');
                orderBtn.textContent = 'Order';
                orderBtn.addEventListener('click', () => {
                  var pri = parseInt(row.cells[2].textContent!)*parseInt(row.cells[4].textContent!);
                  const Newcart = {
                    product_id: row.cells[0].textContent,
                    price: pri.toString(),
                    table: table,
                    quantity: row.cells[4].textContent
                  };

                  fetch('http://localhost:3000/cart/add', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify(Newcart)
                  })
                  .then(res => res.json())
                  .then(data => {
                    console.log(data)
                    alert('sd')
                    location.reload();
                  })
                });
                row.insertCell().appendChild(orderBtn);
              }

            }
          });
        }
    })

  }
  onClick(){
    if(getCookie('permission') == "1"){
      location.href = 'http://localhost:4200/Addmon'
    }else{
      alert('Chỉ có admin mới có thể thêm món ăn vào thực đơn')
    }
  }
  Back(){
    const queryParams = new URLSearchParams(window.location.search.substring(1));
    const table = queryParams.get("TableNo");
    if(table!=null){
      location.href='http://localhost:4200/List?TableNo='+table;
    }else{
      alert('false');
    }
  }
}
