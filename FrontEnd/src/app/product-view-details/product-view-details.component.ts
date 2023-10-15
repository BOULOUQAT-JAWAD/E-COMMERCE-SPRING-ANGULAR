import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

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
    private router: Router
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
}
