import CharactersList from './components/CharactersList';
import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>Personajes de Rick & Morty</h1>
      </header>
      <section className="app__content">
        <CharactersList />
      </section>
    </main>
  );
}

export default App;
