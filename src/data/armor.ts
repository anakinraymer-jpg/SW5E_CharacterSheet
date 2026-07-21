// PHB armor & shields reference data, sourced from sw5e.com.

export interface ArmorCatalogEntry {
  name: string;
  type: string;
  property: string;
  cost: number;
  weight: number;
  ac: string;
  stealth: string;
}

export const ARMOR_CATALOG: ArmorCatalogEntry[] = [
  { name: "Assault Armor", type: "Heavy", property: "Bulky, Strength 15", cost: 2000, weight: 60, ac: "17", stealth: "Disadvantage" },
  { name: "Battle Armor", type: "Heavy", property: "Bulky, Strength 13", cost: 750, weight: 55, ac: "16", stealth: "Disadvantage" },
  { name: "Combat Suit", type: "Light", property: "", cost: 100, weight: 10, ac: "11 + Dex modifier", stealth: "-" },
  { name: "Composite Armor", type: "Medium", property: "Bulky", cost: 2500, weight: 45, ac: "15 + Dex modifier (max 2)", stealth: "Disadvantage" },
  { name: "Fiber Armor", type: "Light", property: "", cost: 450, weight: 13, ac: "12 + Dex modifier", stealth: "-" },
  { name: "Heavy Exoskeleton", type: "Heavy", property: "Bulky, Strength 17", cost: 9000, weight: 65, ac: "18", stealth: "Disadvantage" },
  { name: "Heavy Physical Shield", type: "Shield", property: "Obtrusive, Strength 15", cost: 500, weight: 36, ac: "+3", stealth: "-" },
  { name: "Heavy Shield Generator", type: "Shield", property: "", cost: 1250, weight: 12, ac: "+3", stealth: "-" },
  { name: "Light Physical Shield", type: "Shield", property: "", cost: 50, weight: 0, ac: "+1", stealth: "-" },
  { name: "Light Shield Generator", type: "Shield", property: "", cost: 125, weight: 0, ac: "+1", stealth: "-" },
  { name: "Medium Physical Shield", type: "Shield", property: "Strength 13", cost: 150, weight: 18, ac: "+2", stealth: "-" },
  { name: "Medium Shield Generator", type: "Shield", property: "", cost: 375, weight: 0, ac: "+2", stealth: "-" },
  { name: "Mesh Armor", type: "Medium", property: "", cost: 500, weight: 20, ac: "13 + Dex modifier (max 2)", stealth: "-" },
  { name: "Weave Armor", type: "Medium", property: "", cost: 1000, weight: 25, ac: "14 + Dex modifier (max 2)", stealth: "-" },
];
