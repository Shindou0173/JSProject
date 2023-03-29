import { OrderManagementComponent } from './components/ordermanagement/ordermanagement.component';
//import { AdminComponent } from './components/admin/admin.component';
import { ListingComponent } from './components/listing/listing.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { PasswordComponent } from './components/password/password.component';
import { BookingComponent } from './components/booking/booking.component';
import { AddmonComponent } from './components/addmon/addmon.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { CartComponent } from './components/cart/cart.component';
import { CashComponent } from './components/cash/cash.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {path:'Home', component: HomeComponent},
  {path:'Menu',component:MenuComponent},
  {path: 'About',component:AboutComponent},
  {path: 'Contact',component:ContactComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'Signin', component:SigninComponent},
  {path: 'Password', component:PasswordComponent},
  {path: 'List', component:ListingComponent},
  {path: 'Booking', component:BookingComponent},
  {path: 'Addmon', component:AddmonComponent},
  {path: 'Adminpage', component:AdminpageComponent},
  {path: 'Cart', component:CartComponent},
  {path: 'Cash', component:CashComponent},
  {path: 'OrderManagement', component:OrderManagementComponent},
  {path: 'Table', component:TableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
