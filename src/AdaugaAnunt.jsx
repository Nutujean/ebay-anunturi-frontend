import React, { useState } from "react";

const AdaugaAnunt = () => {
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
    if (imagine) {
      formData.append("imagine", imagine);
    }

    try {
      const response = await fetch("http://localhost:5000/api/anunturi", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMesaj("Anunț adăugat cu succes!");
        setTitlu("");
        setDescriere("");
        setPret("");
        setCategorie("");
        setImagine(null);
      } else {
        setMesaj("Eroare la adăugare anunț");
      }
    } catch (err) {
      console.error(err);
      setMesaj("Eroare de rețea");
    }
  };

  return (
    <div>
      <h2>Adaugă Anunț</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titlu"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
        />
        <textarea
          placeholder="Descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preț"
          value={pret}
          onChange={(e) => setPret(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImagine(e.target.files[0])}
        />
        <button type="submit">Adaugă</button>
      </form>
      {mesaj && <p>{mesaj}</p>}
    </div>
  );
};

export default AdaugaAnunt;
