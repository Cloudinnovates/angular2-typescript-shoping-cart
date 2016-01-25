import {Component} from 'angular2/core';
import {Product} from './../product';
import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {CartEntity} from '../cart.entity';
import {OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {SumPipe} from './sum.pipe';
/**
*
* This component is managing the cart.
* It will save the cart to localstorage and update the visual part when the data change, and the other way around.
*
*/
@Component({
    selector: 'cart',
    styleUrls: ["app/cart/cart.css","app/commonStyle/commonStyle.css"],
    templateUrl: "app/cart/cart.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService,CartService],
    pipes: [SumPipe] // a pipe to calculate the sum dynamicly. Similar to filters in angular 1.
})
export class CartComponent implements OnInit {

    public cartEntities : CartEntity[];
    public totalSum : number; // will hold the total sum that the user needs to pay

    constructor(private _productService: ProductService, private _cartService : CartService) {

        // inject the services

    }

    /**
    * Retrives a list of products from the cartService. When done, it will calculate the max value.
    *
    **/
    getProducts() {

        this._cartService.getAllCartEntities().then(function(result) {

            this.cartEntities = result;
            this.calcMax();

          }.bind(this), function(err) {
              alert("something went wrong while fetching the products");
          });

    }

    /**
    * Removes all cartInstances that are bound to the productId given.
    **/
    removeByProductId(productId:number) {

        // Filter out all cartEntities with given productId,  finally the new stuff from es6 can be used.
        this.cartEntities = this.cartEntities.filter(entry => entry.product.id != productId);

        // recalculate max value
        this.calcMax();

        //save to localStorage
        this._cartService.saveListOfCartEntities(this.cartEntities);
    }

    /**
    * Change the quantity of a given cartEntry instance.
    * This method is used by the + and - icons in the cart.
    *
    * The change will only occur if it's an valid change.
    **/
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
    /**
    * Recalculates a new totalMax.
    *
    **/
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
