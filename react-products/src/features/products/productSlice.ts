import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./productTypes";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  
} from "./productThunk";

interface ProductState {
  items: Product[];     // data đang hiển thị
  allItems: Product[];  // data gốc
  loading: boolean;
}


const initialState: ProductState = {
  items: [],
  allItems: [],
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchLocal: (state, action) => {
      const keyword = action.payload.toLowerCase();

      if (!keyword) {
        state.items = state.allItems;
      } else {
        state.items = state.allItems.filter((p) =>
          p.title.toLowerCase().includes(keyword)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.allItems = action.payload;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.allItems.unshift(action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const update = (list: Product[]) => {
          const i = list.findIndex(p => p.id === action.payload.id);
          if (i !== -1) {
            list[i] = { ...list[i], ...action.payload };
          }
        };

        update(state.items);
        update(state.allItems);
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        state.allItems = state.allItems.filter(p => p.id !== action.payload);
      });
  },
});

export const { searchLocal } = productSlice.actions;
export default productSlice.reducer;

