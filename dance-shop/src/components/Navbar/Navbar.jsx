// src/components/Navbar/Navbar.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/Images/logo.png'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
      <div className="container-fluid">
       
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Dance Shop Logo" className="logo-img" />
          <span className="ms-2">Dance Shop</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Prepínač navigácie"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

     
        <div className="collapse navbar-collapse" id="navbarContent">
         
          <form className="d-flex flex-column flex-lg-row mx-auto my-2 my-lg-0">
            <input
              className="form-control w-100 w-lg-auto me-2"
              type="search"
              placeholder="Hľadať produkty"
              aria-label="Hľadať"
            />
            <button className="btn btn-search mt-2 mt-lg-0" type="submit">
              Hľadať
            </button>
          </form>

       
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Produkty
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Kontakt
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Použivatelia
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="bi bi-cart" style={{ fontSize: '1.5rem' }}></i>
                
                <span className="badge bg-gold position-absolute top-0 start-100 translate-middle">
                  100
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;