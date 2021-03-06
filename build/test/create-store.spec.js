import { createStore } from '../src';
describe('Create Store', () => {
    it('should create a store and have an initial state', done => {
        var store = createStore((state, action) => { }, 'Hello World');
        store.getState(state => {
            expect(state).toBe('Hello World');
            done();
        });
    });
    it('should increment state by 1', done => {
        var store = createStore((state, action) => {
            switch (action.type) {
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        }, 0);
        store.subscribe(state => {
            expect(state).toBe(1);
            done();
        });
        store.dispatch({ type: 'INCREMENT' });
    });
    it('should unsubscribe from store', () => {
        var store = createStore((state, action) => {
            return state;
        });
        var subscription = store.subscribe(state => { });
        subscription.unsubScribe();
    });
    it('should destory the store', () => {
        var store = createStore((state, action) => {
            return state;
        });
        var subscription = store.subscribe(state => { });
        store.destroy();
    });
});
//# sourceMappingURL=create-store.spec.js.map