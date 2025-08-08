import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdaugaAnunt() {
  const navigate = useNavigate();
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imagine, setImagine] = useState(null);
  const [eroare, setEroare] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setEroare("Trebuie să fii autentificat pentru a adăuga un anunț.");
      return;
    }

    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    formData.append("imagine", imagine);

    try {
      const response = await fetch("https://ebay-anunturi-backend-1.onrender.com/api/anunturi", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mesaj || "Eroare la adăugarea anunțului");
      }

      navigate("/anunturile-mele");
    } catch (err) {
      setEroare(err.message);
    }
  };

  return (
    <div className="adauga-anunt">
      <h2>Adaugă Anunț</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Titlu"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          required
        />
        <textarea
          placeholder="Descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preț (lei)"
          value={pret}
          onChange={(e) => setPret(e.target.value)}
          required
        />
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        >
          <option value="">Alege categorie</option>
          <option value="Electronice">Electronice</option>
          <option value="Auto">Auto</option>
          <option value="Imobiliare">Imobiliare</option>
          <option value="Haine">Haine</option>
          <option value="Altele">Altele</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagine(e.target.files[0])}
          required
        />
        <button type="submit">Publică anunț</button>
      </form>
      {eroare && <p style={{ color: "red" }}>{eroare}</p>}
    </div>
  );
}

export default AdaugaAnunt;
