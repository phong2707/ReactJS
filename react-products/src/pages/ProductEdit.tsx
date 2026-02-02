import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts, updateProduct } from "../features/products/productThunk";
import ProductForm from "../components/ProductForm";
import { useEffect } from "react";

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector((state) => state.products.items);

  // 🔹 load data nếu chưa có
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = items.find((p) => p.id === Number(id));

  // 🔹 chờ data
  if (!product) return <p>Loading...</p>;

  return (
    <ProductForm
      defaultValue={product}
      onSubmit={(data) => {
        dispatch(updateProduct({ id: product.id, data }))
  .unwrap()
  .then(() => navigate("/products"));

      }}
    />
  );
}
