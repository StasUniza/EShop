/* src/Pages/UsersPage/UsersPage.jsx */

import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/userService';
import './UsersPage.css';

function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Načítanie používateľov pri načítaní stránky
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Chyba pri načítavaní používateľov:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="users-page">
            <h1>Zoznam používateľov</h1>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meno</th>
                        <th>Email</th>
                        <th>Telefón</th>
                        <th>Rola</th>
                        <th>Aktívny</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{`${user.first_name} ${user.last_name}`}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_number || '-'}</td>
                            <td>{user.role_id}</td>
                            <td>{user.is_active ? 'Áno' : 'Nie'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;
