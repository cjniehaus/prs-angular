import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Keeping track of our list of products
  products: Product[] = [];
  loggedInUser: User = new User()

  //Inject service using constructor injection
  constructor(private productService: ProductService, private systemService: SystemService) { }

  ngOnInit(): void {
    //subscribe to the observable from the service
    this.productService.getAll().subscribe(
      data => {
        this.products = data
        console.log(data)
      },
      error => { console.log(error) }
    )

    if (this.systemService.loggedInUser != undefined) {
      this.loggedInUser = this.systemService.loggedInUser
      }
  }

  deleteProduct(id: number) {
    this.productService.deleteById(id).subscribe(
      data => {
        this.ngOnInit()
      },
      error => { console.log(error) }
    )
  }

}
