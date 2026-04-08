import React, { useState } from "react";
import Table from "./Table";
import Form from "./form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const newCharacters = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(newCharacters);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
