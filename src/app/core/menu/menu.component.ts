import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user?: User = undefined
  // loggedInUser: User = new User()

  constructor(private systemService: SystemService) { }

  ngOnInit(): void {
    // if (this.systemService.loggedInUser != undefined) {
    //   this.loggedInUser = this.systemService.loggedInUser
    // }
    this.user = this.systemService.loggedInUser
  }

  logout() {
    this.systemService.loggedInUser = undefined
  }

  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

}
