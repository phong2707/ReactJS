import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productThunk";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProductNew() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  return (
    <ProductForm
      onSubmit={(data: any) => {
        dispatch(addProduct(data));
        navigate("/products");
      }}
    />
  );
}
