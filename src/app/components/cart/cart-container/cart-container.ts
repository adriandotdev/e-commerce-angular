import { Component, inject, input, OnDestroy } from '@angular/core';
import { CartItemType, CartType, Product as ProductType } from '../../../../models/product';
import { CartService } from '../../../services/cart';
@Component({
  selector: 'app-cart-container',
  imports: [],
  template: ` @for (item of cartItems(); track item.product.id) {
    <div
      class="max-w-6xl  mx-auto flex justify-between mt-5 items-center px-5 py-3 border bg-white border-gray-200/30 rounded-md mb-2 shadow-sm"
    >
      <div class="flex items-center gap-6 max-w-[500px] flex-1">
        <input
          #itemCheckbox
          [checked]="isItemChecked(item.product.id)"
          (change)="checkBoxChange(item.product.id, item, itemCheckbox.checked)"
          type="checkbox"
          class="h-5 w-5 cursor-pointer rounded border-slate-300 accent-orange-600 focus:ring-2 focus:ring-orange-200 focus:ring-offset-1"
        />
        <img class="w-12" [src]="item.product.image" alt="" />
        <span class="max-w-80">{{ item.product.title }}</span>
      </div>

      <div class="grid grid-cols-[1fr_1fr_1fr_1fr] items-center flex-1 gap-20">
        <!-- Unit Price -->
        <div class="text-center w-full">{{ formatPriceToPeso(item.product.price) }}</div>

        <div class="flex items-center gap-3 border border-gray-300">
          <button
            (click)="decreaseQuantity(item.product.id)"
            class="w-8 border-r h-8 flex items-center justify-center border-gray-300 text-lg font-bold hover:bg-gray-100 disabled:opacity-40"
            [disabled]="item.quantity <= 1"
          >
            −
          </button>
          <span class="w-8 text-center font-semibold">{{ item.quantity }}</span>
          <button
            (click)="increaseQuantity(item.product.id)"
            class="w-8 h-8 border-l flex items-center justify-center border-gray-300 text-lg font-bold hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <!-- Total Price -->
        <span class="text-center text-orange-600">
          {{ formatPriceToPeso(item.product.price * item.quantity) }}
        </span>
        <div class="max-w-42.5 w-full text-center">
          <button
            class="text-[14px] cursor-pointer"
            (click)="removeProductFromCart(item.product.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  }`,
  styles: ``,
})
export class CartContainer implements OnDestroy {
  ngOnDestroy(): void {
    this.cartService.toCheckOutItems.set([]);
  }

  cartService = inject(CartService);
  cartItems = input<{ product: ProductType; quantity: number }[]>();
  cartProducts = this.cartService.computedCart;

  isItemChecked(productId: number) {
    return this.cartService.toCheckOutItems().some((item) => item.product.id === productId);
  }

  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  increaseQuantity(productId: number) {
    const productToUpdate = { ...this.cartService.cart()[productId] };

    productToUpdate.quantity = productToUpdate.quantity + 1;

    const updatedCart: CartType = structuredClone(
      Object.fromEntries(
        Object.entries(this.cartService.cart()).filter(([key]) => +key !== productId),
      ),
    );

    updatedCart[productToUpdate.product.id] = productToUpdate;

    this.cartService.cart.set(updatedCart);

    const product = this.cartService
      .toCheckOutItems()
      .find((cartItem) => cartItem.product.id === productId);

    if (product) {
      product.quantity = product.quantity + 1;
      const newCheckoutItems = this.cartService
        .toCheckOutItems()
        .filter((cartItem) => cartItem.product.id !== productId);

      this.cartService.toCheckOutItems.set([...newCheckoutItems, product]);
    }
  }

  decreaseQuantity(productId: number) {
    const productToUpdate = { ...this.cartService.cart()[productId] };

    productToUpdate.quantity = productToUpdate.quantity - 1;

    const updatedCart: CartType = structuredClone(
      Object.fromEntries(
        Object.entries(this.cartService.cart()).filter(([key]) => +key !== productId),
      ),
    );

    updatedCart[productToUpdate.product.id] = productToUpdate;

    this.cartService.cart.set(updatedCart);

    const product = this.cartService
      .toCheckOutItems()
      .find((cartItem) => cartItem.product.id === productId);

    if (product) {
      product.quantity = product.quantity - 1;

      const newCheckoutItems = this.cartService
        .toCheckOutItems()
        .filter((cartItem) => cartItem.product.id !== productId);

      this.cartService.toCheckOutItems.set([...newCheckoutItems, product]);
    }
  }

  removeProductFromCart(productId: number) {
    const newCart: CartType = structuredClone(
      Object.fromEntries(
        Object.entries(this.cartService.cart()).filter(([key]) => +key !== productId),
      ),
    );

    const newToCheckoutItems = this.cartService
      .toCheckOutItems()
      .filter((product) => product.product.id !== productId);

    this.cartService.cart.set(newCart);
    this.cartService.toCheckOutItems.set(newToCheckoutItems);
  }

  removeSelectedProductsFromCart() {
    const newCart: CartType = structuredClone(
      Object.fromEntries(
        Object.entries(this.cartService.cart()).filter(([key]) =>
          this.cartService.toBeDeleted().some((num) => num !== +key),
        ),
      ),
    );

    const newToCheckoutItems = this.cartService
      .toCheckOutItems()
      .filter((product) =>
        this.cartService.toBeDeleted().some((num) => num !== product.product.id),
      );

    this.cartService.cart.set(newCart);
    this.cartService.toCheckOutItems.set(newToCheckoutItems);

    this.cartService.toBeDeleted.set([]);
  }

  checkBoxChange(productId: number, cartItem: CartItemType, isChecked: boolean) {
    if (!isChecked) {
      const newCheckoutItems = this.cartService
        .toCheckOutItems()
        .filter((cartItem) => cartItem.product.id !== productId);
      this.cartService.toCheckOutItems.set(newCheckoutItems);
      this.cartService.toBeDeleted.update((prev) => [
        ...prev.filter((num) => num !== cartItem.product.id),
      ]);
    } else {
      const cartItemCopy = { ...cartItem };
      const newCheckoutItems = [...this.cartService.toCheckOutItems(), cartItemCopy];
      this.cartService.toCheckOutItems.set(newCheckoutItems);
      this.cartService.toBeDeleted.update((prev) => [...prev, cartItemCopy.product.id]);
    }

    this.cartService.isAllSelected.set(this.cartService.isCartEqual());
  }
}
