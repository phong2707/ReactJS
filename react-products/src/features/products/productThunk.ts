import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./productTypes";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products;
  }
);
