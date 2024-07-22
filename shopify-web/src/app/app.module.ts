import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProductComponent } from './admin-page/admin-page/view-product/view-product.component';
import { CreateProductComponent } from './admin-page/admin-page/create-product/create-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
// import { ViewProductComponent } from './admin-page/view-product/view-product.component';
// import { AdminPageModule } from './admin-page/admin-page.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    CreateProductComponent,
    // ViewProductComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    // MatIconModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // AdminPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
