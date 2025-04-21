"use client";

import { useState } from 'react';

export default function signIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            // Redirect logic can be added here if needed
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {error && <p>{error}</p>}
            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}
