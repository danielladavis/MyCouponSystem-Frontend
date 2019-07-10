import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

// Home - Login/Logout
import { LogComponent } from './components/log/log.component';
import { HomeComponent } from './components/home/home.component';

// Company
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { CompanyByIDComponent } from './components/company/company-by-id/company-by-id.component';
import { CompanyByNameComponent } from './components/company/company-by-name/company-by-name.component';
import { AllCompaniesComponent } from './components/company/all-companies/all-companies.component';

// Coupon
import { CreateCouponComponent } from './components/coupon/create-coupon/create-coupon.component';
import { CouponByIDComponent } from './components/coupon/coupon-by-id/coupon-by-id.component';
import { CouponByTitleComponent } from './components/coupon/coupon-by-title/coupon-by-title.component';
import { CompanyCouponByTitleComponent } from './components/coupon/company-coupon-by-title/company-coupon-by-title.component';
import { AllCouponsComponent } from './components/coupon/all-coupons/all-coupons.component';
import { CouponsByCategoryComponent } from './components/coupon/coupons-by-category/coupons-by-category.component';
import { CouponsByPriceComponent } from './components/coupon/coupons-by-price/coupons-by-price.component';
import { CouponsByDateComponent } from './components/coupon/coupons-by-date/coupons-by-date.component';
import { AllCompanyCouponsComponent } from './components/coupon/all-company-coupons/all-company-coupons.component';
import { CompanyCouponsByCategoryComponent } from './components/coupon/company-coupons-by-category/company-coupons-by-category.component';
import { CompanyCouponsByPriceComponent } from './components/coupon/company-coupons-by-price/company-coupons-by-price.component';
import { CompanyCouponsByDateComponent } from './components/coupon/company-coupons-by-date/company-coupons-by-date.component';

// Customer
import { CustomerByIDComponent } from './components/cusromer/customer-by-id/customer-by-id.component';
import { CustomerByNameComponent } from './components/cusromer/customer-by-name/customer-by-name.component';
import { AllCustomersComponent } from './components/cusromer/all-customers/all-customers.component';
import { CompanyCustomerByNameComponent } from './components/cusromer/company-customer-by-name/company-customer-by-name.component';
import { CompanyCustomersComponent } from './components/cusromer/company-customers/company-customers.component';

// Purchase
import { PurchaseByIDComponent } from './components/purchase/purchase-by-id/purchase-by-id.component';
import { PurchasesByCategoryComponent } from './components/purchase/purchases-by-category/purchases-by-category.component';
import { PurchasesByPriceComponent } from './components/purchase/purchases-by-price/purchases-by-price.component';
import { PurchasesByDateComponent } from './components/purchase/purchases-by-date/purchases-by-date.component';
import { CustomerPurchasesComponent } from './components/purchase/customer-purchases/customer-purchases.component';
import { CompanyCustomerPurchasesComponent } from './components/purchase/company-customer-purchases/company-customer-purchases.component';
import { CompanyPurchasesComponent } from './components/purchase/company-purchases/company-purchases.component';
import { AllPurchasesComponent } from './components/purchase/all-purchases/all-purchases.component';

// User
import { CreateCustomerComponent } from './components/cusromer/create-customer/create-customer.component';
import { CreateAdminComponent } from './components/user/create-admin/create-admin.component';
import { CreateCompanyEmployeeComponent } from './components/user/create-company-employee/create-company-employee.component';
import { UserByIdComponent } from './components/user/user-by-id/user-by-id.component';
import { UserByNameComponent } from './components/user/user-by-name/user-by-name.component';
import { AllUsersComponent } from './components/user/all-users/all-users.component';
import { CompanyEmployeeByNameComponent } from './components/user/company-employee-by-name/company-employee-by-name.component';
import { AllCompanyUsersComponent } from './components/user/all-company-users/all-company-users.component';

// Income
import { IncomeByIDComponent } from './components/income/income-by-id/income-by-id.component';
import { IncomesByDescriptionComponent } from './components/income/incomes-by-description/incomes-by-description.component';
import { IncomeByCompanyComponent } from './components/income/income-by-company/income-by-company.component';
import { AllIncomesComponent } from './components/income/all-incomes/all-incomes.component';

