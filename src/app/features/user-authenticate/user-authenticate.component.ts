import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SystemService } from 'src/app/services/system.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-authenticate',
  templateUrl: './user-authenticate.component.html',
  styleUrls: ['./user-authenticate.component.css']
})
export class UserAuthenticateComponent implements OnInit {

  user: User = new User()

  constructor(private userService: UserService, private systemService: SystemService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.authenticate(this.user).subscribe(
      data => {
        if (data.length > 0) {
          console.log(data)
          this.systemService.loggedInUser = data[0]
          this.router.navigateByUrl('/user/list')
        } else {

        }
      },
      error => { console.log(error) }
    )
  }
}
