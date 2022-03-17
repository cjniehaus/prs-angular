import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product()
  productId: number = 1

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getById(this.productId).subscribe(
      data => {
        if (data.length > 0) {
          this.product = data[0]
        }
        console.log(data)
      },
      error => { console.log(error) }
    )
  }

}