import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://ebay-anunturi-backend.onrender.com"; // dacă e online, pune linkul Render aici

function App() {
  const [anunturi, setAnunturi] = useState([]);
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");

  // Încarcă lista la început
  useEffect(() => {
    fetch(`${API_URL}/api/anunturi`)
      .then((res) => res.json())
      .then((data) => setAnunturi(data))
      .catch((err) => console.error("Eroare la încărcare anunțuri:", err));
  }, []);

  // Trimite anunț nou
  const handleSubmit = async (e) => {
    e.preventDefault();

    const anuntNou = { titlu, descriere, pret: Number(pret) };

    const response = await fetch(`${API_URL}/api/anunturi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anuntNou),
    });

    if (response.ok) {
      const data = await fetch(`${API_URL}/api/anunturi`).then((res) => res.json());
      setAnunturi(data);
      setTitlu("");
      setDescriere("");
      setPret("");
    } else {
      alert("Eroare la adăugare!");
    }
  };

  return (
    <div>
      <h1>Bine ai venit pe Ebay Anunțuri!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titlu"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preț"
          value={pret}
          onChange={(e) => setPret(e.target.value)}
          required
        />
        <button type="submit">Adaugă</button>
      </form>

      <h2>Lista anunțuri</h2>
      <ul>
        {anunturi.length > 0 ? (
          anunturi.map((a) => (
            <li key={a._id}>
              <strong>{a.titlu}</strong> - {a.descriere} ({a.pret} RON)
            </li>
          ))
        ) : (
          <p>Nu există anunțuri.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
