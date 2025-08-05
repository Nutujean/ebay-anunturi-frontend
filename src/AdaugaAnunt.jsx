import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdaugaAnunt() {
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const anuntNou = { titlu, descriere, pret: Number(pret) };

    try {
      const res = await fetch(`${API_URL}/api/anunturi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anuntNou),
      });

      if (res.ok) {
        navigate("/anunturi");
      } else {
        alert("Eroare la adăugarea anunțului!");
      }
    } catch (err) {
      console.error("Eroare rețea:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Adaugă Anunț Nou</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Titlu"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Preț (RON)"
          value={pret}
          onChange={(e) => setPret(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Adaugă
        </button>
      </form>
    </div>
  );
}
