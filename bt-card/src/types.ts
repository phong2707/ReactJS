import { initialState } from "./cartReducer";

// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

// Định nghĩa các Action cho Reducer
// types.ts
export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREASE_QUANTITY'; payload: number } // payload là ID
  | { type: 'DECREASE_QUANTITY'; payload: number } // payload là ID
  | { type: 'CLEAR_CART' };

// cartReducer.ts
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Giữ nguyên logic cũ...
      // (Hoặc đơn giản là gọi INCREASE nếu đã tồn tại)
      
    // eslint-disable-next-line no-fallthrough
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        totalQuantity: state.totalQuantity + 1
      };

    case 'DECREASE_QUANTITY':
      // eslint-disable-next-line no-case-declarations
      const itemToDecrease = state.items.find(item => item.id === action.payload);
      if (!itemToDecrease || itemToDecrease.quantity === 1) return state; // Không giảm xuống dưới 1

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        ),
        totalQuantity: state.totalQuantity - 1
      };

    case 'REMOVE_ITEM':
      // eslint-disable-next-line no-case-declarations
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        items: state.items.filter(item => item.id !== action.payload),
        totalQuantity: state.totalQuantity - (itemToRemove?.quantity || 0)
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};