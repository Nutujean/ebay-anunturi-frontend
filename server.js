// Ștergere anunț
app.delete("/api/anunturi/:id", autentificare, async (req, res) => {
  try {
    const anunt = await Anunt.findById(req.params.id);

    if (!anunt) {
      return res.status(404).json({ message: "Anunțul nu există" });
    }

    // Verifică dacă userul care șterge este același cu cel care a creat anunțul
    if (anunt.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Nu ai voie să ștergi acest anunț" });
    }

    await anunt.deleteOne();
    res.json({ message: "Anunț șters cu succes" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Eroare la ștergere anunț" });
  }
});
// ✅ Detalii anunț după ID
app.get("/api/anunturi/:id", async (req, res) => {
  try {
    const anunt = await Anunt.findById(req.params.id);
    if (!anunt) return res.status(404).json({ mesaj: "Anunț inexistent" });
    res.json(anunt);
  } catch (err) {
    res.status(500).json({ mesaj: "Eroare la preluarea anunțului" });
  }
});

