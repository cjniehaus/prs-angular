import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product()
  productId: number = 0
  loggedInUser: User = new User()

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router, private systemService: SystemService) { }

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

    if (this.systemService.loggedInUser != undefined) {
      this.loggedInUser = this.systemService.loggedInUser
      }
  }

  deleteProduct() {
    this.productService.deleteById(this.product.id).subscribe(
      data => {
        this.router.navigateByUrl('/product/list')
      },
      error => { console.log(error) }
    )
  }
}
