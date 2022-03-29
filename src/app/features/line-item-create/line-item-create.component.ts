import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/models/line-item.model';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {

  lineItem: LineItem = new LineItem()
  request: Request = new Request()
  requestId: number = 0

  constructor(private requestService: RequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.requestId = params.id
        this.requestService.getById(this.requestId).subscribe(
          data => {
            if (data.length > 0) {
              this.request = data[0]
            }
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

}
