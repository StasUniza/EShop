// src/Pages/HomePage/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './HomePage.css';
import heroImage from '../../Assets/Images/Dance_pozadie_pc.png';
import imagePc from '../../Assets/Images/Dance_pozadie_pc.png';
import imageMobile from '../../Assets/Images/Dance_pozadie.png';
import categoryShoes from '../../Assets/Images/dance_shoes.png';
import categoryClothing from '../../Assets/Images/dance_dress.png';
import categoryAccessories from '../../Assets/Images/dance_shoe_brush.png';

function HomePage() {
  return (
    <div className="homepage">
   
      <div className="jumbotron text-center">
        
      <div className="d-none d-md-block">
                    <img src={imagePc} alt="Tanečný obrázok pre desktop" className="img-fluid homepage-img" />
                </div>

                
                <div className="d-block d-md-none">
                    <img src={imageMobile} alt="Tanečný obrázok pre mobil" className="img-fluid homepage-img" />
                </div>
      
        
      </div>

      <div className="container categories text-center  my-5">
        <h2>Kategórie</h2>
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
            <Link to="/products?category=shoes" className="text-decoration-none">
              <div className="card category-card">
                <img src={categoryShoes} className="card-img-top" alt="Topánky" />
                <div className="card-body">
                  <h5 className="card-title">Topánky</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
            <Link to="/products?category=clothing" className="text-decoration-none">
              <div className="card category-card">
                <img src={categoryClothing} className="card-img-top" alt="Oblečenie" />
                <div className="card-body">
                  <h5 className="card-title">Oblečenie</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
            <Link to="/products?category=accessories" className="text-decoration-none">
              <div className="card category-card">
                <img src={categoryAccessories} className="card-img-top" alt="Doplnky" />
                <div className="card-body">
                  <h5 className="card-title">Doplnky</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

     
      <div className="container popular-products text-center my-5">
        <h2>Populárne produkty</h2>
        <div className="row justify-content-center">
         
          <div className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
            <div className="card product-card">
              <p>Produkt 1</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
            <div className="card product-card">
              <p>Produkt 2</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-6 my-3">
            <div className="card product-card">
              <p>Produkt 3</p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="container-fluid about-us text-white text-center py-5">
        <h2>O nás</h2>
        <p className="mx-auto w-75">
          Dance Shop je váš spoľahlivý partner pre všetko, čo potrebujete na tanečný parket. Ponúkame široký výber produktov pre začiatočníkov aj profesionálov.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
