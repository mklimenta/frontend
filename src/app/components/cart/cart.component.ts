import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartModelServer} from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;

  constructor(public cartService: CartService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  // tslint:disable-next-line:typedef
  changeQuantity(id: number, increaseQuantity: boolean) {
    this.cartService.updateCartItems(id, increaseQuantity);
  }
}
