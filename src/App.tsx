import { useEffect, useState } from "react";
import type { Character } from "./types";
import { createBlankCharacter } from "./types";
import {
  loadAllCharacters,
  saveCharacter,
  deleteCharacter,
  importCharacterFromFile,
} from "./storage";
import CharacterList from "./components/CharacterList";
import CharacterSheet from "./components/CharacterSheet";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setCharacters(loadAllCharacters());
  }, []);

  function refresh() {
    setCharacters(loadAllCharacters());
  }

  function handleCreate() {
    const blank = createBlankCharacter();
    saveCharacter(blank);
    refresh();
    setOpenId(blank.id);
  }

  function handleDelete(id: string) {
    deleteCharacter(id);
    refresh();
  }

  async function handleImport(file: File) {
    try {
      const character = await importCharacterFromFile(file);
      saveCharacter(character);
      refresh();
    } catch {
      alert("Could not read that file as a character JSON export.");
    }
  }

  function handleBack() {
    refresh();
    setOpenId(null);
  }

  const openCharacter = characters.find((c) => c.id === openId) ?? null;

  if (openCharacter) {
    return <CharacterSheet initial={openCharacter} onBack={handleBack} />;
  }

  return (
    <CharacterList
      characters={characters}
      onOpen={setOpenId}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onImport={handleImport}
    />
  );
}

export default App;
