import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price'];

  cartDetails: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ){
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response:any) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  checkout(){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, id: 0
    }]);
    /*
    this.productService.getProductDetails(false,0).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    )*/
  }
}
