import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from '../../models/product';

/**
 * For creating service: run this command
 * ng g service folder/name_of_service
 *
 * For creating component
 * ng g c folder/name_of_component
 */
@Service()
export class Products {
  http = inject(HttpClient);

  getProducts() {
    const url = 'https://fakestoreapi.com/products';
    return this.http.get<Array<Product>>(url);
  }

  getProductById(id: number) {
    const url = `https://fakestoreapi.com/products/${id}`;
    return this.http.get<Product>(url);
  }
}
