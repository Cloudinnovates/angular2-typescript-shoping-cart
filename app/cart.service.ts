import {PRODUCTS} from './mock-inventory';
import {Product} from './product';
import {Injectable} from 'angular2/core';
/**
* The cart service provides an way to store the cart in local store.
**/
@Injectable()
export class CartService {

  private _storage = localStorage;

  constructor() {
    var emptyMap : { [key:string]:number; } = {};
    this.clearTheCart();
    this.setCart(emptyMap);
    console.log("added empty mapp to local storage");
  }

  /**
  * Returns all the products in the cart form the local storage
  *
  **/
  getAllProductsInCart() {

    return Promise.resolve(PRODUCTS);

  }

  /**
  * Will persist the product to local storage
  **/
  addProductToCart(product: Product) {
      // product id , quantity
      var cartMap = this.getCart();

        // if the current key exists in the map , append value
        if(cartMap[product.id] != undefined) {
          console.log("not first time")
            // increase the quantity of the specific product
            var value = cartMap[product.id];
            value++;
            cartMap[product.id] = value;
        } else {
          console.log("first time");
          // if not, set default value
          cartMap[product.id] = 1;
        }
        console.log(cartMap);
      // save the map
      this.setCart(cartMap);

  }
  private getCart() {

     var cartAsString = this._storage.getItem('cart');
     return JSON.parse(cartAsString);

  }
  private setCart(cartMap) {

      this._storage.setItem('cart',JSON.stringify(cartMap));

  }
  clearTheCart() {
      this._storage.clear();
  }
}
