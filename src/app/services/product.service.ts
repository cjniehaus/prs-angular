import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

//configure base url
const productRoute = "/products"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiBaseUrl + productRoute

  constructor(private http: HttpClient) { }

  //http://localhost:8080/products/
  getAll(): Observable<Product[]> {
    let requestUrl = this.url + '/'
    return this.http.get<Product[]>(requestUrl)
  }

  //http://localhost:8080/products/{id}
  getById(id: number): Observable<Product[]> {
    let requestUrl = this.url + '/' + id
    return this.http.get<Product[]>(requestUrl)
  }

  //http://localhost:8080/products
  createProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.url, product)
  }

  //http://localhost:8080/products/{id}
  deleteById(id: number): Observable<Product[]> {
    let requestUrl = this.url + '/' + id
    return this.http.delete<Product[]>(requestUrl)
  }

  //http://localhost:8080/products/{id}
  editById(product: Product): Observable<Product[]> {
    let requestUrl = this.url + '/' + product.id
    return this.http.put<Product[]>(requestUrl, product)
  }
}
