import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartContainer } from './cart-container';

describe('CartContainer', () => {
  let component: CartContainer;
  let fixture: ComponentFixture<CartContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(CartContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
