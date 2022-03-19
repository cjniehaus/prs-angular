import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Vendor } from 'src/app/models/vendor.models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product()
  vendor: Vendor = new Vendor()

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.product)
  }

  createProduct() {
    console.log(this.product)
    this.productService.createProduct(this.product).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('/product/list')
      },
      error => console.log(error)
    )
  }

}
