import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactPage/ContactPage.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: '', 
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const { first_name, last_name, email, password, confirmPassword, phone_number } = formData;

        // 
        if (!first_name || !last_name || !email || !password || !confirmPassword) {
            setErrorMessage('Vyplňte všetky povinné polia.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Heslá sa nezhodujú.');
            return;
        }

        try {
            await axios.post('/api/auth/register', {
                first_name,
                last_name,
                email,
                password,
                phone_number: phone_number || null, 
            });
            alert('Registrácia bola úspešná.');
            navigate('/login'); 
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Došlo k chybe pri registrácii.'
            );
        }
    };

    return (
        <div className="container hlavnyKontainer">
            <h1>Registrácia</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Meno</label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        placeholder="Vaše meno"
                        value={formData.first_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Priezvisko</label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        placeholder="Vaše priezvisko"
                        value={formData.last_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="vas@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Heslo</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Heslo"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Potvrďte heslo</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Potvrďte heslo"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Telefónne číslo (nepovinné)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        placeholder="Telefónne číslo"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Zaregistrovať sa</button>
            </form>
            <p className="mt-3">Máte účet? <a href="/login">Prihláste sa</a></p>
        </div>
    );
}

export default RegisterPage;
