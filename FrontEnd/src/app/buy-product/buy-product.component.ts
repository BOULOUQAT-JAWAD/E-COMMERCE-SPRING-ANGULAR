import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber:'',
    alternateContactNumber:'',
    orderProductQuantityList:[]
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ){
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId, quantity: 1}
      )
    )
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe(
      (response) =>{
        console.log(response);
        orderForm.reset();
      }, (error) => {
        console.error(error);
      }
    );
  }
}