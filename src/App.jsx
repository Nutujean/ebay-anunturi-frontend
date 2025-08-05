function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Bine ai venit pe Ebay Anunțuri!</h1>
      <nav>
        <a href="/anunturi" style={navButtonStyle}>Vezi Anunțuri</a>
        <a href="/adauga" style={navButtonStyle}>Adaugă Anunț</a>
        <a href="/login" style={navButtonStyle}>Autentificare</a>
      </nav>
    </div>
  );
}

const navButtonStyle = {
  display: 'inline-block',
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
};

export default App;
