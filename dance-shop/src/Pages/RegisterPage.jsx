import React from 'react';

function RegisterPage() {
    return (
        <div className="container">
            <h1>Registrácia</h1>
            <form className="register-form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Meno</label>
                    <input type="text" className="form-control" id="name" placeholder="Vaše meno" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="vas@email.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Heslo</label>
                    <input type="password" className="form-control" id="password" placeholder="Heslo" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Potvrďte heslo</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Potvrďte heslo" />
                </div>
                <button type="submit" className="btn btn-primary">Zaregistrovať sa</button>
            </form>
            <p className="mt-3">Máte účet? <a href="/login">Prihláste sa</a></p>
        </div>
    );
}

export default RegisterPage;



