import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Service, signal, WritableSignal } from '@angular/core';
import { CartItemType, Product } from '../../models/product';

@Service()
export class CartService {
  httpClient = inject(HttpClient);

  cart: WritableSignal<Record<number, { product: Product; quantity: number }>> = signal<
    Record<number, { product: Product; quantity: number }>
  >(JSON.parse(localStorage.getItem('cart') ?? '{}'));
  computedCart = computed(() => Object.values(this.cart()));
  cartCount = computed(() => Object.values(this.cart()).length);
  toCheckOutItems: WritableSignal<Array<CartItemType>> = signal([]);
  isAllSelected = signal<Boolean>(false);
  isCartEqual = computed(() => Object.values(this.cart()).length === this.toCheckOutItems().length);
  totalOfSelectedItems = computed(() =>
    this.toCheckOutItems().reduce(
      (prev, current) => prev + current.quantity * current.product.price,
      0,
    ),
  );
  toBeDeleted = signal<Number[]>([]);
  toOrderItems: WritableSignal<Array<CartItemType>> = signal([]);
  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    });
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

  handleSelectAllCheckboxEvent(isChecked: boolean) {
    const newCheckoutItems = isChecked ? [...Object.values(this.cart())] : [];
    this.toCheckOutItems.set(newCheckoutItems);
    this.isAllSelected.set(isChecked);

    if (isChecked) {
      this.toBeDeleted.set([...Object.values(this.cart()).map((p) => p.product.id)]);
    } else {
      this.toBeDeleted.set([]);
    }
  }
}
