import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "../slice/PanelSlice";
import cartReducer from "../slice/CartSlice"

const store = configureStore({
    reducer: {
        panel: panelReducer,
        cart: cartReducer
    }
})

export default store;