import {Component} from 'angular2/core';
import {Product} from './product';

@Component({
  inputs: ['product'],
  selector: 'my-product-detail',
  template: `
  <div *ngIf="product">
    <h2>{{product.description}} details!</h2>
    <div><label>id: </label>{{product.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="product.description" placeholder="name"/>
    </div>
  </div>
`,
})
export class ProductDetailComponent {

  public product: Product;

}
