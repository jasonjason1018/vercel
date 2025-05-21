'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    clearCookies()
  }, []); 

  const clearCookies = async () => {
    await fetch('/api/cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    
    const response = await res.json();
    
    if (response.success) {
      window.location.href = '/dashboard';
    } else {
      setUsername('');
      setPassword('');
      alert('帳號或密碼錯了');
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}
