import { createSlice } from "@reduxjs/toolkit"
import type { Panel } from "../types/PanelType";

const panelState: Panel = {
    products: [],
    total: 0
}

const PanelSlice = createSlice({
    name: 'panel',
    initialState: panelState,
    reducers: {
        updateProductList(state, action) {
            state.products = action.payload;
            state.total = action.payload.length;
        },
        increaseProductQuantity(state, action) {
            const product = state.products.find(p => p.productId === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        decreaseProductQuantity(state, action) {
            const product = state.products.find(p => p.productId === action.payload);
            if (product && product.quantity>0) {
                product.quantity -= 1;
            }
        },
        setQuantityZero(state, action) {
            const product = state.products.find(p => p.productId === action.payload);
            if(product) product.quantity = 0;
        }
    }
})

export const { updateProductList, increaseProductQuantity, decreaseProductQuantity, setQuantityZero } = PanelSlice.actions;
export default PanelSlice.reducer;