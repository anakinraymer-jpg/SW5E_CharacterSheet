import { Suspense, lazy, useEffect, useState } from "react";
import type { Character } from "./types";
import { createBlankCharacter } from "./types";
import {
  loadAllCharacters,
  saveCharacter,
  deleteCharacter,
  importCharactersFromFile,
  restoreCharacters,
} from "./storage";
import CharacterList from "./components/CharacterList";
import ThemeToggle from "./components/ThemeToggle";
import { applyUpdate, isUpdateReady, onUpdateReady } from "./serviceWorker";
import "./App.css";

// The sheet and its data catalogs are most of the app's size, so the character list shows first
// and the sheet loads in the background right after (phones open the list much faster).
const loadSheet = () => import("./components/CharacterSheet");
const CharacterSheet = lazy(loadSheet);

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  const [updateReady, setUpdateReady] = useState(isUpdateReady);
  useEffect(() => onUpdateReady(() => setUpdateReady(isUpdateReady())), []);

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
    let incoming: Character[];
    try {
      incoming = await importCharactersFromFile(file);
    } catch {
      alert("Could not read that file as a character JSON export or backup.");
      return;
    }
    const { saved, skipped } = restoreCharacters(incoming);
    refresh();
    if (incoming.length > 1 || skipped.length) {
      alert(
        `Imported ${saved} character${saved === 1 ? "" : "s"}.` +
          (skipped.length ? `\nKept the newer copy already on this device: ${skipped.join(", ")}.` : "")
      );
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
      {updateReady && (
        <div className="update-banner" role="status">
          <span>A new version of the sheet is ready.</span>
          <button className="btn btn-primary btn-small" onClick={applyUpdate}>
            Update now
          </button>
        </div>
      )}
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
