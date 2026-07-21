import type { Character } from "../types";

interface Props {
  character: Character;
}

export default function ClassFeaturesSection({ character }: Props) {
  if (!character.classTraitsText && !character.archetypeTraitsText) return null;

  return (
    <section className="sheet-section class-features-section">
      <h2>Class Features</h2>
      <p className="section-hint">
        Features unlocked by your class and archetype at your current level. Level up to reveal
        more.
      </p>

      {character.classTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Features</div>
          {character.classTraitsText.split("\n\n").map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
        </div>
      )}

      {character.archetypeTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.archetypeAppliedName} Features</div>
          {character.archetypeTraitsText.split("\n\n").map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
