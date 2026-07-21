export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function proficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

const SIZE_MULTIPLIERS: Record<string, number> = {
  tiny: 0.5,
  small: 1,
  medium: 1,
  large: 2,
  huge: 4,
  gargantuan: 8,
};

export function sizeMultiplier(size: string): number {
  return SIZE_MULTIPLIERS[size.trim().toLowerCase()] ?? 1;
}

export interface CarryingCapacity {
  encumbered: number;
  heavilyEncumbered: number;
  maxCarrying: number;
  pushDragLift: number;
}

export function carryingCapacity(strength: number, size: string): CarryingCapacity {
  const mult = sizeMultiplier(size);
  return {
    encumbered: Math.floor(strength * 5 * mult),
    heavilyEncumbered: Math.floor(strength * 10 * mult),
    maxCarrying: Math.floor(strength * 15 * mult),
    pushDragLift: Math.floor(strength * 30 * mult),
  };
}

export function passivePerception(perceptionBonus: number): number {
  return 10 + perceptionBonus;
}
