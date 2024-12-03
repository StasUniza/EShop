/* src/Pages/AddUserForm.jsx */
import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    role_id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      console.log('Používateľ úspešne pridaný:', response.data);
      alert('Používateľ úspešne pridaný!');
    } catch (error) {
      console.error('Chyba pri pridávaní používateľa:', error.message);
      alert('Nepodarilo sa pridať používateľa.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>Pridanie používateľa</h2>
      <input
        type="text"
        name="role_id"
        placeholder="Role ID"
        value={formData.role_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="first_name"
        placeholder="Meno"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Priezvisko"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Heslo"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Telefón"
        value={formData.phone_number}
        onChange={handleChange}
      />
      <button type="submit">Pridať</button>
    </form>
  );
};

export default AddUserForm;
