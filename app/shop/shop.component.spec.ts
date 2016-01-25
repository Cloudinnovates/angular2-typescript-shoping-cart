import {ShopComponent} from './shop.component';
describe('Shop Component ',() => {



  describe('Filtering ',() => {
    let shopComponent :ShopComponent;
    beforeEach(function() {

      shopComponent = new ShopComponent(undefined,undefined,undefined);
      shopComponent.products = [
        {
          "id": 1,
          "description": "iPhone 6 16Gb",
          "price": 500,
          "stockQuantity": 10
        },
        {
          "id": 2,
          "description": "Nexus",
          "price": 600,
          "stockQuantity": 5
        }];
    });

    it('Testing filtering mechanism with one hit', () => {

          shopComponent.filterVal="iPhone";

          shopComponent.filter()

          expect(shopComponent.visibleProducts.length).toEqual(1);

    });

    it('Testing filtering mechanism with one hit with case insensitive', () => {

          shopComponent.filterVal="IPHONE";

          shopComponent.filter()

          expect(shopComponent.visibleProducts.length).toEqual(1);

    });

    it('Testing filtering mechanism with empty filter value ', () => {

          shopComponent.filterVal=""; // empty string

          shopComponent.filter()

          expect(shopComponent.visibleProducts.length).toEqual(2);

    });



})

describe("asdasd", () => {

  let shopComponent :ShopComponent;
  beforeEach(function() {

    shopComponent = new ShopComponent(undefined,undefined,undefined);
    shopComponent.products = [
      {
        "id": 1,
        "description": "iPhone 6 16Gb",
        "price": 500,
        "stockQuantity": 10
      },
      {
        "id": 2,
        "description": "Nexus",
        "price": 600,
        "stockQuantity": 5
      }];
  });

  it('Testing that its ok to to add a item when stock is not exeeded ', () => {


      let entry = {
          "quantity":1,
          "product":{
              "id":0,
              "stockQuantity":5,
              "price":10,
              "description":"lorem lipsum"
          }
      };
      expect(shopComponent.checkIfCapacityIsExeeded(entry)).toBe(true);

  });

  it('Testing that its ok to to add a undefined item', () => {


      let entry = undefined;
      expect(shopComponent.checkIfCapacityIsExeeded(entry)).toBe(true);

  });


  it('Testing that its not ok to add a item with exeeded stock value', () => {


    let entry = {
            "quantity":6, // observe!!
            "product":{
                "id":0,
                "stockQuantity":5,
                "price":10,
                "description":"lorem lipsum"
            }
        };;
      expect(shopComponent.checkIfCapacityIsExeeded(entry)).toBe(false);

  });
});


})
