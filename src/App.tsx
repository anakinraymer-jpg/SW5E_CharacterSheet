import { Suspense, lazy, useEffect, useState } from "react";
import type { Character } from "./types";
import { createBlankCharacter } from "./types";
import {
  loadAllCharacters,
  saveCharacter,
  deleteCharacter,
  importCharacterFromFile,
} from "./storage";
import CharacterList from "./components/CharacterList";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

// The sheet and its data catalogs are most of the app's size, so the character list shows first
// and the sheet loads in the background right after (phones open the list much faster).
const loadSheet = () => import("./components/CharacterSheet");
const CharacterSheet = lazy(loadSheet);

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setCharacters(loadAllCharacters());
    const t = setTimeout(() => void loadSheet(), 300);
    return () => clearTimeout(t);
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

  return (
    <>
      <ThemeToggle />
      {openCharacter ? (
        <Suspense fallback={<p className="section-hint" style={{ padding: 24 }}>Loading character…</p>}>
          <CharacterSheet initial={openCharacter} onBack={handleBack} />
        </Suspense>
      ) : (
        <CharacterList
          characters={characters}
          onOpen={setOpenId}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onImport={handleImport}
        />
      )}
    </>
  );
}

export default App;
