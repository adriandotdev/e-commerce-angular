import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Service, signal, WritableSignal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CartItemType, ICart, Product } from '../../models/product';

@Service()
export class CartService {
  httpClient = inject(HttpClient);

  cart: WritableSignal<Record<number, { product: Product; quantity: number }>> = signal<
    Record<number, { product: Product; quantity: number }>
  >(JSON.parse(localStorage.getItem('cart') ?? '{}'));
  computedCart = computed(() => Object.values(this.cart()));
  cartCount = computed(() => Object.values(this.cart()).length);
  toCheckOutItems: WritableSignal<Array<CartItemType>> = signal([]);

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    });
  }

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
