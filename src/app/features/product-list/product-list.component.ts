import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Keeping track of our list of products
  products: Product[] = [];

  //Inject service using constructor injection
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //subscribe to the observable from the service
    this.productService.getAll().subscribe(
      data => {
        this.products = data
        console.log(data)
      },
      error => { console.log(error) }
    )
  }

}
