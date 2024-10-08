import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    console.log(newDot);
    setList((prev) => [...prev, newDot]);
  };
  const handleUndo = (event) => {
    event.stopPropagation();

    if (list.length === 0) {
      return;
    }

    const lastItens = list[list.length - 1];
    setUndid((prev) => [...prev, lastItens]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };
  const handleRedo = (event) => {
    event.stopPropagation();
    const recoveredDot = undid[undid.length - 1];
    if (undid.length === 0) {
      return;
    }

    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredDot]);
  };

  return (
    <>
      <div id="fundo" onClick={handleClick}>
        <button onClick={handleUndo}>Desfazer</button>
        <button onClick={handleRedo}>Refazer</button>
        {list.map((item) => (
          <span
            className="dot"
            style={{ left: item.clientX, top: item.clientY }}
          ></span>
        ))}
      </div>
    </>
  );
}

export default App;
