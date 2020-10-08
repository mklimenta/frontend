import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
  this.productService.getAllProducts()
    // tslint:disable-next-line:ban-types
    .subscribe((prods: {count: Number, products: any[]}) => {
      this.products = prods.products;
      console.log(this.products);
    });
  }

  // tslint:disable-next-line:typedef ban-types
  selectProduct(id: Number) {
    this.router.navigate(['/product', id])
      .then();
  }
}
