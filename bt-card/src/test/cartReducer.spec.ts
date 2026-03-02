import { cartReducer, initialState } from '../cartReducer';
import type { Product } from '../types';


describe('cartReducer - totalPrice logic', () => {
  it('tính tổng tiền đúng khi thêm sản phẩm', () => {
    const product1: Product = { id: 1, name: 'Bàn phím', price: 50 };
    const product2: Product = { id: 2, name: 'Chuột', price: 30 };

    let state = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: product1,
    });

    state = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: product2,
    });

    state = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: product1,
    });

    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    expect(totalPrice).toBe(130); 
  });
});
