import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  private async request(
    method: string,
    url: string,
    data?: any,
    responseType?: any
  ) {
    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe({ next: resolve as any, error: reject as any });
    });
  }

  getProducts() {
    return this.request('get', `${this.baseUrl}/products`);
  }

  createProduct(product: Product) {
    console.log('createProduct ' + JSON.stringify(product));
    return this.request('post', `${this.baseUrl}/products`, product);
  }

  updateProduct(product: Product) {
    console.log('updateProduct ' + JSON.stringify(product));
    return this.request(
      'put',
      `${this.baseUrl}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number) {
    return this.request('delete', `${this.baseUrl}/products/${id}`);
  }
}
