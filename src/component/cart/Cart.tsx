import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart } from '../../slice/CartSlice';
import { setQuantityZero } from '../../slice/PanelSlice';
import Payment from '../payment/Payment';

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    alert('Payment successful! Thank you for your purchase.');
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  return (
    <div className='sidebar-container d-flex flex-column justify-content-between' style={{transform: cart.isOpen ? 'translateX(0)' : 'translateX(33vw)'}}>
      {cart.products.length === 0 ? <p className='text-center cart-empty-msg mt-3'>Cart is Empty</p> : 
        <div className='cart-product-container'>
        {cart.products.map((pd: any) => (
            <div className='cart-product my-2 p-2 row mx-0 justify-content-between align-items-center'>
              <div className='col-3 h-100 p-0 overflow-hidden'><img src={pd.image} className='p-0' style={{height: 'auto', width: '100%'}} /></div>
              <div className='col-4 cart-product-title'>{pd.title}</div>
              <div className='col-1'>{pd.quantity}</div>
              <div className='col-3'>{pd.quantity*pd.price} $</div>
              <div className='col-1'>
                  <span className='cursor-pointer' onClick={() => {
                    dispatch(removeFromCart(pd.productId));
                    dispatch(setQuantityZero(pd.productId));
                  }}><FontAwesomeIcon icon={faTrash} size={'1x'}/>
                  </span>
                </div>
          </div>
        ))}
      </div>
      }
      <div className='cart-footer d-flex justify-content-between'>
        <div className='text-end cart-total p-3'>
          Total: {cart.cartTotal} $
        </div>
          <div className='p-3'>
            <Payment 
              amount={cart.cartTotal} 
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
      </div>
    </div>
  )
}

export default Cart