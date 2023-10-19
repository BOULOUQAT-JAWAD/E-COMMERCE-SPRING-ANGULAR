import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pageNumber: number = 0;
  showLoadButton = false;
  productDetails: Product[] = [];

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts(this.pageNumber)
    .pipe(
      map((x: Product[],i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (response: Product[]) => {
        if(response.length == 10)
          this.showLoadButton = true;
        else
          this.showLoadButton = false;
        response.forEach(p => this.productDetails.push(p));
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    )
  }

  public loadMoreProduct(){
    this.pageNumber++;
    this.getAllProducts();
  }

  showProductDetails(productId: any){
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
}
