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

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>   {/* parent */}
          <Route path='' element={<HomePage />}></Route>   {/* childrens */}
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/signin' element={<SigninPage />}></Route>
          <Route path='/shipping' element={<ShippingPage/>}></Route>
          <Route path='/product/:id' element={<ProductPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
