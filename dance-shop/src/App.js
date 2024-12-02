import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Navbar from './components/Navbar/Navbar'; 
import './App.css';
import CartPage from './Pages/CartPage/CartPage';






function App() {
    return (
        <Router>
            <div className="App">
                <Navbar /> 
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='/register' element={<RegisterPage/>} />
                    <Route path='/cart' element={<CartPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
