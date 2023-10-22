import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent {

  selectedProductIndex = 0;
  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ){
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(i: number){
    this.selectedProductIndex = i;
  }

  buyProduct(productId: number){
    this.router.navigate(['buyProduct',{
      isSingleProductCheckout: true, id: productId
    }]);
  }

  addToCart(productId: number){
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error) => {
        console.error(error);
      }
    );
  }
}
