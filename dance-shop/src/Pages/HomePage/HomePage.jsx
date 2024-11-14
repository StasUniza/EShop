import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import desktopImage from '../../Assets/Images/Dance_pozadie_pc.png'
import mobileImage from '../../Assets/Images/Dance_pozadie.png'
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="homepage-container">


        
                {/* Obrázok pre desktop - zobrazí sa len na väčších obrazovkách */}
                <div className="d-none d-md-block">
                    <img src={desktopImage} alt="Tanečný obrázok pre desktop" className="img-fluid homepage-img" />
                </div>

                {/* Obrázok pre mobilné zariadenia - zobrazí sa len na menších obrazovkách */}
                <div className="d-block d-md-none">
                    <img src={mobileImage} alt="Tanečný obrázok pre mobil" className="img-fluid homepage-img" />
                </div>



        <div className="container mt-5">
            
            

           

            
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


