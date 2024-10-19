import React from 'react';

function ContactPage() {
    return (
        <div className="container">
            <h1>Kontaktujte nás</h1>
            <p>Radi odpovieme na všetky vaše otázky a pomôžeme vám.</p>
            
            <form className="contact-form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Meno</label>
                    <input type="text" className="form-control" id="name" placeholder="Vaše meno" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="vas@email.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Správa</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Vaša správa"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Odoslať</button>
            </form>
            
            <div className="contact-info mt-5">
                <p><strong>Adresa:</strong> Prievisle 123, Slovensko</p>
                <p><strong>Telefón:</strong> +421 123 456 789</p>
                <p><strong>Email:</strong> kontakt@danceshop.sk</p>
            </div>
        </div>
    );
}

export default ContactPage;
