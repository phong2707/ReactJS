import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productThunk";
import { searchLocal } from "../features/products/productSlice";

export default function ProductList() {
  const { items, loading } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(searchLocal(keyword));
  }, [keyword]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-list">
  <div className="header">
    <h2 className="title">Product List</h2>
    <Link to="/products/new">➕ Thêm sản phẩm</Link>
  </div>

  <input
    className="search"
    placeholder="Search product..."
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
  />

  <div className="product-grid">
    {items.map(p => (
      <div key={p.id} className="product-card">
        <span className="product-badge">HOT</span>

        <img src={p.thumbnail} alt={p.title} />

        <div className="product-card-body">
          <h4>{p.title}</h4>

          <div className="product-price">${p.price}</div>
          <div className="product-rating">⭐ {p.rating}</div>

          <div className="product-actions">
            <Link to={`/products/${p.id}/edit`}>Sửa</Link>
            <Link to={`/products/${p.id}/delete`}>Xóa</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
