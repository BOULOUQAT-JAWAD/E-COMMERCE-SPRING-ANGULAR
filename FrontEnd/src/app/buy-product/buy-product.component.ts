import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent {

  isSingleProductCheckout:string | null= '';
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
    private productService: ProductService,
    private router: Router
  ){
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId, quantity: 1}
      )
    )
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (response) =>{
        console.log(response);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      }, (error) => {
        console.error(error);
      }
    );
  }

  getQuantityForProduct(productId: number){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    
    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number,productDiscountedPrice: number){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(value: any,productId: number){
    this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    )[0].quantity = value;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity
      }
    )

    return grandTotal;
  }
}
