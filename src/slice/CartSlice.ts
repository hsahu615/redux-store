import { createSlice } from "@reduxjs/toolkit"
import type { ProductType } from "../types/ProductType";
import type { CartType } from "../types/CartType";

const initialState: CartType = {
    isOpen: false,
    totalProducts: 0,
    products: [],
    cartTotal: 0
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart (state) {
            state.isOpen = !state.isOpen
        },
        updateCart: {
            prepare(title, description, price, quantity, productId, image) {
                return {
                    payload: {title, description, price, quantity, productId, image},
                    meta: undefined,
                    error: undefined
                }
            },
            reducer (state, action) {
                const product: ProductType = action.payload;
                const productInTheCart = state.products.find((pd) => pd.productId === product.productId);
                
                if(!productInTheCart && product.quantity > 0){
                    state.products.push(product);
                    state.totalProducts = state.totalProducts + 1;
                    state.cartTotal = state.cartTotal + (product.price * product.quantity);
                } else if(productInTheCart) {
                    const oldTotal = productInTheCart.quantity * productInTheCart.price;
                    const newTotal = product.quantity * product.price;
                    const difference = newTotal - oldTotal;
                    
                    if(product.quantity === 0) {
                        state.products = state.products.filter((pd) => pd.productId !== product.productId);
                        state.totalProducts = state.products.length;
                        state.cartTotal = Math.max(0, state.cartTotal - oldTotal);
                    } else {
                        productInTheCart.description = product.description;
                        productInTheCart.productId = product.productId;
                        productInTheCart.title = product.title;
                        productInTheCart.image = product.image;
                        productInTheCart.quantity = product.quantity;
                        productInTheCart.price = product.price;
                        state.cartTotal = Math.max(0, state.cartTotal + difference);
                    }
                }
            }
        },
        removeFromCart (state, action) {
            const product = state.products.find((pd) => pd.productId === action.payload);
            state.products = state.products.filter((pd) => pd.productId !== action.payload);
            state.totalProducts = state.products.length;
            if(product) state.cartTotal = state.cartTotal - product.quantity * product.price;
        }
    }
})

export const {toggleCart, updateCart, removeFromCart} = CartSlice.actions;
export default CartSlice.reducer