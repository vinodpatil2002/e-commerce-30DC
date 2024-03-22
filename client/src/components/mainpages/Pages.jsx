import Login from "./login/Login"
import Register from "./login/Register"
import Product from "./products/Product"
import Cart from "./cart/Cart"
import { Route,Routes } from "react-router-dom"

export default function Pages() {
  return (
    <Routes>
      <Route  path='/' element={<Product />} />
      <Route  path='/login' element={<Login />} />
      <Route  path='/register' element={<Register />} />
      <Route  path='/cart' element={<Cart />} />
    </Routes>
  )
}
