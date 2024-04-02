

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Redux/UserSlice';
import productReducer from './Redux/ProductSlice';
import App from './App';
import imageReducer from './Redux/ImageSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    image: imageReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
);
