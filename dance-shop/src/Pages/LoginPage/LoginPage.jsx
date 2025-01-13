import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../ContactPage/ContactPage.css';

function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await loginUser(credentials);
            alert('Prihlásenie úspešné.');
            navigate('/products');
            window.location.reload(); 
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Došlo k chybe pri prihlasovaní.'
            );
        }

        
    };

    return (
        <div className="container hlavnyKontainer">
            <h1>Prihlásenie</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="vas@email.com"
                        value={credentials.email}
                        onChange={handleInputChange}
                        required
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
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Prihlásiť sa</button>
            </form>
            <p className="mt-3">Nemáte účet? <a href="/register">Zaregistrujte sa</a></p>
        </div>
    );
}

export default LoginPage;
