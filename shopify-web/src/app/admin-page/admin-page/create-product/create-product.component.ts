import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPageServiceService } from '../../admin-page-service.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  navData:any
  button:any
  id:any
  name:any
  price:any
  description:any
  brand:any
  product_type:any
  productDetails:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private adminPageServiceService: AdminPageServiceService,
    public dialogRef: MatDialogRef<CreateProductComponent> ) { 
    this.navData = data
    this.button = this.navData.id? "Edit":"Create" 
    if(this.button == "Edit"){
      this.getProductData()
    }
  }

  ngOnInit(): void {
  }

  cancelButton(data:any){
    this.dialogRef.close();
  }

  submitForm(){

    const data = {'id': this.navData.id,
                  "type":this.product_type,
                  "name":this.name,
                  "brand":this.brand,
                  "description": this.description,
                  "price": this.price
                }
    if(this.navData.id){
      this.adminPageServiceService.editProductData(data).subscribe(response => {
      },
      error => {
      });
    }
    else{
      this.adminPageServiceService.createProductData(data).subscribe(response => {
      },
      error => {
        console.log("error")
      });
    }

    this.dialogRef.close();
  }

  getProductData(){
    this.adminPageServiceService.getProductData({"id":this.navData.id}).subscribe(response => {
      this.productDetails = response
      this.name = response.name
      this.price = response.price
      this.brand = response.brand
      this.product_type = response.product_type
      this.description = response.description
    },
    error => {
      console.log("error")
    });
  }

  validateData(){
    if(this.button == 'Create'){
      return false
    }
    else if(this.productDetails){
      
      if (this.productDetails.name == this.name && 
        this.productDetails.price == this.price && 
        this.productDetails.brand == this.brand && 
        this.productDetails.product_type == this.product_type &&
        this.productDetails.description == this.description){
          return true

        }
      return false
    }
    return false
  }

}
