// src/Redux/ProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    editProduct(state, action) {
      const { id, name, price } = action.payload;
      const productToUpdate = state.products.find(product => product.id === id);
      if (productToUpdate) {
        productToUpdate.name = name;
        productToUpdate.price = price;
      }
    },
    deleteProduct(state, action) {
      const id = action.payload;
      state.products = state.products.filter(product => product.id !== id);
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export const selectProducts = state => state.product.products;
export default productSlice.reducer;
