import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productTypes";
import { fetchProducts } from "./productThunk";

interface ProductState {
  items: Product[];
  allItems: Product[];
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
    addProductLocal: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload);
      state.allItems.unshift(action.payload);
    },

    updateProductLocal: (state, action: PayloadAction<Product>) => {
      const update = (list: Product[]) => {
        const i = list.findIndex(p => p.id === action.payload.id);
        if (i !== -1) list[i] = action.payload;
      };
      update(state.items);
      update(state.allItems);
    },

    deleteProductLocal: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.allItems = state.allItems.filter(p => p.id !== action.payload);
    },

    searchLocal: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.toLowerCase();
      state.items = keyword
        ? state.allItems.filter(p =>
            p.title.toLowerCase().includes(keyword)
          )
        : state.allItems;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.allItems = action.payload;
      });
  },
});

export const {
  addProductLocal,
  updateProductLocal,
  deleteProductLocal,
  searchLocal,
} = productSlice.actions;

export default productSlice.reducer;
