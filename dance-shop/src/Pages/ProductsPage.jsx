import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import danceShoeBrush from '../components/Images/dance_shoe_brush.png';
import danceShoes from '../components/Images/dance_shoes.png';
import danceDress from '../components/Images/dance_dress.png';

const products = [
    {
        id: 1,
        name: "Tanečné topánky",
        category: "Obuv",
        price: "50 EUR",
        image: danceShoes
    },
    {
        id: 2,
        name: "Tanečné šaty",
        category: "Oblečenie",
        price: "80 EUR",
        image: danceDress
    },
    {
        id: 3,
        name: "Kefa na topánky",
        category: "Výbava",
        price: "20 EUR",
        image: danceShoeBrush
    }
];

function ProductsPage() {
    return (
        <div className="container mt-5">
            <h1>Naše Produkty</h1>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card h-100">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.category}</p>
                                <p className="card-text"><strong>{product.price}</strong></p>
                                <button className="btn btn-primary">Kúpiť teraz</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
