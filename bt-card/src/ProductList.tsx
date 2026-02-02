import { useCart } from "./CartContext";
import type { Product } from "./types";

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Bàn phím cơ', price: 50 },
  { id: 2, name: 'Chuột Gaming', price: 30 },
];

export const ProductList = () => {
  const { addToCart } = useCart();
  return (
    <div className="product-grid">
      {MOCK_PRODUCTS.map(p => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <button className="btn-add" onClick={() => addToCart(p)}>Thêm vào giỏ</button>
        </div>
      ))}
    </div>
  );
};