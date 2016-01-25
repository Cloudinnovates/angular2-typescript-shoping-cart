import {SumPipe} from './sum.pipe';
describe('Testing the sum pipe ',() => {


    it('shall return the correct sum for two posetive integers"', () => {

        let sumPipe = new SumPipe();
        let transformedValue = sumPipe.transform(4,["3"]);
        expect(transformedValue).toEqual(12);

    });

})
