import './App.css'
import Nav from './component/nav/Nav'
import ShoppingPanel from './component/shopping-panel/ShoppingPanel'
import Cart from './component/cart/Cart'

function App() {

  return (
      <div style={{position: 'relative'}}>
        <div><Nav /></div>
        <div><ShoppingPanel/></div>
        <Cart />
      </div>
  )
}

export default App
