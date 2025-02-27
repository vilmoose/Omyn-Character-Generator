import "./App.css";
import React from "react";
import CharacterGenerator from "./CharacterGenerator";
import Sidebars from "./Sidebars";

function App() {
  return (
    <div className="App">
      <table>
        <tr>
          <td className="App-side">
          </td>
          <td className="App-middle">
            <CharacterGenerator />
          </td>
          <td className="App-side">
            <Sidebars />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
