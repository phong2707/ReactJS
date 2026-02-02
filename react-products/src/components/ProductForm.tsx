import { useState } from "react";
import type { Product } from "../features/products/productTypes";

type Props = {
  defaultValue?: Product;
  onSubmit: (data: Product) => void;
};

export default function ProductForm({ defaultValue, onSubmit }: Props) {
  const [title, setTitle] = useState(defaultValue?.title ?? "");
  const [price, setPrice] = useState(defaultValue?.price ?? 0);
  const [thumbnail, setThumbnail] = useState(defaultValue?.thumbnail ?? "");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          id: defaultValue?.id ?? Date.now(),
          title,
          price,
          thumbnail,
          rating: 0,
        });
      }}
    >
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" value={price} onChange={e => setPrice(e.target.valueAsNumber)} />
      <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} />

      {thumbnail && <img src={thumbnail} width={120} />}
      <button>Lưu</button>
    </form>
  );
}
