// src/Pages/UsersPage/UsersPage.jsx

import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './UsersPage.css';


function UsersPage() {
    const [users, setUsers] = useState([]); 
    const [newUser, setNewUser] = useState({  
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        role_id: '2',
    });
    const [editingUser, setEditingUser] = useState(null); 
    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    
    useEffect(() => {
        fetchUsers(); 

      
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


      
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Chyba pri načítavaní používateľov:', error);
            }
        };
    
       
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setNewUser({ ...newUser, [name]: value });
        };
    
     
        const validateForm = () => {
            const { first_name, last_name, email, password, role_id } = newUser;
            if (!first_name || !last_name || !email || !role_id) {
                setErrorMessage('Všetky povinné polia musia byť vyplnené.');
                return false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setErrorMessage('Neplatný formát emailu.');
                return false;
            }
            if (!editingUser && password.length < 6) {
                setErrorMessage('Heslo musí mať minimálne 6 znakov.');
                return false;
            }
            return true;
        };

          
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateForm()) return;

        try {
            await createUser(newUser);
            alert('Používateľ bol úspešne vytvorený.');
            setNewUser({ 
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                phone_number: '',
            });
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Došlo k neočakávanej chybe.');
            }
            console.error('Chyba pri vytváraní používateľa:', error);
        }
    };

    
    const handleEditUser = (user) => {
        setEditingUser(user); 
        setShowForm(true); 
        setNewUser({ 
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '',
            phone_number: user.phone_number,
            role_id: user.role_id,
        });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        if (!validateForm()) return;

        try {
            await updateUser(editingUser.user_id, newUser);
            alert('Používateľ bol úspešne aktualizovaný.');
            setEditingUser(null);
            setShowForm(false);
            fetchUsers(); 
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); 
            } else {
                setErrorMessage('Došlo k neočakávanej chybe.');
            }
            console.error('Chyba pri aktualizácii používateľa:', error);
        }
    };

    
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Naozaj chcete vymazať tohto používateľa?')) {
            try {
                await deleteUser(userId);
                alert('Používateľ bol úspešne vymazaný.');
                fetchUsers(); 
            } catch (error) {
                console.error('Chyba pri vymazávaní používateľa:', error);
            }
        }
    };


    const toggleForm = () => {
        if (showForm) {
            setNewUser({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                phone_number: '',
            });
            setEditingUser(null);
        }
        setShowForm(!showForm);
    };

    return (
        <div className="container mt-5 users">
            <h1 className="text-center mb-4 title">Používatelia</h1>
            
           
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            
            <button className="btn btn-primary mb-3" onClick={toggleForm}>
                {showForm ? 'Zatvoriť formulár' : 'Pridať používateľa'}
            </button>

            
            {showForm && (
                <form
                    onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                    className="row g-3 mb-4"
                >
                    <div className="col-md-6">
                        <label htmlFor="first_name" className="form-label">
                            Meno
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            value={newUser.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label">
                            Priezvisko
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            value={newUser.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {!editingUser && (
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                                Heslo
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={newUser.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    )}
                    <div className="col-md-6">
                        <label htmlFor="phone_number" className="form-label">
                            Telefónne číslo
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone_number"
                            name="phone_number"
                            value={newUser.phone_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-6">
    <label htmlFor="role_id" className="form-label">Rola</label>
    <select
        id="role_id"
        name="role_id"
        className="form-control"
        value={newUser.role_id || ''}
        onChange={handleInputChange}
        required
    >
        <option value="">Vyberte rolu</option>
        <option value="1">Admin</option>
        <option value="2">User</option>
    </select>
</div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success">
                            {editingUser ? 'Aktualizovať' : 'Uložiť'}
                        </button>
                    </div>
                </form>
            )}

            
            {isMobile ? (
                <div className="row">
                    {users.map((user) => (
                        <div key={user.user_id} className="col-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {user.first_name} {user.last_name}
                                    </h5>
                                    <p className="card-text">
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-modify me-2"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            Upraviť
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(user.user_id)}
                                        >
                                            Vymazať
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="table table-striped table-responsive">
                    <thead className="table-dark">
                        <tr>
                            <th>Rola</th>
                            <th>Meno</th>
                            <th>Email</th>
                            <th>Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                               <td>{user.role_name}</td>
                                <td>
                                    {user.first_name} {user.last_name}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="btn btn-modify me-2"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Upraviť
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(user.user_id)}
                                    >
                                        Vymazať
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UsersPage;
