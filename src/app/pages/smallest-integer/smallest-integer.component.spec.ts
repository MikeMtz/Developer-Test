import { SmallestIntegerComponent } from './smallest-integer.component';

describe('SmallestIntegerComponent', () => {
    let component: SmallestIntegerComponent;

    beforeEach(() => {
        component = new SmallestIntegerComponent();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should return 5 for [1, 6, 3, 4, 2, 1]', () => {
        const result = component.smallestMissingInt([1, 6, 3, 4, 2, 1]);
        expect(result).toBe(5);
    });

    it('should return 6 for [1, 2, 3, 4, 5]', () => {
        const result = component.smallestMissingInt([1, 2, 3, 4, 5]);
        expect(result).toBe(6);
    });

    it('should return 1 for [-1, -6, 4]', () => {
        const result = component.smallestMissingInt([-1, -6, 4]);
        expect(result).toBe(1);
    });

    it('should return 1 for an empty array', () => {
        const result = component.smallestMissingInt([]);
        expect(result).toBe(1);
    });

    it('should return 1 for [0]', () => {
        const result = component.smallestMissingInt([0]);
        expect(result).toBe(1);
    });

    it('should return 2 for [1]', () => {
        const result = component.smallestMissingInt([1]);
        expect(result).toBe(2);
    });

    it('should return 3 for [1, 2, 2]', () => {
        const result = component.smallestMissingInt([1, 2, 2]);
        expect(result).toBe(3);
    });

    it('should return 1 for [-5, -2, -3]', () => {
        const result = component.smallestMissingInt([-5, -2, -3]);
        expect(result).toBe(1);
    });

    it('should return 4 for [1, 2, 3]', () => {
        const result = component.smallestMissingInt([1, 2, 3]);
        expect(result).toBe(4);
    });

    it('should return 2 for [1, 3, 4, 5]', () => {
        const result = component.smallestMissingInt([1, 3, 4, 5]);
        expect(result).toBe(2);
    });
});
