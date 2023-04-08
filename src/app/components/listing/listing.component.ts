import{Component, OnInit} from '@angular/core';

@Component({
  selector:'app-listing',
  templateUrl:'./listing.component.html',
  styleUrls:['./listing.component.css']
})

export class ListingComponent{
  constructor() {
    const queryParams = new URLSearchParams(window.location.search.substring(1));
    const table = queryParams.get("TableNo");
    fetch('http://localhost:3000/cart/get/'+table)
    .then(response => response.json())
    .then(data => {
      interface Cart {
        _id: string;
        table: string;
        product_id: string;
        quantity: string;
        price: string;
        time:string;
      }
      const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
        if (tableBody) {
          data.forEach((cart:Cart) => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = cart._id ? cart._id : 'ko thay';
            row.insertCell().textContent = cart.table ? cart.table : 'ko thay';
            row.insertCell().textContent = cart.product_id ? cart.product_id : 'ko thay';
            row.insertCell().textContent = cart.quantity ? cart.quantity : 'ko thay';
            row.insertCell().textContent = cart.price ? cart.price +' VND' : 'ko thay';
            row.insertCell().textContent = cart.time ? cart.time : 'ko thay';
            row.contentEditable = 'false';
            row.cells[3].contentEditable='true';

            //Fetch product details
            fetch(`http://localhost:3000/product/get/`+cart.product_id)
            .then(res => res.json())
            .then(product => {
              row.cells[2].textContent = product.name;
            });

            //Edit button
            const ApplyBtn = document.createElement('button');
            ApplyBtn.textContent = 'Edit';
            ApplyBtn.addEventListener('click', () => {
              var dg = parseInt(cart.price!) / parseInt(cart.quantity);
              var pri = dg * parseInt(row.cells[3].textContent!);
              const don = {
                table: cart.table,
                product_id: cart.product_id,
                quantity: row.cells[3].textContent,
                price: pri
              };
              fetch('http://localhost:3000/cart/edit/'+cart._id, {
                headers: {'Content-Type' : 'application/json'},
                method: 'PUT',
                body: JSON.stringify(don)
              })
              .then(res => res.json())
              .then(data => {
                alert("Edit OK!")
                location.reload();
              })
            });
            row.insertCell().appendChild(ApplyBtn);

            //Delete button
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Delete';
            cancelBtn.addEventListener('click', () => {
              fetch('http://localhost:3000/cart/delete/'+cart._id,{
                method:'DELETE'
              })
              .then(res=>{
                alert("Delete OK!");
                location.reload();
              })
            });
            row.insertCell().appendChild(cancelBtn);
          });
        }
    })
  }
  Order(){
    const queryParams = new URLSearchParams(window.location.search.substring(1));
    const table = queryParams.get("TableNo");
    location.href='http://localhost:4200/Menu?TableNo='+table;
  }
  GetBill() {
    const queryParams = new URLSearchParams(window.location.search.substring(1));
    const table = queryParams.get("TableNo");
    const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
    if (tableBody) {
      const rows = tableBody.rows;
      const formData: FormData = new FormData();
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const name ={
          name : row.cells[2].textContent
        }
        fetch('http://localhost:3000/product/name', {
          headers : {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(name)
        })
        .then(res => res.json())
        .then(data => {
          const bill = {
            product_id: data._id,
            quantity: row.cells[3].textContent,
            price: row.cells[4].textContent,
            cart_id: row.cells[0].textContent
          };
          console.log(JSON.stringify(bill))
          fetch('http://localhost:3000/bill/add', {
            headers : {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(bill)
          })
          fetch('http://localhost:3000/cart/delete/'+row.cells[0].textContent, {
            method: 'DELETE'
          })
        })
      }
      alert("Thanh toán thành công, trở về trang order bàn!");
      location.href = 'http://localhost:4200/Table';
    }
  }
}
