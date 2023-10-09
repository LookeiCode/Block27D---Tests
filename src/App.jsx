import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button data-testid="testBtn" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <input
        data-testid="testInput" 
        value={value} 
        onChange={ev => setValue (ev.target.value)}
        />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
