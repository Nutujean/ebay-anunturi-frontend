import React, { useState } from "react";

function AdaugaAnunt() {
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imagine, setImagine] = useState(null);
  const [mesaj, setMesaj] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    formData.append("imagine", imagine);

    try {
      const token = localStorage.getItem("token");
      const raspuns = await fetch("https://ebay-anunturi-backend-1.onrender.com/api/anunturi", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (raspuns.ok) {
        setMesaj("Anunț adăugat!");
      } else {
        setMesaj("Eroare la adăugare.");
      }
    } catch (err) {
      setMesaj("Eroare rețea.");
    }
  };

  return (
    <div>
      <h2>Adaugă anunț</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Titlu" onChange={(e) => setTitlu(e.target.value)} />
        <input type="text" placeholder="Descriere" onChange={(e) => setDescriere(e.target.value)} />
        <input type="number" placeholder="Preț" onChange={(e) => setPret(e.target.value)} />
        <input type="text" placeholder="Categorie" onChange={(e) => setCategorie(e.target.value)} />
        <input type="file" onChange={(e) => setImagine(e.target.files[0])} />
        <button type="submit">Adaugă</button>
      </form>
      <p>{mesaj}</p>
    </div>
  );
}

export default AdaugaAnunt;
