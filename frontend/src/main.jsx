import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CartPage from './pages/CartPage.jsx'
import SigninPage from './pages/SigninPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import ShippingPage from './pages/ShippingPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import PrivatePage from './pages/PrivatePage.jsx'
import PlaceOrderPage from './pages/PlaceOrderPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>   {/* parent */}
          <Route path='' element={<HomePage />}></Route>   {/* childrens */}
          <Route path='/signin' element={<SigninPage />}></Route>  
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/product/:id' element={<ProductPage />}></Route>
          <Route path='' element= {<PrivatePage />}>
          <Route path='/shipping' element={<ShippingPage/>}></Route>
          <Route path='/payment' element={<PaymentPage/>}></Route>
          <Route path='/place-order' element={<PlaceOrderPage/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
          <Route path="/order/:id" element={<OrderPage/>}/>
          <Route path='/cart' element={<CartPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
