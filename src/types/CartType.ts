import type { ProductType } from "./ProductType"

export type CartType = {
    isOpen: boolean,
    totalProducts: number,
    products: ProductType[],
    cartTotal: number
}