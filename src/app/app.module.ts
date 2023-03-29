import { OrderManagementComponent } from './components/ordermanagement/ordermanagement.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { PasswordComponent } from './components/password/password.component';
import { ListingComponent } from './components/listing/listing.component';
import { BookingComponent } from './components/booking/booking.component';
import { AddmonComponent } from './components/addmon/addmon.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { CartComponent } from './components/cart/cart.component';
import { CashComponent } from './components/cash/cash.component';
import { OrderComponent } from './components/order/order.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SigninComponent,
    PasswordComponent,
    ListingComponent,
    BookingComponent,
    AddmonComponent,
    AdminpageComponent,
    CartComponent,
    CashComponent,
    OrderComponent,
    OrderManagementComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
