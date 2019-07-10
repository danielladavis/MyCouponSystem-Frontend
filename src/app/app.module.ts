// General imports and Providers
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AngularDraggableModule } from 'angular2-draggable';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { DatePipe } from '@angular/common';

// NgModule - Components
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { LogComponent } from './components/log/log.component';
import { LoginComponent } from './components/log/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/log/register/register.component';
import { CustomerNavbarComponent } from './components/navbars/customer-navbar/customer-navbar.component';
import { CompanyNavbarComponent } from './components/navbars/company-navbar/company-navbar.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { CreateCouponComponent, getDatepickerConfig } from './components/coupon/create-coupon/create-coupon.component';
import { CompanyByIDComponent } from './components/company/company-by-id/company-by-id.component';
import { CompanyByNameComponent } from './components/company/company-by-name/company-by-name.component';
import { AllCompaniesComponent } from './components/company/all-companies/all-companies.component';
import { UserByIdComponent } from './components/user/user-by-id/user-by-id.component';
import { ImageUploderComponent } from './components/utils/image-uploder/image-uploder.component';
import { CouponByIDComponent } from './components/coupon/coupon-by-id/coupon-by-id.component';
import { CouponByTitleComponent } from './components/coupon/coupon-by-title/coupon-by-title.component';
import { AllCouponsComponent } from './components/coupon/all-coupons/all-coupons.component';
import { AllCompanyCouponsComponent } from './components/coupon/all-company-coupons/all-company-coupons.component';
import { CompanyCouponsByCategoryComponent } from './components/coupon/company-coupons-by-category/company-coupons-by-category.component';
import { CompanyCouponsByPriceComponent } from './components/coupon/company-coupons-by-price/company-coupons-by-price.component';
import { CompanyCouponsByDateComponent } from './components/coupon/company-coupons-by-date/company-coupons-by-date.component';
import { CouponsByCategoryComponent } from './components/coupon/coupons-by-category/coupons-by-category.component';
import { CouponsByPriceComponent } from './components/coupon/coupons-by-price/coupons-by-price.component';
import { CouponsByDateComponent } from './components/coupon/coupons-by-date/coupons-by-date.component';
import { CustomerByIDComponent } from './components/cusromer/customer-by-id/customer-by-id.component';
import { CreateCustomerComponent } from './components/cusromer/create-customer/create-customer.component';
import { CustomerByNameComponent } from './components/cusromer/customer-by-name/customer-by-name.component';
import { AllCustomersComponent } from './components/cusromer/all-customers/all-customers.component';
import { PurchaseModalComponent } from './components/purchase/purchase-modal/purchase-modal.component';
import { CompanyCustomerByNameComponent } from './components/cusromer/company-customer-by-name/company-customer-by-name.component';
import { CompanyCustomersComponent } from './components/cusromer/company-customers/company-customers.component';
import { PurchaseByIDComponent } from './components/purchase/purchase-by-id/purchase-by-id.component';
import { CouponModalComponent } from './components/coupon/coupon-modal/coupon-modal.component';
import { IncomeByIDComponent } from './components/income/income-by-id/income-by-id.component';
import { CreateAdminComponent } from './components/user/create-admin/create-admin.component';
import { CreateCompanyEmployeeComponent } from './components/user/create-company-employee/create-company-employee.component';
import { UserByNameComponent } from './components/user/user-by-name/user-by-name.component';
import { AllUsersComponent } from './components/user/all-users/all-users.component';
import { AllCompanyUsersComponent } from './components/user/all-company-users/all-company-users.component';
import { CompanyEmployeeByNameComponent } from './components/user/company-employee-by-name/company-employee-by-name.component';
import { UpdateCouponModalComponent } from './components/coupon/update-coupon-modal/update-coupon-modal.component';
import { CompanyModalComponent } from './components/company/company-modal/company-modal.component';
import { IncomesByDescriptionComponent } from './components/income/incomes-by-description/incomes-by-description.component';
import { IncomeByCompanyComponent } from './components/income/income-by-company/income-by-company.component';
import { AllIncomesComponent } from './components/income/all-incomes/all-incomes.component';
import { UserModalComponent } from './components/user/user-modal/user-modal.component';
import { PurchasesByCategoryComponent } from './components/purchase/purchases-by-category/purchases-by-category.component';
import { PurchasesByPriceComponent } from './components/purchase/purchases-by-price/purchases-by-price.component';
import { PurchasesByDateComponent } from './components/purchase/purchases-by-date/purchases-by-date.component';
import { CustomerPurchasesComponent } from './components/purchase/customer-purchases/customer-purchases.component';
import { CompanyPurchasesComponent } from './components/purchase/company-purchases/company-purchases.component';
import { AllPurchasesComponent } from './components/purchase/all-purchases/all-purchases.component';
import { CompanyCouponByTitleComponent } from './components/coupon/company-coupon-by-title/company-coupon-by-title.component';
import { CompanyCustomerPurchasesComponent } from './components/purchase/company-customer-purchases/company-customer-purchases.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    LogComponent,
    LoginComponent,
    RegisterComponent,
    CustomerNavbarComponent,
    CompanyNavbarComponent,
    AdminNavbarComponent,
    CreateCompanyComponent,
    CreateCouponComponent,
    CompanyByIDComponent,
    CompanyByNameComponent,
    AllCompaniesComponent,
    UserByIdComponent,
    ImageUploderComponent,
    CouponByIDComponent,
    CouponByTitleComponent,
    AllCouponsComponent,
    AllCompanyCouponsComponent,
    CompanyCouponsByCategoryComponent,
    CompanyCouponsByPriceComponent,
    CompanyCouponsByDateComponent,
    CouponsByCategoryComponent,
    CouponsByPriceComponent,
    CouponsByDateComponent,
    CustomerByIDComponent,
    CreateCustomerComponent,
    CustomerByNameComponent,
    AllCustomersComponent,
    PurchaseModalComponent,
    CompanyCustomerByNameComponent,
    CompanyCustomersComponent,
    PurchaseByIDComponent,
    CouponModalComponent,
    IncomeByIDComponent,
    CreateAdminComponent,
    CreateCompanyEmployeeComponent,
    UserByNameComponent,
    AllUsersComponent,
    AllCompanyUsersComponent,
    CompanyEmployeeByNameComponent,
    UpdateCouponModalComponent,
    CompanyModalComponent,
    IncomesByDescriptionComponent,
    IncomeByCompanyComponent,
    AllIncomesComponent,
    UserModalComponent,
    PurchasesByCategoryComponent,
    PurchasesByPriceComponent,
    PurchasesByDateComponent,
    CustomerPurchasesComponent,
    CompanyPurchasesComponent,
    AllPurchasesComponent,
    CompanyCouponByTitleComponent,
    CompanyCustomerPurchasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxfUploaderModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    AngularDraggableModule,
  ],
  providers: [
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
