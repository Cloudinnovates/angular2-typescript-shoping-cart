import {Component} from 'angular2/core';
import {Product} from './product';
import {ProductDetailComponent} from './hero-detail.component';
import {ProductService} from './product.service';
import {OnInit} from 'angular2/core';


/**
* Lists all items in the inventory
*/
@Component({
    selector: 'my-app',
    styleUrls: ["app/app.css"],
    templateUrl: "app/app.html",
    directives: [ProductDetailComponent],
    providers: [ProductService]
})
export class AppComponent implements OnInit {
    public title = 'PhoneMart';
    public selectedProduct: Product;
    public products: Product[];

    /**
    * Dependecy injection of the service. Why not using anotations instead?
    */
    constructor(private _productService: ProductService) {

    }

    onSelect(product: Product) {

      console.log(product);
      this.selectedProduct = product;

    }
    /**
    * Retrives the list of heros with an Promise. This is not really neaded. But its
    * good practice to not let the Component know how we fetch the information.
    *
    * The data might be fetched from an API, or local storage ( current impl )
    *
    */
    getProducts() {

      this._productService.getProducts().then(products => this.products = products);

    }

    /**
    * Avoiding fetching data in the constructor makes our code more testable. The solution is to use
    * the onInit provided by angular.
    **/
    ngOnInit() {

      this.getProducts();

    }

}
