import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SystemService } from 'src/app/services/system.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = new User()
  userId: number = 0
  loggedInUser: User = new User()

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router, private systemService: SystemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userId = params.id
        this.userService.getById(this.userId).subscribe(
          data => {
            if (data.length > 0) {
              this.user = data[0]
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

  deleteUser() {
    this.userService.deleteById(this.user.id).subscribe(
      data => {
        this.router.navigateByUrl('/user/list')
      },
      error => { console.log(error) }
    )
  }
}
