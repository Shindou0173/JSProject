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
    fetch('http://localhost:80/PHPapi/Cart/GetCart.php?TableNo='+table)
    .then(response => response.json())
    .then(data => {
      interface Cart {
        TableNo: string;
        ProductName: string;
        Quantity: string;
        Price: string;
        Time:string;
      }
      const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
        if (tableBody) {
          data.forEach((cart:Cart) => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = cart.TableNo ? cart.TableNo : 'ko thay';
            row.insertCell().textContent = cart.ProductName ? cart.ProductName : 'ko thay';
            row.insertCell().textContent = cart.Quantity ? cart.Quantity : 'ko thay';
            row.insertCell().textContent = cart.Price ? cart.Price +' VND' : 'ko thay';
            row.insertCell().textContent = cart.Time ? cart.Time : 'ko thay';
            row.contentEditable = 'true';
            row.cells[0].contentEditable='false';
            row.cells[1].contentEditable='false';
            row.cells[3].contentEditable='false';
            row.cells[4].contentEditable='false';
            //Edit button
            const ApplyBtn = document.createElement('button');
            ApplyBtn.textContent = 'Edit';
            ApplyBtn.addEventListener('click', () => {
              const formData:FormData = new FormData();
              formData.append('TableNo',cart.TableNo);
              formData.append('ProductName',row.cells[1].textContent!);
              formData.append('Quantity',row.cells[2].textContent!);
              var dg = parseInt(row.cells[3].textContent!) / parseInt(cart.Quantity);
              var pri = dg * parseInt(row.cells[2].textContent!);
              formData.append('Price',pri.toString());
              fetch('http://localhost:80/PHPapi/Cart/EditCart.php', {
                method: 'POST',
                body: formData
              })
              .then(res => res.json())
              .then(data => {
                alert(data)
                location.reload();
              })
            });
            row.insertCell().appendChild(ApplyBtn);
            //Delete button
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Delete';
            cancelBtn.addEventListener('click', () => {
              fetch('http://localhost:80/PHPapi/Cart/DeleteCart.php?TableNo='+cart.TableNo+'&ProductName='+cart.ProductName)
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
    var billNumber = 0;
    fetch('http://localhost:80/PHPapi/Bill/GetAllBill.php')
    .then(res => res.json())
    .then(data => {
      billNumber = data.length;
    })
    if (tableBody) {
      const rows = tableBody.rows;
      const formData: FormData = new FormData();
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        formData.append('BillNumber', billNumber.toString());
        formData.append('ProductName', row.cells[1].textContent!);
        formData.append('Quantity', row.cells[2].textContent!);
        formData.append('Price', row.cells[3].textContent!);
        fetch('http://localhost:80/PHPapi/Bill/CreateBill.php', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          fetch('http://localhost:80/PHPapi/Cart/DeleteCart.php?TableNo='+table+'&ProductName='+row.cells[1].textContent!+'')
          .then(res => res.json())
          .then(data =>{
          })
        })
      }
      alert("Thanh toán thành công, trở về trang order bàn!");
      location.href = 'http://localhost:4200/Table';
    }
  }
}
