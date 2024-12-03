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
import UserManagement from './Pages/UsersPage/UsersPage';
import AddUserForm from './Pages/UsersPage/AddUserForm'; // Import nového komponentu







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
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/add-user" element={<AddUserForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
