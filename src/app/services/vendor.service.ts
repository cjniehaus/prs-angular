import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendor } from '../models/vendor.models';

//configure base url
const vendorRoute = "/vendors"

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  url = environment.apiBaseUrl + vendorRoute

  constructor(private http: HttpClient) { }

  //http://localhost:8080/vendors/
  getAll(): Observable<Vendor[]> {
    let requestUrl = this.url + '/'
    return this.http.get<Vendor[]>(requestUrl)
  }

  //http://localhost:8080/vendors/{id}
  getById(id: number): Observable<Vendor[]> {
    let requestUrl = this.url + '/' + id
    return this.http.get<Vendor[]>(requestUrl)
  }

  //http://localhost:8080/vendors
  createVendor(vendor: Vendor): Observable<Vendor[]> {
    return this.http.post<Vendor[]>(this.url, vendor)
  }

  //http://localhost:8080/vendors/{id}
  deleteById(id: number): Observable<Vendor[]> {
    let requestUrl = this.url + '/' + id
    return this.http.delete<Vendor[]>(requestUrl)
  }

  //http://localhost:8080/vendors/{id}
  editById(vendor: Vendor): Observable<Vendor[]> {
    let requestUrl = this.url + '/' + vendor.id
    return this.http.put<Vendor[]>(requestUrl, vendor)
  }
}
