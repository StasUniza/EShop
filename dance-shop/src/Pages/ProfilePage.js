import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/profileService';
import './ProfilePage.css';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal'); 
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Moje objednávky (ak chceš zobraziť na tej istej stránke)
  // const [orders, setOrders] = useState([]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getProfile();
        setFormData({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          phone_number: user.phone_number || '',
        });
        // Voliteľne načítať objednávky
        // const userOrders = await getUserOrders();
        // setOrders(userOrders);

        setLoading(false);
      } catch (error) {
        console.error('Chyba pri načítavaní profilu:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setMessage('');
  };

  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setMessage('Údaje boli úspešne upravené.');
    } catch (error) {
      console.error('Chyba pri úprave profilu:', error);
      setMessage('Nastala chyba pri úprave údajov.');
    }
  };

  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    
    setMessage('Heslo bolo úspešne zmenené.');
  };

  if (loading) {
    return <div className="container text-white">Načítavam profil...</div>;
  }

  return (
    <div className="container mt-4 profile-page">
      <h1 className="text-white">Môj profil</h1>
      {message && <div className="alert alert-info">{message}</div>}

      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => handleTabChange('personal')}
          >
            Osobné údaje
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => handleTabChange('password')}
          >
            Zmena hesla
          </button>
        </li>
        {/* Ak chceš objednávky na rovnakej stránke */}
        {/* 
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            Moje objednávky
          </button>
        </li>
        */}
      </ul>

      {activeTab === 'personal' && (
        <div className="tab-content text-white">
          <h3>Osobné údaje</h3>
          <form onSubmit={handleProfileSave} className="profile-form-dark">
            <div className="mb-3">
              <label className="form-label">Meno</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Priezvisko</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tel. číslo</label>
              <input
                type="text"
                className="form-control"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleProfileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Uložiť</button>
          </form>
        </div>
      )}

      {activeTab === 'password' && (
        <div className="tab-content text-white">
          <h3>Zmena hesla</h3>
          <form onSubmit={handlePasswordSave} className="profile-form-dark">
            <div className="mb-3">
              <label className="form-label">Staré heslo</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nové heslo</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Potvrdenie nového hesla</label>
              <input
                type="password"
                className="form-control"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Zmeniť heslo</button>
          </form>
        </div>
      )}

      {/* 
      {activeTab === 'orders' && (
        <div className="tab-content text-white">
          <h3>Moje objednávky</h3>
          {orders.map(...)}
        </div>
      )}
      */}
    </div>
  );
}

export default ProfilePage;
