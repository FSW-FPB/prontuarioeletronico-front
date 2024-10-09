// app/components/login/page.tsx
"use client"; // Marcar o componente como Client Component

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de autenticação
        console.log('Login:', username, password);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">E-mail:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup2}>
                    <label htmlFor="password">Senha: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;

