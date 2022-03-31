import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LineItem } from '../models/line-item.model';
import { Request } from '../models/request.model';

//configure base url
const requestRoute = "/line-items"

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  private url = environment.apiBaseUrl + requestRoute

  constructor(private http: HttpClient) { }

  getAllByRequest(request: Request): Observable<LineItem[]> {
    return this.http.put<LineItem[]>(this.url, request)
  }

  createItem(lineItem: LineItem): Observable<LineItem[]> {
    return this.http.post<LineItem[]>(this.url, lineItem)
  }
}