const routes: Routes = [
  // Home - Login/Logout
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  // Company
  { path: 'home/company-create', component: CreateCompanyComponent, canActivate: [AuthGuard] },
  { path: 'home/company-by-id', component: CompanyByIDComponent, canActivate: [AuthGuard] },
  { path: 'home/company-by-name', component: CompanyByNameComponent, canActivate: [AuthGuard] },
  { path: 'home/all-companies', component: AllCompaniesComponent, canActivate: [AuthGuard] },

  // Coupon
  { path: 'home/coupon-create', component: CreateCouponComponent, canActivate: [AuthGuard] },
  { path: 'home/coupon-by-id', component: CouponByIDComponent, canActivate: [AuthGuard] },
  { path: 'home/coupon-by-title', component: CouponByTitleComponent, canActivate: [AuthGuard] },
  { path: 'home/company-coupon-by-title', component: CompanyCouponByTitleComponent, canActivate: [AuthGuard] },
  { path: 'home/all-coupons', component: AllCouponsComponent, canActivate: [AuthGuard] },
  { path: 'home/coupons-by-category', component: CouponsByCategoryComponent, canActivate: [AuthGuard] },
  { path: 'home/coupons-by-price', component: CouponsByPriceComponent, canActivate: [AuthGuard] },
  { path: 'home/coupons-by-date', component: CouponsByDateComponent, canActivate: [AuthGuard] },
  { path: 'home/all-company-coupons', component: AllCompanyCouponsComponent, canActivate: [AuthGuard] },
  { path: 'home/company-coupons-by-category', component: CompanyCouponsByCategoryComponent, canActivate: [AuthGuard] },
  { path: 'home/company-coupons-by-price', component: CompanyCouponsByPriceComponent, canActivate: [AuthGuard] },
  { path: 'home/company-coupons-by-date', component: CompanyCouponsByDateComponent, canActivate: [AuthGuard] },

  // Customer
  { path: 'home/customer-by-id', component: CustomerByIDComponent, canActivate: [AuthGuard] },
  { path: 'home/customer-by-name', component: CustomerByNameComponent, canActivate: [AuthGuard] },
  { path: 'home/all-customers', component: AllCustomersComponent, canActivate: [AuthGuard] },
  { path: 'home/company-customer-by-name', component: CompanyCustomerByNameComponent, canActivate: [AuthGuard] },
  { path: 'home/company-customers', component: CompanyCustomersComponent, canActivate: [AuthGuard] },

  // Purchase
  { path: 'home/purchase-by-id', component: PurchaseByIDComponent, canActivate: [AuthGuard] },
  { path: 'home/purchases-by-category', component: PurchasesByCategoryComponent, canActivate: [AuthGuard] },
  { path: 'home/purchases-by-price', component: PurchasesByPriceComponent, canActivate: [AuthGuard] },
  { path: 'home/purchases-by-date', component: PurchasesByDateComponent, canActivate: [AuthGuard] },
  { path: 'home/customer-purchases', component: CustomerPurchasesComponent, canActivate: [AuthGuard] },
  { path: 'home/company-customer-purchases', component: CompanyCustomerPurchasesComponent, canActivate: [AuthGuard] },
  { path: 'home/company-purchases', component: CompanyPurchasesComponent, canActivate: [AuthGuard] },
  { path: 'home/all-purchases', component: AllPurchasesComponent, canActivate: [AuthGuard] },

  // User
  { path: 'home/create-customer', component: CreateCustomerComponent, canActivate: [AuthGuard] },
  { path: 'home/create-admin', component: CreateAdminComponent, canActivate: [AuthGuard] },
  { path: 'home/create-company-employee', component: CreateCompanyEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'home/user-by-id', component: UserByIdComponent, canActivate: [AuthGuard] },
  { path: 'home/user-by-name', component: UserByNameComponent, canActivate: [AuthGuard] },
  { path: 'home/all-users', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path: 'home/company-user-by-name', component: CompanyEmployeeByNameComponent, canActivate: [AuthGuard] },
  { path: 'home/all-company-users', component: AllCompanyUsersComponent, canActivate: [AuthGuard] },

  // Income
  { path: 'home/income-by-id', component: IncomeByIDComponent, canActivate: [AuthGuard] },
  { path: 'home/income-by-description', component: IncomesByDescriptionComponent, canActivate: [AuthGuard] },
  { path: 'home/income-by-company', component: IncomeByCompanyComponent, canActivate: [AuthGuard] },
  { path: 'home/all-incomes', component: AllIncomesComponent, canActivate: [AuthGuard] },

  // Default page
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
