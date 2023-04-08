import { Component } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  constructor(){}
  onClick(from:string, to:string){
        fetch('http://localhost:3000/bill/list')
        .then(response => response.json())
        .then(data => {
          interface Bill {
            _id: string;
            product_id: string;
            quantity: string
            price: string;
            date: string;
            cart_id: string;
          }
          const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
            if (tableBody) {
              data.forEach((bill:Bill) => {
                if(new Date(bill.date) >= new Date(from) && new Date(bill.date) <= new Date(to))
                {
                  const row = tableBody.insertRow();
                  row.insertCell().textContent = bill._id ? bill._id : 'ko thay';
                  row.insertCell().textContent = bill.product_id ? bill.product_id : 'ko thay';
                  row.insertCell().textContent = bill.quantity ? bill.quantity : 'ko thay';
                  row.insertCell().textContent = bill.price ? bill.price +' VND' : 'ko thay';
                  row.insertCell().textContent = bill.date ? bill.date : 'ko thay';
                  row.insertCell().textContent = bill.cart_id ? bill.cart_id : 'ko thay';
                  //Fetch product details
                  fetch(`http://localhost:3000/product/get/`+bill.product_id)
                  .then(res => res.json())
                  .then(product => {
                    row.cells[1].textContent = product.name;
                  });
                }

              });
            }
        })
  }
}
