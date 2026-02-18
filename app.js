import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <h1>React 88 – Multiple useEffect</h1>

      <div className="card">
        <h2>Counter</h2>
        <p>{count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>

      <div className="card">
        <h2>User (fetched once)</h2>
        {user ? <p>{user.name}</p> : <p>Loading...</p>}
      </div>

      <div className="card">
        <h2>Window width</h2>
        <p>{width}px</p>
      </div>
    </div>
  );
}
