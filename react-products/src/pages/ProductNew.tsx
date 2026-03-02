import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addProductLocal } from "../features/products/productSlice";
import ProductForm from "../components/ProductForm";

export default function ProductNew() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ProductForm
      onSubmit={data => {
        dispatch(addProductLocal(data));
        navigate("/products");
      }}
    />
  );
}
