import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { RequestService } from 'src/app/services/request.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  //Keeping track of our list of requests
  requests: Request[] = [];
  loggedInUser: User = new User()
  user?: User = undefined


  //Inject service using constructor injection
  constructor(private requestService: RequestService, private systemService: SystemService) { }

  ngOnInit(): void {
    //Subscribe to the observable from the service
    if (this.systemService.loggedInUser != undefined) {
      this.loggedInUser = this.systemService.loggedInUser
    }
    if (this.loggedInUser && this.loggedInUser.admin) {
      this.requestService.getAll().subscribe(
        data => {
          this.requests = data
          console.log(data)
        },
        error => { console.log(error) }
      )
    } else if (this.loggedInUser && !this.loggedInUser.admin) {
      this.requestService.getAllByUser(this.loggedInUser).subscribe(
        data => {
          this.requests = data
          console.log(data)
        },
        error => { console.log(error) }
      )
    }

    this.user = this.systemService.loggedInUser
  }

  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).subscribe(
      data => {
        this.ngOnInit()
      },
      error => { console.log(error) }
    )
  }
}
