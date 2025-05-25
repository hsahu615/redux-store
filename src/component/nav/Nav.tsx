import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../../slice/CartSlice'


const Nav = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className='nav-container'>
        <div className='nav-logo'>
            <h2 className='text-white'>STORE</h2>
        </div>
        <div className='nav-links'>
            <div className="cart-icon-container">
                <span className='cart-btn' onClick={() => dispatch(toggleCart())}>
                  <FontAwesomeIcon icon={faShoppingCart} size={'2x'}/>
                </span>
                {cart.totalProducts > 0 && (
                    <span className="cart-count">{cart.totalProducts}</span>
                )}
            </div>
        </div> 
    </div>
  )
}

export default Nav