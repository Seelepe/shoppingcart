import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './index.css';
import App from './App';
import Home from './Compomnent/Home';
import Index from './Compomnent/Member/Index';
import Blog from './Compomnent/Blog/Blog';
import BlogDetail from './Compomnent/Blog/BlogDetail';
import Account from './Compomnent/Account/Account';
import Myproducts from './Compomnent/Account/MyProducts';
import Addnew from './Compomnent/Account/Addnew';
import EditProduct from './Compomnent/Account/EditProduct';
import ProductDetail from './Compomnent/ProductDetail';

import reportWebVitals from './reportWebVitals';
import Cart from './Compomnent/Cart';
import { Provider } from 'react-redux';
import store from './store';

// const Main = () =>(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Index />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<BlogDetail />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/Account/Myproducts' element={<Myproducts />} />
          <Route path='/Account/Addnew' element={<Addnew />} />
          <Route path='/Account/Myproducts/EditProduct/:id' element={<EditProduct />} />
          <Route path='/Product-Detail/:id' element={<ProductDetail />} />
          
          

        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
