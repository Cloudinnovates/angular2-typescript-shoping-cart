import {Component} from 'angular2/core';
import {Product} from './../product';
import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {CartEntity} from '../cart.entity';
import {OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {SumPipe} from './sum.pipe';
import {SumCartPipe} from './sum.cart.pipe';
/**
* Router
*/
@Component({
    selector: 'cart',
    styleUrls: ["app/cart/cart.css","app/commonStyle/commonStyle.css"],
    templateUrl: "app/cart/cart.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService,CartService],
    pipes: [SumPipe,SumCartPipe]

})
export class CartComponent implements OnInit {

    public cartEntities : CartEntity[];
    public totalSum : number;

    constructor(private _productService: ProductService, private _cartService : CartService) {

      console.log("constructor");

    }

    getProducts() {

        this._cartService.getAllCartEntities().then(function(result) {

            this.cartEntities = result;
            this.calcMax();

          }.bind(this), function(err) {
              alert("something went wrong while fetching the products");
          });

    }
    removeByProductId(productId:number) {

        // finally the new stuff from es6 can be used.
        this.cartEntities = this.cartEntities.filter(entry => entry.product.id != productId);

        this.calcMax();

        //save to localStorage
        this._cartService.saveListOfCartEntities(this.cartEntities);
    }

    clearCart() {

        let entities : CartEntity[] = [];
        this.cartEntities =  entities;

    }

    changeQuantity (productId:number, valueChange:number) {

        // find the CartEntity we are searching for and perform the action
        let cartEntry = this.cartEntities.find(entry => entry.product.id === productId);

        let newValue = cartEntry.quantity + valueChange;

          console.log(newValue,cartEntry.product.stockQuantity);
        // just verify that the user wont do a action that is not permited. ie reduce to 0 or over max
        if(newValue > 0 && newValue <= cartEntry.product.stockQuantity) {
          // set the new value
          cartEntry.quantity = newValue;
          // calculate a new max value
          this.calcMax();
          // save to localStorage
          this._cartService.saveListOfCartEntities(this.cartEntities);
        }

    }

    calcMax () {

      let totalSum = 0;
      this.cartEntities.forEach(function(entity) {
          totalSum += entity.quantity * entity.product.price;
      });
      this.totalSum = totalSum;

    }

    /**
    * Avoiding fetching data in the constructor makes our code more testable. The solution is to use
    * the onInit provided by angular.
    **/
    ngOnInit() {

      this.getProducts();

    }

}
