import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditeazaAnunt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imagine, setImagine] = useState(null);
  const [eroare, setEroare] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const incarcaAnunt = async () => {
      try {
        const response = await fetch(`https://ebay-anunturi-backend-1.onrender.com/api/anunturi/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Eroare la încărcarea anunțului.");

        const data = await response.json();
        setTitlu(data.titlu);
        setDescriere(data.descriere);
        setPret(data.pret);
        setCategorie(data.categorie);
      } catch (err) {
        setEroare(err.message);
      }
    };

    incarcaAnunt();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    if (imagine) {
      formData.append("imagine", imagine);
    }

    try {
      const response = await fetch(`https://ebay-anunturi-backend-1.onrender.com/api/anunturi/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Eroare la actualizarea anunțului.");

      navigate("/anunturile-mele");
    } catch (err) {
      setEroare(err.message);
    }
  };

  return (
    <div className="editeaza-anunt">
      <h2>Editează Anunț</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          required
        />
        <textarea
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          required
        />
        <input
          type="number"
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
        />
        <button type="submit">Salvează modificările</button>
      </form>
      {eroare && <p style={{ color: "red" }}>{eroare}</p>}
    </div>
  );
}

export default EditeazaAnunt;
