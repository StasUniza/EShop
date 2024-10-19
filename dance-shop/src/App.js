import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductsPage from './Pages/ProductsPage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Navbar from './components/Navbar/Navbar'; 
import './App.css';

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
