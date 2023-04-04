import { Component } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  constructor(){}
  onClick(from:string, to:string){
        fetch('http://localhost:80/PHPapi/Statistic/Statistic.php?from='+from+'&to='+to+'')
        .then(response => response.json())
        .then(data => {
          interface Bill {
            BillNumber: string;
            ProductName: string;
            Quantity: string;
            Price: string;
            Date: string;
          }
          console.log('Data:', data);
          const tableBody = document.querySelector('#myTable tbody') as HTMLTableElement;
            if (tableBody) {
              data.forEach((bill:Bill) => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = bill.BillNumber ? bill.BillNumber : '';
                row.insertCell().textContent = bill.ProductName ? bill.ProductName : '';
                row.insertCell().textContent = bill.Quantity ? bill.Quantity : '';
                row.insertCell().textContent = bill.Price ? bill.Price +' VND' : '';
                row.insertCell().textContent = bill.Date ? bill.Date : '';
                //Edit button
                row.cells[2].contentEditable = 'true';
                const ApplyBtn = document.createElement('button');
                ApplyBtn.textContent = 'Edit';
                ApplyBtn.addEventListener('click', () => {
                  const formData:FormData = new FormData();
                  formData.append('BillNumber',bill.BillNumber);
                  formData.append('ProductName',row.cells[1].textContent!);
                  formData.append('Quantity',row.cells[2].textContent!);
                  var dg = parseInt(row.cells[3].textContent!)
                  var pri = dg * parseInt(row.cells[2].textContent!);
                  formData.append('Price',pri.toString());
                  fetch('http://localhost:80/PHPapi/Bill/EditBill.php', {
                    method: 'POST',
                    body: formData
                  })
                  .then(res => res.json())
                  .then(data => {
                    console.log(formData.get('ProductDesc'));
                    alert(data)
                    location.reload();
                  })
                });
                row.insertCell().appendChild(ApplyBtn);
                //Delete button
                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Delete';
                cancelBtn.addEventListener('click', () => {
                  fetch('http://localhost:80/PHPapi/Bill/DeleteBill.php?BillNumber='+row.cells[0].textContent+'')
                  .then(res=>{
                    alert('Delete OK!');
                    location.reload();
                  })
                });
                row.insertCell().appendChild(cancelBtn);
              });
            }
        })
  }
}
