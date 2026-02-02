// CartPage.tsx
import { useCart } from './CartContext';

export const CartPage = () => {
  const { items, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-container">

      <table className="cart-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td><strong>{item.name}</strong></td>
              <td>${item.price}</td>
              <td>
                <button className="btn-qty" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span style={{ margin: '0 15px' }}>{item.quantity}</span>
                <button className="btn-qty" onClick={() => increaseQuantity(item.id)}>+</button>
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="cart-summary">
        <h3>Tổng tiền: <span style={{ color: '#00b894', fontSize: '1.5em' }}>${totalPrice}</span></h3>
        <button className="btn-clear" onClick={clearCart}>Xóa tất cả</button>
      </div>
    </div>
  );
};