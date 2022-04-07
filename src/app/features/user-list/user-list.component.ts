import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //Keeping track of our list of users
  users: User[] = [];
  loggedInUser: User = new User()

  //Inject service using constructor injection
  constructor(private userService: UserService, private systemService: SystemService) { }

  ngOnInit(): void {
    //subscribe to the observable from the service
    this.userService.getAll().subscribe(
      data => {
        this.users = data
        console.log(data)
      },
      error => { console.log(error) }
    )

    if (this.systemService.loggedInUser != undefined) {
      this.loggedInUser = this.systemService.loggedInUser
      }
  }

  deleteUser(id: number) {
    this.userService.deleteById(id).subscribe(
      data => {
        this.ngOnInit()
      },
      error => { console.log(error) }
    )
  }
}
