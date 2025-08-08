import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [eroare, setEroare] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEroare("");

    try {
      const raspuns = await fetch("https://ebay-anunturi-backend-1.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, parola }),
      });

      if (!raspuns.ok) {
        const data = await raspuns.json();
        throw new Error(data.mesaj || "Eroare la autentificare");
      }

      const date = await raspuns.json();
      localStorage.setItem("token", date.token);
      navigate("/anunturile-mele");
    } catch (err) {
      setEroare(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Autentificare</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parola"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
          required
        />
        <button type="submit">Autentificare</button>
        {eroare && <p style={{ color: "red" }}>{eroare}</p>}
      </form>
    </div>
  );
}

export default Login;
