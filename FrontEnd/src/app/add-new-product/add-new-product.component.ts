import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {

  constructor(
    private productService: ProductService
  ){}

  product: Product = {
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0
  }

  addProduct(productForm: NgForm){
    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        productForm.reset();
      },
      (error: HttpErrorResponse) =>{
        console.error(error);
      }
    );
  }
}
