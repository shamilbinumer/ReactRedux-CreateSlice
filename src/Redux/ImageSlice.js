// src/Redux/ImageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    addImage(state, action) {
      state.images.push(action.payload);
    },
    deleteImage(state, action) {
      const id = action.payload;
      state.images = state.images.filter(image => image.id !== id);
    },
  },
});

export const { addImage, deleteImage } = imageSlice.actions;
export const selectImages = state => state.image.images;
export default imageSlice.reducer;
