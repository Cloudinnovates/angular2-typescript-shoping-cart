import {Component} from 'angular2/core';
import {Product} from './../product';
import {CartEntity} from '../cart.entity';
import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {OnInit,Output,EventEmitter} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {Host} from 'angular2/core';
import {AppComponent} from './../app.component';

/**

* This component is responsible for the shop page. it displays the list of products and handles the filtering.
* All communication to local storage is made through the CartService
*
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
    public filterVal = "";

    /**
    * Dependecy injection of the service with reflection by angular2
    */
    constructor(private _router: Router, private _productService: ProductService, private _cartService : CartService ) {

          // this constructor is not empty, look at the params. creating and assigning private vars on one line, sweet.

          // body-less constructors in the future?

    }

    filter() {
        // filter out non maching products with js array.filter + string.includes
        this.visibleProducts = this.products.filter(product => product.description.toLowerCase().includes(this.filterVal.toLowerCase()));

    }

    /**
    * Selects a product. The product will be greyed due to the css applied to it.
    *
    **/
    onSelect(product: Product) {

        this.selectedProduct = product; // we will use this information to gray the selected node
    }

    /**
    * Append a product to the cart through the cartService ( that we got injected )
    * then navigate to the cart
    **/
    appendItem(product: Product) {

        // get the cart entry for the product
        this._cartService.getCartEntryByProductId(product.id).then(function(cartEntry:CartEntity) {

          // if product quantity hasnt been exeeded
          if(this.checkIfCapacityIsExeeded(cartEntry)) {

              this._cartService.addProductToCart(product);

              this._router.navigate( ['Cart'] );

          } else {
              // TODO: change this one to a modal later on, if needed
              alert("Out of stock for the given product. You currently have " + cartEntry.quantity + " of given product in your cart, while we in stock have " + cartEntry.product.stockQuantity );

          }

        }.bind(this));

    }

    checkIfCapacityIsExeeded(cartEntry:CartEntity):boolean {

          return cartEntry == undefined ||  (cartEntry.quantity + 1 <=  cartEntry.product.stockQuantity)

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
            alert("something went wrong while fetching the products"); // some error message to the user would be good
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
