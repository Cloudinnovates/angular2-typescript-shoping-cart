import {Product} from './product';
/***
* A typescript interface describing a cart item.
*
**/
export interface CartEntity {

  quantity: number; // the quantity
  product: Product;

}
