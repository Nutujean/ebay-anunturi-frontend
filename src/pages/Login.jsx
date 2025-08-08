import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [mesaj, setMesaj] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const raspuns = await fetch("https://ebay-anunturi-backend-1.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, parola }),
      });

      const data = await raspuns.json();

      if (raspuns.ok) {
        localStorage.setItem("token", data.token);
        setMesaj("Autentificare reușită!");
        window.location.href = "/anunturile-mele";
      } else {
        setMesaj(data.mesaj || "Eroare la autentificare.");
      }
    } catch (err) {
      setMesaj("Eroare de rețea.");
    }
  };

  return (
    <div>
      <h2>Autentificare</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parolă"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
        />
        <button type="submit">Autentificare</button>
      </form>
      <p>{mesaj}</p>
    </div>
  );
}

export default Login;
