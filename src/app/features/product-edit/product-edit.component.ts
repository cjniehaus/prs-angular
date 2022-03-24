import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Vendor } from 'src/app/models/vendor.models';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product()
  productId: number = 0
  vendors: Vendor[] = [];

  constructor(private productService: ProductService,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productId = params.id
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
    )

    this.vendorService.getAll().subscribe(
      data => {
        this.vendors = data
        console.log(data)
      },
      error => { console.log(error) }
    )
  }

  compareFn(v1: Vendor, v2: Vendor) {
    if(v1.name == v2.name && v1.id == v2.id) {
      return true
    }
    else return false
  }

  editProduct() {
    this.productService.editById(this.product).subscribe(
      data => {
        this.router.navigateByUrl('/product/detail/' + this.product.id)
      },
      error => { console.log(error) }
    )
  }

}
