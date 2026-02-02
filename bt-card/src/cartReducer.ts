/* eslint-disable prefer-const */
// cartReducer.ts
import type { CartState, CartAction } from './types';

export const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let updatedItems = [...state.items];

      if (existingItemIndex > -1) {
        const updatedItem = {
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      return {
        items: updatedItems,
        totalQuantity: state.totalQuantity + 1,
      };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        items: state.items.filter(item => item.id !== action.payload),
        totalQuantity: state.totalQuantity - itemToRemove.quantity,
      };
    }
    case 'INCREASE_QUANTITY':
        return {
            ...state,
            items: state.items.map(item =>
            item.id === action.payload 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
            totalQuantity: state.totalQuantity + 1
        };

    case 'DECREASE_QUANTITY':
    return {
        ...state,
        items: state.items.map(item =>
        item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        // Chỉ giảm tổng số lượng nếu số lượng item đó đang lớn hơn 1
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        totalQuantity: state.items.find(i => i.id === action.payload)?.quantity! > 1 
        ? state.totalQuantity - 1 
        : state.totalQuantity
    };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};