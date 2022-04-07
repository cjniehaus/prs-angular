import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Vendor } from 'src/app/models/vendor.models';
import { SystemService } from 'src/app/services/system.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  //Keeping track of our list of vendors
  vendors: Vendor[] = [];
  loggedInUser: User = new User()

  //Inject service using constructor injection
  constructor(private vendorService: VendorService, private systemService: SystemService) { }

  ngOnInit(): void {
    //subscribe to the observable from the service
    this.vendorService.getAll().subscribe(
      data => {
        this.vendors = data
        console.log(data)
      },
      error => { console.log(error) }
    )

    if (this.systemService.loggedInUser != undefined) {
      this.loggedInUser = this.systemService.loggedInUser
      }
  }

  deleteVendor(id: number) {
    this.vendorService.deleteById(id).subscribe(
      data => {
        this.ngOnInit()
      },
      error => { console.log(error) }
    )
  }

}
