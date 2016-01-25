import {PRODUCTS} from './mock-inventory';
import {Injectable} from 'angular2/core';

@Injectable()
export class ProductService {
  /**
  * Lists all the products
  **/
  getProducts() {
    // get the products from the mock
    return Promise.resolve(PRODUCTS);
  }
}
