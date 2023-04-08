import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  constructor(){
    fetch('http://localhost:3000/booking/list')
    .then(res => res.json())
    .then(data=>{
      interface Reser{
        _id: string;
        name: string;
        email: string;
        sdt: string;
        date: string;
        time: string;
        note: string;
        status: string;
        username: string;
      }
      console.log('Data:', data);
      const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
      if (tableBody) {
        data.forEach((product:Reser) => {
          const row = tableBody.insertRow();
          row.insertCell().textContent = product._id ? product._id : 'ko thay';
            row.insertCell().textContent = product.name ? product.name : 'ko thay';
            row.insertCell().textContent = product.email ? product.email +' VND' : 'ko thay';
            row.insertCell().textContent = product.sdt ? product.sdt : 'ko thay';
            row.insertCell().textContent = product.time ? product.time : 'ko thay';
            row.insertCell().textContent = product.date ? product.date : 'ko thay';
            row.insertCell().textContent = product.note ? product.note : 'ko thay';
            row.insertCell().textContent = product.status ? product.status : 'ko thay';
            row.insertCell().textContent = product.username ? product.username : 'ko thay';
          //Apply
          const ApplyBtn = document.createElement('button');
          ApplyBtn.textContent = 'Apply';
          ApplyBtn.addEventListener('click', () => {
            fetch('http://localhost:3000/booking/apply/'+product._id)
            .then(res=>{
              alert('Apply OK!');
            })
          });
          row.insertCell().appendChild(ApplyBtn);
          //Delete
          const DeleteBtn = document.createElement('button');
          DeleteBtn.textContent = 'Reject and Delete';
          DeleteBtn.addEventListener('click', () => {
            fetch('http://localhost:3000/booking/delete/'+product._id)
            .then(res=>{
              alert('Delete OK!');
            })
          });
          row.insertCell().appendChild(DeleteBtn);
        });
      }
    })
  }
}
