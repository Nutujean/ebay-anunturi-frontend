
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [mesaj, setMesaj] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://ebay-anunturi-backend-final-s2sf.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, parola })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMesaj('Autentificare reușită!');
      } else {
        setMesaj(data.mesaj || 'Eroare la autentificare');
      }
    } catch (err) {
      setMesaj('Eroare de rețea');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={parola} onChange={e => setParola(e.target.value)} placeholder="Parola" />
      <button type="submit">Autentificare</button>
      <p>{mesaj}</p>
    </form>
  );
}

export default Login;
