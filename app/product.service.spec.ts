import {Product} from './product';
import {ProductService} from './product.service';
describe('Product Service ',() => {


    it('check that getProducts really returns products"', () => {
          let productService = new ProductService();

          spyOn(productService, 'getProducts').and.callThrough();

          productService.getProducts().then((resut:Product[]) => {
              expect(resut).not.toBeUndefined();
          });

          expect(productService.getProducts).toHaveBeenCalled();

    });

})
