import {Component} from 'angular2/core';
import {Product} from './product';
import {ProductDetailComponent} from './hero-detail.component';
import {CartCounterComponent} from './cart-counter.component';
import {ProductService} from './product.service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ShopComponent} from './shop/shop.component';
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
    providers: [ProductService]
})
@RouteConfig([
  {path: '/shop',   name: 'Shop',     component: ShopComponent},
  {path: '/cart', name: 'Cart', component: CartCounterComponent}
])
export class AppComponent  {

    public title = "Mobilifånia";

    /**
    * Dependecy injection of the service. Why not using anotations instead?
    */
    constructor(private _productService: ProductService) {


    }

}
