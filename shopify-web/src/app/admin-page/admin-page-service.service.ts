import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminPageServiceService {
  private baseUrl = 'http://127.0.0.1:8001/prod'; // Replace with your backend API base URL

  constructor(private http: HttpClient) { }

  getAllProductDetails(data:any): Observable<any> {

    let params = new HttpParams();
    if (data) {
      Object.keys(data).forEach(key => {
        params = params.append(key, data[key]);
      });
    }
    return this.http.get<any>(`${this.baseUrl}/view-products`, { params: params });
  }

  getProductData(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/get-product`,data);
  }

  createProductData(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-product`, data);
  }

  editProductData(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/edit-product`, data);
  }

  deleteProduct(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/delete-product`, data);
  }
  
}
