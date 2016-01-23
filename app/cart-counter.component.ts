import {Product} from './product';
import {Component} from 'angular2/core';
/**
* Responsible for counting the number of products that are in the cart
*
**/
@Component({
  selector: 'my-product-stuff',
  inputs: ['numberOfProducts'],
  styles: [`
    .inline-block {
      display: inline-block;
    }
  `],
  template: `
  <input class="inline-block" type="text" placeholder="Search"/>
  <p class="inline-block"> {{numberOfProducts}} items in Cart </p>
`,
})
export class CartCounterComponent {

    public numberOfProducts: Product;

    construct() {

    }
    /**
    * Appends the given product to the localStorage
    *
    **/
    appendItem(product : Product) {


      console.log(product);
    }

}
