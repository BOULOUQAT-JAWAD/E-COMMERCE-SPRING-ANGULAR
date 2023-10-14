import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id','Name','Description','Discounted Price','Actual Price','Images','Edit','Delete'];

  constructor(
    private productService: ProductService,
    public imageDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[],i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (response: Product[]) => {
        console.log(response);
        this.productDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  showImages(product: Product){
    console.log(product);
    this.imageDialog.open(ShowProductImagesDialogComponent,{
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProdcutDetails(productId: number){
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }
}
