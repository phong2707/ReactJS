import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProductLocal } from "../features/products/productSlice";
import ProductForm from "../components/ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useAppSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) return <p>Not found</p>;

  return (
    <ProductForm
      defaultValue={product}
      onSubmit={data => {
        dispatch(updateProductLocal(data));
        navigate("/products");
      }}
    />
  );
}
