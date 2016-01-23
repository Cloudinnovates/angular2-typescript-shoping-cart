import {Component} from 'angular2/core';
import {Product} from './../product';
import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

/**
* Router
*/
@Component({
    selector: 'shop',
    styleUrls: ["app/shop/shop.css","app/commonStyle/commonStyle.css"],
    templateUrl: "app/shop/shop.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService,CartService]
})

export class ShopComponent implements OnInit {

    public title = 'Shop Example';
    public selectedProduct: Product;
    public products: Product[];


    /**
    * Dependecy injection of the service with reflection by angular2
    */
    constructor(private _productService: ProductService, private _cartService : CartService) {

    }

    onSelect(product: Product) {

      console.log("selected product",product.description);
      this.selectedProduct = product; // we will use this information to gray the selected node

    }
    appendItem(product: Product) {

        this._cartService.addProductToCart(product);

    }
    /**
    * Retrives the list of products with an Promise. This is not really neaded. But its
    * good practice to not let the Component know how we fetch the information.
    *
    * The data might be fetched from an API, or local storage ( current impl )
    *
    */
    getProducts() {

      this._productService.getProducts().then(products => this.products = products);

    }

    /**
    * Avoiding fetching data in the constructor makes our code more testable. The solution is to use
    * the onInit provided by angular.
    **/
    ngOnInit() {

      this.getProducts();

    }

}
