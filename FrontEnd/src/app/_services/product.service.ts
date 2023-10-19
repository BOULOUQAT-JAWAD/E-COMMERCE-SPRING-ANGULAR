import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:8080/addNewProduct",product);
  }

  public getAllProducts(pageNumber:number){
    return this.httpClient.get<Product[]>("http://localhost:8080/getAllProducts?pageNumber="+pageNumber);
  }

  public getProductDetailsById(productId: any){
    return this.httpClient.get<Product>("http://localhost:8080/getProductDetailsById/"+productId)
  }

  public deleteProduct(productId: number){
    return this.httpClient.delete("http://localhost:8080/deleteProductDetails/"+productId);
  }

  public getProductDetails (isSingleProductCheckout: any,productId: any){
    return this.httpClient.get<Product[]>("http://localhost:8080/getProductDetails/"+isSingleProductCheckout+"/"+productId)
  }

  public placeOrder(orderDetails: OrderDetails){
    return this.httpClient.post("http://localhost:8080/placeOrder",orderDetails);
  }
}
