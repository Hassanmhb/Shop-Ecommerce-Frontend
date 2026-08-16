import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages & Components
import Home from './pages/Home';
import ProductDetail from './components/products/ProductDetail';
import BrowseByStyle from './components/common/BrowseByStyle';
import CategoryPage from './pages/CategoryPage';
import CartPage from '/src/pages/CartPage'

function App() {
  return (
    <div>
      {/* Toast Notifications Global Layer */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Global Navbar */}

      {/* Main Routing Setup */}
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Home/>} />

        {/* Dynamic Product Detail Route */}
        <Route path="/product/:id" element={<ProductDetail/>} />



        {/* Style Route */}
        <Route path="/style" element={<BrowseByStyle/>} />
        {/* // Inside your Routes */}

<Route path="/category" element={<CategoryPage/>}></Route>

<Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;