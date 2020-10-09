import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient,
              private router: Router) { }

  // Fetch Products from the backend
  // tslint:disable-next-line:typedef
  getAllProducts(numberOfResults = 10): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  // GET single Product from Server
  // tslint:disable-next-line:typedef
  getProduct(id: number): Observable<ProductModelServer> {
      return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  // GET Products from One Category
  // tslint:disable-next-line:typedef
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/' + catName);
  }
}
