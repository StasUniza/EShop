// src/Pages/UsersPage/UsersPage.jsx

import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../../services/userService';

function UsersPage() {
    // State pre ukladanie zoznamu používateľov
    const [users, setUsers] = useState([]);

    // State pre nový používateľský formulár
    const [newUser, setNewUser] = useState({
        role_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
    });

    // State pre úpravu existujúceho používateľa
    const [editingUser, setEditingUser] = useState(null);

    // State pre zobrazenie/skrývanie formulára
    const [showForm, setShowForm] = useState(false);

    // Použitie efektu na načítanie používateľov po načítaní stránky
    useEffect(() => {
        fetchUsers();
    }, []);

    // Funkcia na získanie používateľov z backendu
    const fetchUsers = async () => {
        try {
            const data = await getUsers(); // Volanie služby na získanie používateľov
            setUsers(data); // Nastavenie používateľov do state
        } catch (error) {
            console.error('Chyba pri načítavaní používateľov:', error);
        }
    };

    // Funkcia na aktualizáciu hodnoty v formulári
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };


    // Validácia formulára
    const validateForm = () => {
        const { role_id, first_name, last_name, email, password, phone_number } = newUser;

        // Overenie povinných polí
        if (!role_id || !first_name || !last_name || !email) {
            alert('Všetky povinné polia (rola, meno, priezvisko, email) musia byť vyplnené.');
            return false;
        }

        // Overenie formátu emailu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Zadajte platnú emailovú adresu.');
            return false;
        }

        // Overenie minimálnej dĺžky hesla (pri pridávaní používateľa)
        if (!editingUser && password.length < 6) {
            alert('Heslo musí mať minimálne 6 znakov.');
            return false;
        }

        return true;
    };




    // Funkcia na vytvorenie nového používateľa
    const handleCreateUser = async (e) => {
        e.preventDefault(); // Zabránenie predvolenej akcii formulára

        // Validácia
        if (!validateForm()) {
            return;
        }


        try {
            await createUser(newUser); // Volanie služby na vytvorenie používateľa
            alert('Používateľ bol úspešne vytvorený.');
            // Resetovanie formulára
            setNewUser({
                role_id: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                phone_number: '',
            });
            setShowForm(false); // Skrytie formulára
            fetchUsers(); // Obnovenie zoznamu používateľov
        } catch (error) {
            console.error('Chyba pri vytváraní používateľa:', error);
            alert('Chyba pri vytváraní používateľa.');
        }
    };

    // Funkcia na vymazanie používateľa
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Naozaj chcete vymazať tohto používateľa?')) {
            try {
                await deleteUser(userId); // Volanie služby na vymazanie používateľa
                alert('Používateľ bol úspešne vymazaný.');
                fetchUsers(); // Obnovenie zoznamu používateľov
            } catch (error) {
                console.error('Chyba pri vymazávaní používateľa:', error);
                alert('Chyba pri vymazávaní používateľa.');
            }
        }
    };

    // Funkcia na nastavenie údajov používateľa na úpravu
    const handleEditUser = (user) => {
        setEditingUser(user); // Nastavenie používateľa na úpravu
        setShowForm(true); // Zobrazenie formulára
        setNewUser({
            role_id: user.role_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '', // Heslo sa nemodifikuje, zostáva prázdne
            phone_number: user.phone_number,
        });
    };

    // Funkcia na aktualizáciu používateľa
    const handleUpdateUser = async (e) => {
        e.preventDefault(); // Zabránenie predvolenej akcii formulára


        if (!validateForm()) {
            return;
        }

        try {
            await updateUser(editingUser.user_id, newUser); // Volanie služby na aktualizáciu používateľa
            alert('Používateľ bol úspešne aktualizovaný.');
            setEditingUser(null); // Zrušenie režimu úprav
            setShowForm(false); // Skrytie formulára
            fetchUsers(); // Obnovenie zoznamu používateľov
        } catch (error) {
            console.error('Chyba pri aktualizácii používateľa:', error);
            alert('Chyba pri aktualizácii používateľa.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Používatelia</h1>
            {/* Tlačidlo na zobrazenie/skrytie formulára */}
            <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Zatvoriť formulár' : 'Pridať používateľa'}
            </button>
            {/* Formulár na vytvorenie/úpravu používateľa */}
            {showForm && (
                <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="mb-4">
                    {/* Pole pre rolu */}
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
                    {/* Pole pre meno */}
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
                    {/* Pole pre priezvisko */}
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
                            
                        />
                    </div>
                    {/* Pole pre email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {/* Pole pre heslo - len pre nový používateľov */}
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
                    {/* Pole pre telefónne číslo */}
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
                    {/* Tlačidlo na uloženie údajov */}
                    <button type="submit" className="btn btn-success">
                        {editingUser ? 'Aktualizovať' : 'Uložiť'}
                    </button>
                </form>
            )}
            {/* Tabuľka používateľov */}
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
