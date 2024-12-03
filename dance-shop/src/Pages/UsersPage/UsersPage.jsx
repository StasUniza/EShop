// src/Pages/UsersPage/UsersPage.jsx

import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../../services/userService';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        role_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
    });
    const [editingUser, setEditingUser] = useState(null); // Na úpravu používateľa
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

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await createUser(newUser);
            alert('Používateľ bol úspešne vytvorený.');
            setNewUser({
                role_id: '',
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
            alert('Chyba pri vytváraní používateľa.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Naozaj chcete vymazať tohto používateľa?')) {
            try {
                await deleteUser(userId);
                alert('Používateľ bol úspešne vymazaný.');
                fetchUsers(); // Obnovíme zoznam používateľov
            } catch (error) {
                console.error('Chyba pri vymazávaní používateľa:', error);
                alert('Chyba pri vymazávaní používateľa.');
            }
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
        setNewUser({
            role_id: user.role_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '', // Heslo sa nemodifikuje, zostáva prázdne
            phone_number: user.phone_number,
        });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await updateUser(editingUser.user_id, newUser);
            alert('Používateľ bol úspešne aktualizovaný.');
            setEditingUser(null);
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            console.error('Chyba pri aktualizácii používateľa:', error);
            alert('Chyba pri aktualizácii používateľa.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Používatelia</h1>
            <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Zatvoriť formulár' : 'Pridať používateľa'}
            </button>
            {showForm && (
                <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="role_id" className="form-label">
                            Rola
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="role_id"
                            name="role_id"
                            value={newUser.role_id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                        <div className="mb-3">
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
                    <div className="mb-3">
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
                    <button type="submit" className="btn btn-success">
                        {editingUser ? 'Aktualizovať' : 'Uložiť'}
                    </button>
                </form>
            )}
            <table className="table table-bordered table-hover">
                <thead>
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
        </div>
    );
}

export default UsersPage;
