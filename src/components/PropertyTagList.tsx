import type { LegendEntry } from "../data/legend";
import { findPropertyDefinition, splitPropertyTokens } from "../propertyLegend";
import HoverInfo from "./HoverInfo";

interface Props {
  property: string;
  definitions: LegendEntry[];
}

// Renders a catalog property string (e.g. "Finesse, Returning, Thrown (range 30/90)") as a row of
// small tags, each hoverable for its full rules text when a matching Legend definition exists.
export default function PropertyTagList({ property, definitions }: Props) {
  if (!property) return null;
  const tokens = splitPropertyTokens(property);
  return (
    <span className="property-tag-list">
      {tokens.map((token, i) => {
        const def = findPropertyDefinition(token, definitions);
        return def ? (
          <HoverInfo key={i} title={def.name} lines={[def.description]}>
            <span className="property-tag">{token}</span>
          </HoverInfo>
        ) : (
          <span key={i} className="property-tag">
            {token}
          </span>
        );
      })}
    </span>
  );
}
