import {PRODUCTS} from './mock-inventory';
import {Product} from './product';
import {Injectable} from 'angular2/core';
import {CartEntity} from './cart.entity';
/**
* The cart service provides an way to store the cart in local store.
**/
@Injectable()
export class CartService {

  private _storage = localStorage;

  constructor() {
      this.initCart();
  }

  initCart () {

      if(!this._storage.getItem('cart')) {

          var emptyMap : { [key:string]:number; } = {};
          this.setCart(emptyMap);

          console.log("added empty mapp to local storage");
      }

  }

  saveListOfCartEntities(listOfCartEntries : CartEntity[]) {
      // reduce all the entities to a map
      var cartMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
          map[cartEntry.product.id] = cartEntry;
          return map;
      }, {});
      console.log(cartMap);
      this.setCart(cartMap);

  }
  /**
  * Returns all the products in the cart form the local storage
  *
  **/
  getAllCartEntities() {

    var myCartMap = this.getCart();
    var cartEntities : CartEntity[] = [];
    for (var key in myCartMap) {
      var value = myCartMap[key];
      cartEntities.push(value);
    }
    console.log(cartEntities);
    return Promise.resolve(cartEntities);

  }

  /**
  * Will persist the product to local storage
  **/
  addProductToCart(product: Product) {
      // product id , quantity
      var cartMap = this.getCart();

        // if the current key exists in the map , append value
        if(cartMap[product.id] != undefined) {

            // if we are exeding the max number , we need to throw an exception
            // TODO:s
            // increase the quantity of the specific product
            var cartInstance = cartMap[product.id];
            cartInstance.quantity++;
            cartMap[product.id] = cartInstance;
        } else {
          // if not, set default value
          cartMap[product.id] = {
            'product':product,
            'quantity':1
          }
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
