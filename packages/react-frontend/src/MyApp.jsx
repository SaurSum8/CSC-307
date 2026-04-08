import React from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = React.useState([
    {
      name: "Charlie",
      job: "Janitor",
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
  ]);

  function removeOneCharacter(index) {
    const newCharacters = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(newCharacters);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  );
}

export default MyApp;
