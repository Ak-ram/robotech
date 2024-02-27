import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../type";

interface StoreState {
  productData: ProductType[];
  userInfo: null | string;
  orderData: ProductType[];
  favoriteData: ProductType[];
  compareData: ProductType[];
}

const initialState: StoreState = {
  productData: [],
  userInfo: null,
  orderData: [],
  favoriteData: [],
  compareData: [],
};

export const proSlice = createSlice({
  name: "pro",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductType) => item?.id === action.payload.id && item?.title === action.payload.title
      );

      console.log('exist',action.payload)
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductType) => item?.id === action.payload.id && item?.title === action.payload.title
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductType) => item?.id === action.payload.id && item?.title === action.payload.title
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => {
          return !(item.id === action.payload.id && item.title === action.payload.title)
        }
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    addToFavorite: (state, action) => {
      const existingProduct = state.favoriteData.find(
        (item: ProductType) => item?.id === action.payload.id && item?.title === action.payload.title
      );
      if (existingProduct) {
        state.favoriteData = state.favoriteData.filter(
          (item) => !(item.id === action.payload.id && item.title === action.payload.title)
        );
      } else {
        state.favoriteData.push(action.payload);
      }
    },

    deleteFavorite: (state, action) => {
      state.favoriteData = state.favoriteData.filter(
        (item) => !(item.id === action.payload.id && item.title === action.payload.title)
      );
    },
    resetFavorite: (state) => {
      state.favoriteData = [];
    },
    addToCompare: (state, action) => {
      const existingProduct = state.compareData.find(
        (item: ProductType) => item?.id === action.payload.id && item?.title === action.payload.title
      );
      if (existingProduct) {
        state.compareData = state.compareData.filter(
          (item) => !(item.id === action.payload.id && item.title === action.payload.title)
        );
      } else {
        state.compareData.push(action.payload);
      }
    },
    
    deleteCompare: (state, action) => {
      state.compareData = state.compareData.filter(
        (item) => !(item.id === action.payload.id && item.title === action.payload.title)
      );
    },
    resetCompare: (state) => {
      state.compareData = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
    addOrder: (state, action) => {
      const existingOrder = state.orderData.find(
        (item: ProductType) => item.id === action.payload.id
      );
      if (existingOrder) {
        state.orderData.push(action.payload);
      } else {
        state.orderData = action.payload;
      }
    },
    resetOrder: (state) => {
      state.orderData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  deleteUser,
  addOrder,
  resetOrder,
  addToFavorite,
  addToCompare,
  deleteFavorite,
  deleteCompare,
  resetFavorite,
  resetCompare,
} = proSlice.actions;
export default proSlice.reducer;
