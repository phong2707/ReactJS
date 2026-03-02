import { createContext, useReducer, useContext, type ReactNode, useMemo } from 'react';
import { cartReducer, initialState } from './cartReducer';
import type { Product } from './types';

interface CartContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]; // Bạn có thể định nghĩa kỹ hơn là CartItem[]
  totalQuantity: number;
  totalPrice: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 1. Tính tổng tiền tự động mỗi khi state.items thay đổi
  const totalPrice = useMemo(() => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [state.items]);

  // 2. Các hàm bổ trợ (Helpers)
  const addToCart = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increaseQuantity = (id: number) => dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  const decreaseQuantity = (id: number) => dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ 
      ...state, 
      totalPrice, 
      addToCart, 
      removeFromCart, 
      increaseQuantity, 
      decreaseQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
// Custom Hook để sử dụng Context an toàn trong TS
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart phải được dùng trong CartProvider');
  return context;
};

