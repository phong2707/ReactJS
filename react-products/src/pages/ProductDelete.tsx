import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { deleteProductLocal } from "../features/products/productSlice";

export default function ProductDelete() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="delete-page">
      <p>Bạn có chắc muốn xóa?</p>
      <button className="delete-Page-btn"
        onClick={() => {
          dispatch(deleteProductLocal(Number(id)));
          navigate("/products");
        }}
      >
        Xóa
      </button>
    </div>
  );
}
