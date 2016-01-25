import {CartComponent} from './cart.component';
describe('Testing the calcMax method in the cart ',() => {


    it('shall return the correct sum for a array containing one entry"', () => {

        let cartComponent = new CartComponent(undefined,undefined);

        cartComponent.cartEntities = [{
              "quantity":1,
              "product":{
                  "id":0,
                  "stockQuantity":5,
                  "price":10,
                  "description":"lorem lipsum"
              }
        }];


        cartComponent.calcMax();

        expect(cartComponent.totalSum).toEqual(10);

    });


    it('shall return the correct sum for a array containing 3 entries"', () => {

        let cartComponent = new CartComponent(undefined,undefined);

        cartComponent.cartEntities = [{
              "quantity":1,
              "product":{
                  "id":0,
                  "stockQuantity":5,
                  "price":10,
                  "description":"lorem lipsum"
                }
              },
              {
                  "quantity":1,
                  "product":{
                      "id":0,
                      "stockQuantity":40,
                      "price":20,
                      "description":"lorem lipsum"
                    }
              },
              {
                  "quantity":1,
                  "product":{
                      "id":0,
                      "stockQuantity":1,
                      "price":1,
                      "description":"lorem lipsum"
                      }
              }
        ];

        cartComponent.calcMax();

        expect(cartComponent.totalSum).toEqual(31);


    });


})
