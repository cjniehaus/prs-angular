import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  userId: number = 0

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

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
  }

  editUser() {
    this.userService.editById(this.user).subscribe(
      data => {
        this.router.navigateByUrl('/user/list')
      },
      error => { console.log(error) }
    )
  }

}
