// app/signup/page.tsx
"use client"; // Marcar o componente como Client Component

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css'; // Verifique se este caminho está correto

const SignupPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSignup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        // Aqui você pode adicionar a lógica de cadastro
        console.log('Cadastro:', username, password);
    };

    return (
        <div className={styles.container}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSignup} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Usuário:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Cadastrar</button>
                <button type="button" onClick={() => router.push('/login')} className={styles.button}>Voltar ao Login</button>
            </form>
        </div>
    );
};

export default SignupPage;
