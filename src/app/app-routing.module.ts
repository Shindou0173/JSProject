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
import { AddmonComponent } from './components/addmon/addmon.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { HttpClientModule } from '@angular/common/http';
import { StatisticComponent } from './components/statistic/statistic.component';
import { OrderComponent } from './components/order/order.component';
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
  {path: 'Addmon', component:AddmonComponent},
  {path: 'Adminpage', component:AdminpageComponent},
  {path: 'Statistic', component:StatisticComponent},
  {path: 'Table', component:TableComponent},
  {path: 'Order', component:OrderComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
