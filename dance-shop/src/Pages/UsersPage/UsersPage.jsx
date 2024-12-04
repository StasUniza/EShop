// src/Pages/UsersPage/UsersPage.jsx

import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../../services/userService';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
    });
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
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
        const { first_name, last_name, email, password } = newUser;
        if (!first_name || !last_name || !email) {
            alert('Všetky povinné polia musia byť vyplnené.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Neplatný formát emailu.');
            return false;
        }
        if (!editingUser && password.length < 6) {
            alert('Heslo musí mať minimálne 6 znakov.');
            return false;
        }
        return true;
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
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
            console.error('Chyba pri vytváraní používateľa:', error);
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

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
        setNewUser({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '',
            phone_number: user.phone_number,
        });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await updateUser(editingUser.user_id, newUser);
            alert('Používateľ bol úspešne aktualizovaný.');
            setEditingUser(null);
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            console.error('Chyba pri aktualizácii používateľa:', error);
        }
    };


/////generovane AI
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Stav pre mobilné zobrazenie

    useEffect(() => {
        fetchUsers();

        // Event listener na sledovanie veľkosti obrazovky
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
////

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Používatelia</h1>
            <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
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
                    <div className="col-12">
                        <button type="submit" className="btn btn-success">
                            {editingUser ? 'Aktualizovať' : 'Uložiť'}
                        </button>
                    </div>
                </form>
            )}

{isMobile ? (
    // Mobilné zobrazenie (karty)
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
                        <p className="card-text">
                            <strong>ID:</strong> {user.user_id}
                        </p>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-warning me-2"
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
                        <th>ID</th>
                        <th>Meno</th>
                        <th>Email</th>
                        <th>Akcie</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>
                                {user.first_name} {user.last_name}
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
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
