import { useEffect } from 'react'
import './ShoppingPanel.css'
import { decreaseProductQuantity, increaseProductQuantity, updateProductList } from '../../slice/PanelSlice'
import type { ProductType } from '../../types/ProductType'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../../slice/CartSlice'

const ShoppingPanel = () => {

  const productList = useSelector((state: any) => state.panel.products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      const productsRes = data.slice(0, 20);
      const finalProductList: ProductType[] = []
      productsRes.map((pd: any) => {
        const product: ProductType = {
          description: pd.description,
          productId: pd.id,
          title: pd.title,
          price: pd.price,
          image: pd.images[0],
          quantity: 0
        };
        finalProductList.push(product);
      })
      dispatch(updateProductList(finalProductList));
    }
    getData();
  }, [])

  const updateQuantityOfProduct = (number: number, product: ProductType) => {
    if(number<0) {
      dispatch(decreaseProductQuantity(product.productId));
      dispatch(updateCart(product.title, product.description, product.price, product.quantity<=1 ? 0 : product.quantity - 1, product.productId, product.image));
    } else {
      dispatch(increaseProductQuantity(product.productId));
      dispatch(updateCart(product.title, product.description, product.price, product.quantity + 1, product.productId, product.image));
    }
  } 

  return (
    <div className='shopping-panel'>
      <div className='product-container'>
        {productList.map((product: any) => (
          <div className='product d-flex flex-column align-items-center'>
            <div style={{height: '32vh', overflowY: 'hidden'}} className='w-100'><img className='w-100 d-block h-auto' key={product.id} src={product.image} /></div>
            <div className='product-title'><h4>{product.title}</h4></div>
            <div className='d-flex justify-content-between w-100'>
              <span className='product-price'>{product.price} $</span>
              <span className='product-quantity'>
                <button className='me-3 border-0 bg-transparent' onClick={() => updateQuantityOfProduct(-1, product)}>-</button>
                  {product.quantity}
                <button className='ms-3 border-0 bg-transparent' onClick={() => updateQuantityOfProduct(1, product)}>+</button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShoppingPanel