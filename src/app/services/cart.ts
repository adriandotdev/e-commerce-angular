import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ICart, Product } from '../../models/product';

@Service()
export class CartService {
  httpClient = inject(HttpClient);

  cart = signal<Record<number, { product: Product; quantity: number }>>({});
  computedCart = computed(() => Object.values(this.cart()));

  addToCart(userId: number, products: Array<Pick<Product, 'id'>>): Observable<ICart> {
    const url = 'https://fakestoreapi.com/carts';
    return this.httpClient.post<ICart>(url, {
      userId,
      products,
    });
  }

  getSingleCart(cartId: number): Observable<ICart> {
    const url = `https://fakestoreapi.com/carts/${cartId}`;

    return this.httpClient.get<ICart>(url);
  }

  getAllCarts(userId: number): Observable<Array<ICart>> {
    const url = `https://fakestoreapi.com/carts`;

    return this.httpClient.get<Array<ICart>>(url).pipe(
      map((carts) => carts.filter((cart) => cart.userId === userId)),
      tap((data) => console.log('Filtered carts:', data)),
    );
  }

  addToProductCart(product: Product, quantity: number) {
    const cartProduct = this.cart()[product.id];

    if (cartProduct) {
      this.cart.update((prev) => ({
        ...prev,
        [cartProduct.product.id]: {
          product: cartProduct.product,
          quantity: cartProduct.quantity + quantity,
        },
      }));

      return;
    }

    this.cart.update((prev) => ({ ...prev, [product.id]: { product, quantity } }));
  }
}
