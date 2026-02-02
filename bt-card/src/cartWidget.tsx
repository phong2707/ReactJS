import { useCart } from "./CartContext";

export const CartWidget = () => {
  const { totalQuantity } = useCart();
  return (
    <div style={{ padding: '10px', background: '#2c3e50', color: 'white' }}>
      🛒 Giỏ hàng: <strong>{totalQuantity}</strong> món
    </div>
  );
};