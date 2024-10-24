import React from 'react';

function LoginPage() {
    return (
        <div className="container">
            <h1>Prihlásenie</h1>
            <form className="login-form">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="vas@email.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Heslo</label>
                    <input type="password" className="form-control" id="password" placeholder="Heslo" />
                </div>
                <button type="submit" className="btn btn-primary">Prihlásiť sa</button>
            </form>
            <p className="mt-3">Nemáte účet? <a href="/register">Zaregistrujte sa</a></p>
        </div>
    );
}

export default LoginPage;


 