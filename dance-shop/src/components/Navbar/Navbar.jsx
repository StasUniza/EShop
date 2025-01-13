import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/Images/logo.png';
import { getUserInfo, logoutUser } from '../../services/authService';

function Navbar() {
    const userInfo = getUserInfo();

    const handleLogout = () => {
        logoutUser();
        window.location.href = '/login'; 
    };

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
                    aria-label="Toggle navigation"
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
                            <Link className="dropdown-item" to="/products">
                                 Hľadať          
                            </Link>
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

                        {userInfo?.roleId === 1 && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="adminDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Admin
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/admin/products">
                                            Pridať Produkty
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/users">
                                            Použivatelia
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}

                        {!userInfo && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="profileDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Profil
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/login">
                                            Prihlasenie
                                        </Link>
                                    </li>
                                    <li>
                                    <Link className="dropdown-item" to="/register">
                                            Registracia
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}  


                        {userInfo && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="profileDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Profil
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            Údaje
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            Odhlásiť sa
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}

                        

                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/cart">
                                <i className="bi bi-cart" style={{ fontSize: '1.5rem' }}></i>
                                
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
