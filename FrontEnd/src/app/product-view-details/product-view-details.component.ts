import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ){
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(i: number){
    this.selectedProductIndex = i;
  }
}
