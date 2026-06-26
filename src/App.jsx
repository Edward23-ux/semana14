import PostsList from './components/PostsList';
import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>Pipeline CI/CD &mdash; Demo React + Alova</h1>
        <p>
          Esta app consume <code>jsonplaceholder.typicode.com</code> usando{' '}
          <strong>Alova</strong> para demostrar build, tests y despliegue simulado.
        </p>
      </header>
      <section className="app__content">
        <h2>Últimas publicaciones</h2>
        <PostsList />
      </section>
    </main>
  );
}

export default App;
