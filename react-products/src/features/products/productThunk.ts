import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./productTypes";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products;
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (data: { title: string; price: number }) => {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  }
);
    // export const searchProducts = createAsyncThunk(
    // "products/search",
    // async (keyword: string) => {
    //     if (!keyword) {
    //     const res = await fetch("https://dummyjson.com/products");
    //     const data = await res.json();
    //     return data.products;
    //     }

    //     const res = await fetch(
    //     `https://dummyjson.com/products/search?q=${keyword}`
    //     );
    //     const data = await res.json();
    //     return data.products;
    // }
    // );



export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    const res = await axios.put(
      `https://dummyjson.com/products/${id}`,
      data
    );
    return res.data;
  }
);



export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    return id;
  }
);
