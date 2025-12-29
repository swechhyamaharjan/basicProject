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
import AdminRoute from './components/AdminRoute.jsx'
import OrderListPage from './pages/Admin/OrderListPage.jsx'
import ProductListPage from './pages/Admin/ProductListPage.jsx'
import UserListPage from './pages/Admin/UserListPage.jsx'
import ProductEditPage from './pages/Admin/ProductEditPage.jsx'
import UserEditPage from './pages/Admin/UserEditPage.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* User side */}
        <Route path='/' element={<App />}>   {/* parent */}
          <Route path='' element={<HomePage />}></Route>   {/* childrens */}
          <Route path='signin' element={<SigninPage />}></Route>  
          <Route path='register' element={<RegisterPage />}></Route>
          <Route path='product/:id' element={<ProductPage />}></Route>
          <Route path='' element= {<PrivatePage />}>
          <Route path='shipping' element={<ShippingPage/>}></Route>
          <Route path='payment' element={<PaymentPage/>}></Route>
          <Route path='place-order' element={<PlaceOrderPage/>}></Route>
          <Route path='profile' element={<ProfilePage/>}></Route>
          <Route path="order/:id" element={<OrderPage/>}/>
          <Route path='cart' element={<CartPage />}></Route>
          </Route>
          {/* Admin side */}
          <Route path='/' element={<AdminRoute/>}>
           <Route path='admin/orders' element={<OrderListPage/>}></Route>
           <Route path='admin/products' element={<ProductListPage/>}></Route>
           <Route path='admin/users' element={<UserListPage/>}></Route>
           <Route path='admin/product/:id/edit' element={<ProductEditPage/>}></Route>
           <Route path='admin/user/:id/edit' element={<UserEditPage/>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
