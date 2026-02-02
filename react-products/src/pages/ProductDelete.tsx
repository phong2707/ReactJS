import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../features/products/productThunk";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProductDelete() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  return (
    <div>
      <p>Bạn có chắc muốn xóa sản phẩm?</p>
      <button
        onClick={() => {
          dispatch(deleteProduct(Number(id)));
          navigate("/products");
        }}
      >
        Xóa
      </button>
    </div>
  );
}
