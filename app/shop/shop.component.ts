import {Component} from 'angular2/core';
import {Product} from './../product';
import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {OnInit,Output,EventEmitter} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {Host} from 'angular2/core';
import {AppComponent} from './../app.component';

/**

* Router
*/
@Component({
    inputs: ['title'],
    selector: 'shop',
    styleUrls: ["app/shop/shop.css","app/commonStyle/commonStyle.css"],
    templateUrl: "app/shop/shop.html",
    directives: [],
    providers: [ProductService,CartService]
})
export class ShopComponent implements OnInit {


    public selectedProduct: Product;
    public products: Product[];
    public visibleProducts : Product[];
    public product: Product;

    /**
    * Dependecy injection of the service with reflection by angular2
    */
    constructor(private _router: Router, private _productService: ProductService, private _cartService : CartService ) {

          // this constructor is not empty, look at the params. creating and assigning private vars on one line, sweet.

          // body-less constructors in the future?

    }

    filter(filterVal:string) {
      
        this.visibleProducts = this.products.filter(product => product.description.toLowerCase().includes(filterVal.toLowerCase()));

    }
    onSelect(product: Product) {

        this.selectedProduct = product; // we will use this information to gray the selected node
    }
    appendItem(product: Product) {

        this._cartService.addProductToCart(product);

        this._router.navigate( ['Cart'] );

    }

    /**
    * Retrives the list of products with an Promise. This is not really neaded. But its
    * good practice to not let the Component know how we fetch the information.
    *
    * The data might be fetched from an API, or local storage ( current impl )
    *
    */
    getProducts() {

      this._productService.getProducts().then(function(result) {

          this.products = result;
          this.visibleProducts = result;

        }.bind(this), function(err) {
            alert("something went wrong while fetching the products");
        });

    }

    /**
    * Avoiding fetching data in the constructor makes our code more testable. The solution is to use
    * the onInit provided by angular.
    **/
    ngOnInit() {

      this.getProducts();

    }

}
