import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductNew from "./pages/ProductNew";
import ProductEdit from "./pages/ProductEdit";
import ProductDelete from "./pages/ProductDelete";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductNew />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/products/:id/delete" element={<ProductDelete />} />
      </Routes>
    </BrowserRouter>
  );
}
