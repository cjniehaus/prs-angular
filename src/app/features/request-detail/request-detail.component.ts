import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { RequestService } from 'src/app/services/request.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request: Request = new Request()
  requestId: number = 0
  loggedInUser: User = new User()

  constructor(private requestService: RequestService, private router: Router,
    private route: ActivatedRoute, private systemService: SystemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.requestId = params.id
        this.requestService.getById(this.requestId).subscribe(
          data => {
            if (data.length > 0) {
              this.request = data[0]
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

  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).subscribe(
      data => {
        this.router.navigateByUrl('/request/list')
      },
      error => { console.log(error) }
    )
  }

}
