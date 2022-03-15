import { Component, OnInit } from '@angular/core';
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

  //Inject service using constructor injection
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //subscribe to the observable from the service
    this.userService.getAll().subscribe(
      data => {
        this.users = data
        console.log(data)
      },
      error => { console.log(error) }
    )
  }

}
