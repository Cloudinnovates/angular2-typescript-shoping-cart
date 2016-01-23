import {PRODUCTS} from './mock-inventory';
import {Injectable} from 'angular2/core';

@Injectable()
export class CartService {

  constructor() {
    
  }

  /**
  * Returns all the products in the cart form the local storage
  *
  **/
  getAllProductsInCart() {

    return Promise.resolve(PRODUCTS);

  }


  addProductToCart() {


  }
}
