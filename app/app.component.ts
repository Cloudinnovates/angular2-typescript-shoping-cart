import {Component} from 'angular2/core';
import {Product} from './product';
import {CartComponent} from './cart/cart.component';
import {ProductService} from './product.service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ShopComponent} from './shop/shop.component';
import {CartService} from './cart.service';

/**
*
*  Router for the application
*
*/
@Component({
    selector: 'my-app',
    styleUrls: ["app/app.css","app/commonStyle/commonStyle.css"],
    templateUrl: "app/app.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService,CartService]
})
@RouteConfig([
  {path: '/shop',   name: 'Shop',     component: ShopComponent, useAsDefault: true},
  {path: '/cart', name: 'Cart', component: CartComponent}
])
export class AppComponent  {

    public title = "Mobilifånia";

  
    constructor(private _productService: ProductService,private _cartService : CartService) {



    }

}
