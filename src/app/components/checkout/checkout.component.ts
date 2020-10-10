import {Component, OnInit} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;
  showSpinner: boolean;
  checkoutForm: any;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              ) {

    // this.checkoutForm = this.fb.group({
    //   firstname: ['', [Validators.required]],
    //   lastname: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', [Validators.required]],
    //
    // });

  }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  // tslint:disable-next-line:typedef
  onCheckout() {
    this.spinner.show();
    this.cartService.checkoutFromCart(2);
  }
}
