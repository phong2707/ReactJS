import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { searchLocal } from "../features/products/productSlice";

import {
  fetchProducts,
} from "../features/products/productThunk";
import { Link } from "react-router-dom";

export default function ProductList() {
  const items = useAppSelector((state) => state.products.items);


const dispatch = useAppDispatch();
const [keyword, setKeyword] = useState("");

useEffect(() => {
  if (items.length === 0) {
    dispatch(fetchProducts());
  }
}, []);

useEffect(() => {
  dispatch(searchLocal(keyword));
}, [keyword]);



  return (
    <div className="product-list">
  <div className="header">
    <h2>Product List</h2>
    <Link to="/products/new">➕ Thêm sản phẩm</Link>
  </div>

  <input
    className="search"
    placeholder="Search product..."
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
  />

  {items.length === 0 && <p>Không có sản phẩm</p>}

  {items.map((p) => (
    <div key={p.id} className="product-item">
      <img src={p.thumbnail} />

      <div className="product-info">
        <h4>{p.title}</h4>
        <p>💲 {p.price}</p>
        <p>⭐ {p.rating}</p>

        <div className="product-actions">
          <Link to={`/products/${p.id}/edit`}>Sửa</Link>
          <Link to={`/products/${p.id}/delete`}>Xóa</Link>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

