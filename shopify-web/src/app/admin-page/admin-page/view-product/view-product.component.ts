import { Component, inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { AdminPageServiceService } from '../../admin-page-service.service';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'brand', 'productType', 'price', 'description', 'action'];
 
  name:any
  minPrice:any
  maxPrice: any
  price:any
  brand:any
  productType:any
  productDetailsData:any
  priceRange = [
    { key: 'below 500', value: [0, 500] },
    { key: '500-1000', value: [501, 1000] },
    { key: '1000-5000', value: [1001, 5000] },
    { key: '5000-10000', value: [5001, 10000] },
    { key: 'above 10000', value: [10001, 1000000] }
  ];
  filters :any
  pageLength = 5
  totalLength:any
  pageIndex = 1


  constructor(
    public dialog: MatDialog,
    private adminPageServiceService: AdminPageServiceService) 
    {
      this.getProductDetails() 
    }

  ngOnInit(): void {
  }

  createProduct() : void {
    const data={"form":"create"}
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '35%',
      height: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductDetails() 
    });
  }

  resetFilters(){
    this.name = ''
    this.minPrice = ''
    this.maxPrice = ''
    this.price = ''
    this.brand = ''
    this.productType = ''
    this.getProductDetails() 
  }

  getProductDetails(){
  this.adminPageServiceService.getAllProductDetails(this.getFilters()).subscribe(response => {
    this.productDetailsData = response.data
    this.totalLength = response.count
  },
  error => {
    console.log("error")
  });
}

  editProduct(id:any) : void {
    const data={"id":id}
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '35%',
      height: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductDetails() 
    });
  }



  deleteProduct(id:any){
    if(confirm('Do you want to delete?'))
      this.adminPageServiceService.deleteProduct({'id':id}).subscribe(response => {
        this.getProductDetails() 
      },
      error => {
        this.getProductDetails() 
      });
    
  }

  getFilters(){
    this.filters = {}
    this.filters.pageLength = this.pageLength
    this.filters.pageIndex = this.pageIndex
    if(this.name){
      this.filters.name = this.name
    }
    if(this.price){
      this.filters.minPrice = this.price[0]
      this.filters.maxPrice = this.price[1]
    }
    if(this.brand){
      this.filters.brand = this.brand
    }
    if(this.productType){
      this.filters.productType = this.productType
    }
    return this.filters

  }

  loadProducts(pageIndex: number, pageSize: number){
    this.pageLength =pageSize
    this.pageIndex = pageIndex + 1
    this.getProductDetails() 
  }


}


