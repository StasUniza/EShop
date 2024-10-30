import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import backround from '../components/Images/Dance_pozadie.png'
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="homepage-container">
        <div className="container mt-5">
            
            <div className="jumbotron jumbotron-custom text-center  p-4 ">
                <h1>Vitajte v našom tanečnom e-shope!</h1>
                <p>Najlepšie tanečné topánky, šaty a doplnky na jednom mieste.</p>

                <Link to="/products">
                    <button className="btn btn-primary nakup-teraz-buttom">Nakupovať teraz</button>
                </Link>
                
            </div>

            <div className="text-center my-5">
                <img src={backround} alt="Tanečný obrázok" className="img-fluid homepage-img" />
            </div>

            
            <div className="benefits mt-5 text-center ">
                <h2>Prečo nakupovať u nás?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <i className="bi bi-truck"></i>
                        <h4>Rýchle doručenie</h4>
                        <p>Doručenie do 2 pracovných dní priamo k vám domov.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-shield-check"></i>
                        <h4>Záruka spokojnosti</h4>
                        <p>Vrátanie tovaru do 30 dní bez otázok.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-star"></i>
                        <h4>Najlepšia kvalita</h4>
                        <p>Naše produkty sú testované a zaručené najlepšej kvality.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default HomePage;


