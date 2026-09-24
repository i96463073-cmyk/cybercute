import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>CyberCute</h1>
        <p>Digital Services Platform</p>
      </header>

      <main>
        <section className="card">
          <h2>Welcome to CyberCute</h2>

          <p>
            Your website is successfully running with React and Vite.
          </p>

          <button onClick={() => setCount((count) => count + 1)}>
            Test Button: {count}
          </button>
        </section>

        <section className="status">
          <p>✅ React working</p>
          <p>✅ Vite working</p>
          <p>☁️ Ready for Cloudflare Pages</p>
        </section>
      </main>
    </div>
  );
}

export default App;
