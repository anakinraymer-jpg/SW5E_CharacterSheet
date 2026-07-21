// PHB feats, sourced from sw5e.com.

import type { AbilityKey, FeatEntry, SpeciesTraitChoice } from "../types";
import { SKILL_LIST } from "../types";
import { GEAR_CATALOG } from "./gear";
import { LANGUAGES } from "./sw5eData";

const ALL_ABILITIES: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];
const ALL_SKILLS = [...SKILL_LIST];
const INSTRUMENTS = GEAR_CATALOG.filter((g) => g.category === "Musical Instrument").map((g) => g.name);
const TOOLS = GEAR_CATALOG.filter((g) => g.category === "Tool").map((g) => g.name);
const KITS = GEAR_CATALOG.filter((g) => g.category === "Kit").map((g) => g.name);
const TOOLS_AND_KITS = [...TOOLS, ...KITS];
const DAMAGE_TYPES = ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic"];

function skillChoice(count = 1): SpeciesTraitChoice {
  return { kind: "skill", label: "Skill", count, options: ALL_SKILLS };
}
function instrumentChoice(): SpeciesTraitChoice {
  return { kind: "instrument", label: "Musical Instrument", count: 1, options: INSTRUMENTS };
}
function toolChoice(label: string, options: string[]): SpeciesTraitChoice {
  return { kind: "tool", label, count: 1, options };
}
function languageChoice(count: number): SpeciesTraitChoice {
  return { kind: "language", label: "Language", count, options: LANGUAGES };
}
function otherChoice(label: string, options: string[]): SpeciesTraitChoice {
  return { kind: "other", label, count: 1, options };
}

export const FEATS_CATALOG: FeatEntry[] = [
  {
    name: "Ace Pilot",
    prerequisite: null,
    abilityOptions: ["int"],
    grantsSkill: "Piloting",
    text: "You're quite experienced both on land and in the air, be it from time in a navy, as a mercenary, or perhaps even piracy. You gain the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You gain proficiency in the Piloting skill. If you are already proficient in it, you instead gain expertise in it.\n- Whenever you make an Intelligence (Investigation) or Wisdom (Perception) check related to vehicles or ships, you are considered to have expertise in the Investigation or Perception skill.",
  },
  {
    name: "Acrobat",
    prerequisite: null,
    abilityOptions: ["dex"],
    grantsSkill: "Acrobatics",
    text: "You become more nimble, gaining the following benefits:\n- Increase your Dexterity score by 1, to a maximum of 20.\n- You gain proficiency in the Acrobatics skill. If you are already proficient in it, you instead gain expertise in it.\n- As a bonus action, you can make a DC 15 Dexterity (Acrobatics) check. If you succeed, difficult terrain doesn't cost you extra movement until the end of the current turn.",
  },
  {
    name: "Actor",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "Skilled at mimicry and dramatics, you gain the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.\n- You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked.",
  },
  {
    name: "Alert",
    prerequisite: null,
    abilityOptions: [],
    text: "Always on the lookout for danger, you gain the following benefits:\n- You are proficient in Initiative checks.\n- You can't be surprised while you are conscious.\n- Other creatures don't gain advantage on attack rolls against you as a result of being unseen by you.",
  },
  {
    name: "Animal Handler",
    prerequisite: null,
    abilityOptions: ["wis"],
    grantsSkill: "Animal Handling",
    text: "You master the techniques needed to train and handle animals. You gain the following benefits:\n- Increase your Wisdom score by 1, to a maximum of 20.\n- You gain proficiency in the Animal Handling skill. If you are already proficient in it, you instead gain expertise in it.\n- You can use a bonus action on your turn to command one friendly beast within 60 feet of you that can hear you and that isn't currently following the command of someone else. You decide now what action the beast will take and where it will move during its next turn, or you issue a general command that lasts for 1 minute, such as to guard a particular area.",
  },
  {
    name: "Armor Expert",
    prerequisite: null,
    abilityOptions: ["str", "dex", "con"],
    text: "You've learned how to fluidly move in armor, gaining the following benefits:\n- Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.\n- You gain proficiency with light armor. If you are already proficient with light armor, instead while you are wearing light armor, your speed increases by 5 feet.\n- If you are already proficient in light armor when you take this feat, you also gain proficiency in medium armor. If you are already proficient with medium armor, instead while you are wearing medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher, and you ignore the bulky property of medium armor.\n- If you are already proficient in medium armor when you take this feat, you also gain proficiency in heavy armor. If you are already proficient with heavy armor, instead while you are wearing heavy armor, critical hits made against you are treated as normal hits.\n\nYou can take this feat multiple times.",
  },
  {
    name: "Athlete",
    prerequisite: null,
    abilityOptions: ["str", "dex"],
    text: "You have undergone extensive physical training to gain the following benefits:\n- Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- When you are prone, standing up uses only 5 feet of your movement.\n- Climbing doesn't cost you extra movement.\n- You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.",
  },
  {
    name: "Battle Scarred",
    prerequisite: null,
    abilityOptions: ["con"],
    text: "You've spent a lifetime fighting, with the scars to prove it. You gain the following benefits:\n- Increase your Constitution score by 1, to a maximum of 20.\n- When you roll a 19 or a 20 on the d20 for a death saving throw, you regain 1 hit point.\n- When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. Once you've used this ability, you must complete a long rest before you can use it again.",
  },
  {
    name: "Bountiful Luck",
    prerequisite: "4th level, Lucky feat",
    abilityOptions: [],
    text: "Your people have extraordinary luck, which you have learned to lend to your companions when you see them falter. You're not sure how you do it; you just wish it, and it happens. Surely a sign of fortune's favor!\n\nWhen an ally you can see within 30 feet of you rolls a 1 on the d20 for an attack roll, an ability check, or a saving throw, you can use your reaction and expend 1 luck point to let the ally reroll the die. The ally must use the new roll. When you use this ability, you can't use luck points before the end of your next turn.",
  },
  {
    name: "Brawny",
    prerequisite: null,
    abilityOptions: ["str"],
    grantsSkill: "Athletics",
    text: "You become stronger, gaining the following benefits:\n- Increase your Strength score by 1, to a maximum of 20.\n- You gain proficiency in the Athletics skill. If you are already proficient in it, you instead gain expertise in it.\n- Your carrying capacity and the weight you can push, drag, or lift doubles. If it would already double, it instead triples.",
  },
  {
    name: "Charmer",
    prerequisite: null,
    abilityOptions: ["cha"],
    grantsSkill: "Persuasion",
    text: "You've master the art of charming those around you, gaining the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- You gain proficiency in the Persuasion skill. If you are already proficient in it, you instead gain expertise in it.\n- If you spend 1 minute talking to someone who can understand what you say, you can make a Charisma (Persuasion) check contested by the creature's Wisdom (Insight) check. If you or your companions are fighting the creature, your check automatically fails. If your check succeeds, the target is charmed by you as long as it remains within 60 feet of you and for 1 minute thereafter.",
  },
  {
    name: "Climber",
    prerequisite: null,
    abilityOptions: ["str"],
    text: "You excel at scaling cliffsides, hills, trees, and general climbing. You gain the following benefits:\n- Increase your Strength score by 1, to a maximum of 20.\n- You gain a climbing speed equal to your movement speed.\n- You have advantage on ability checks and saving throws to avoid falling off or down while climbing.\n- You can spend 5 minutes instructing, pointing out handholds, and guiding other creatures before making a climb. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you. Each creature can add a 1d6 to any ability check or saving throw they make for that climb.",
  },
  {
    name: "Commando",
    prerequisite: null,
    abilityOptions: ["dex"],
    text: "You've practiced fighting while prone, gaining the following benefits:\n- Increase your Dexterity score by 1, to a maximum of 20.\n- You gain a crawling speed equal to your movement speed.\n- While prone, you no longer have disadvantage on ranged attack rolls against targets within 30 feet due to being prone.\n- When you attempt to hide on your turn while prone, you can opt to not move on that turn. If you avoid moving, you are considered lightly obscured. You lose this benefit if you move or stand up, either voluntarily or because of some external effect. You are still automatically detected if any effect or action causes you to no longer be hidden. If you are still hidden on your next turn, you can continue to remain motionless and gain this benefit until you are detected.",
  },
  {
    name: "Competitor",
    prerequisite: null,
    abilityOptions: ALL_ABILITIES,
    choices: [toolChoice("Gaming Set", TOOLS_AND_KITS)],
    text: "You have a strong aptitude for competing. Select one gaming set. You gain the following benefits:\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You gain proficiency in the chosen gaming set. If you are already proficient with it, you instead gain expertise with it.\n- As long as you spend at least 1 minute using your gaming set, you can't have disadvantage on Intelligence checks you make to use the gaming set, Charisma (Deception) checks you make to bluff with the gaming set, or Wisdom (Insight) checks you make to read an opponent with whom you are competing with the gaming set.\n\nYou can take this feat multiple times. Each time you do so, you must choose a different gaming set.",
  },
  {
    name: "Crafter",
    prerequisite: null,
    abilityOptions: ALL_ABILITIES,
    choices: [toolChoice("Artisan's Tool", TOOLS)],
    text: "You have a knack for crafting; you work with greater efficiency and produce goods of higher quality. Select one type of artisan's implements. You gain the following benefits:\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You gain proficiency with the chosen tool. If you are already proficient with it, you instead gain expertise with it.\n- When you craft something with the chosen tool, the total market value you can craft increases 50 cr per day. If you have expertise with it, the market value instead increases by 100 cr per day.\n- If you use the tool you've selected to practice a profession during downtime, you can support a lifestyle one higher than you would normally be able to.\n\nYou can take this feat multiple times. Each time you do so, you must choose a different set of artisan's implements.",
  },
  {
    name: "Dungeon Delver",
    prerequisite: null,
    abilityOptions: ["int", "wis"],
    text: "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:\n- Increase your Intelligence or Wisdom score by 1, to a maximum of 20.\n- You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\n- You have advantage on saving throws made to avoid or resist traps.\n- You have resistance to the damage dealt by traps.\n- Traveling at a fast pace no longer imposes a -5 penalty to your passive Wisdom (Perception) score.",
  },
  {
    name: "Durable",
    prerequisite: null,
    abilityOptions: ["con"],
    text: "Hardy and resilient, you gain the following benefits:\n- Increase your Constitution score by 1, to a maximum of 20.\n- When you roll a Hit Die to regain hit points, the minimum number of hit points you can regain from the roll equals twice your Constitution modifier (minimum of 2).\n- Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.",
  },
  {
    name: "Empathic",
    prerequisite: null,
    abilityOptions: ["wis"],
    grantsSkill: "Insight",
    text: "You possess keen insight into how other people think and feel. You gain the following benefits:\n- Increase your Wisdom score by 1, to a maximum of 20.\n- You gain proficiency in the Insight skill. If you are already proficient in it, you instead gain expertise in it.\n- You can use your action to try to get uncanny insight about one humanoid you can see within 30 feet of you. Make a Wisdom (Insight) check contested by the target's Charisma (Deception) check. On a success, you have advantage on attack rolls and ability checks against the target until the end of your next turn.",
  },
  {
    name: "Entertainer",
    prerequisite: null,
    abilityOptions: ALL_ABILITIES,
    choices: [instrumentChoice()],
    text: "You have a natural gift for performing. Select one musical instrument. You gain the following benefits:\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You gain proficiency in the chosen musical instrument. If you are already proficient with it, you instead gain expertise with it.\n- While playing your chosen musical instrument, you can always readily read the emotions of those paying attention to you. During this time, and for up to one minute after completing, you have advantage on Wisdom (Insight) checks to read the emotions of those you performed for.\n\nYou can take this feat multiple times. Each time you do so, you must choose a different musical instrument.",
  },
  {
    name: "Fanatic",
    prerequisite: "4th level",
    abilityOptions: [],
    text: "Every blow that hits your enemies make you feel closer to victory, making you shake in excitement. You gain the following benefits:\n- When you score a critical hit with an attack roll or reduce a creature to 0 hit points, you can make one weapon attack as a bonus action.\n- Whenever a creature you can see within 30 feet is reduced to 0 hit points, you go into a fervor gaining temporary hit points equal to 1d4 + your Constitution modifier.",
  },
  {
    name: "Feigned Confidence",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "You've spent years pretending you know what you're doing, gaining the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- When you would make an ability check with a skill or tool that doesn't add your proficiency bonus, you can first make a DC 15 Charisma (Deception) check. On a success, you can add your proficiency bonus to the initial ability check. You can use this feature a number of times equal to your proficiency bonus. You regain all expended uses when you finish a short or long rest.",
  },
  {
    name: "Fighting Master",
    prerequisite: "4th level",
    abilityOptions: [],
    text: "You've mastered a particular style of fighting. Choose one of the fighting mastery options, detailed later in this chapter. You can take this feat multiple times.",
  },
  {
    name: "Fighting Stylist",
    prerequisite: "4th level",
    abilityOptions: ["str", "dex", "con"],
    text: "You adopt a particular style of fighting as your specialty, gaining the following benefits:\n- Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.\n- Choose one of the fighting style options, detailed later in this chapter.\n\nYou can take this feat multiple times.",
  },
  {
    name: "Force Guidance",
    prerequisite: "The ability to cast force powers",
    abilityOptions: ["wis", "cha"],
    choices: [toolChoice("Skill or Tool", ALL_SKILLS)],
    text: "You've learned to utilize your gift with the Force in a specific, unique way. You gain the following benefits\n- Increase your Wisdom or Charisma score by 1, to a maximum of 20.\n- Choose a skill or tool in which you are proficient. When you make an ability check with the chosen skill or tool, you can add half your Wisdom or Charisma modifier (your choice, minimum of one) to the check if it doesn't already include that modifier. You can use this feature a number of times equal to your proficiency bonus. You regain all expended uses when you complete a long rest.\n\nYou can take this feat multiple times. Each time you do so, you must choose a different skill or tool.",
  },
  {
    name: "Force of Personality",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "Rooms never go unalerted to your presence, and the strength of your personality make others lose focus on their own social game. Powers and other effects infrequently override your force of will. You gain the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- You can use your Charisma modifier instead of your Wisdom modifier when making Insight checks.\n- When you would make a Wisdom saving throw, you can instead make a Charisma saving throw. You can use this feature a number of times equal to your proficiency bonus. You regain all expended uses of this feature when you complete a long rest.",
  },
  {
    name: "Force-Sensitive",
    prerequisite: "Type humanoid",
    abilityOptions: [],
    text: "You know two at-will force powers. When you reach 3rd level, you learn one 1st-level force power, which you can cast once per long rest. When you reach 5th level, you learn one 2nd-level force power, which you can once per long rest. Your forcecasting ability is Wisdom or Charisma (depending on power alignment). Additionally, you lose the Force-Insensitive special trait if you have it.",
  },
  {
    name: "Forceful Vigor",
    prerequisite: null,
    abilityOptions: ["str"],
    text: "Your strength and virility rarely go unnoticed, often to the point of distraction. You gain the following benefits:\n- Increase your Strength score by 1, to a maximum of 20.\n- You can use your Strength modifier instead of your Constitution modifier when making Constitution checks.\n- When you would make a Constitution saving throw, you can instead make a Strength saving throw. You can use this feature a number of times equal to your proficiency bonus. You regain all expended uses of this feature when you complete a long rest.",
  },
  {
    name: "Formfighting Dabbler",
    prerequisite: "The ability to cast force powers",
    abilityOptions: ALL_ABILITIES,
    text: "You've dabbled in the basics of the known forms of lightsaber combat. You gain the following benefits:\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You learn one lightsaber form, detailed later in this chapter. If you already know at least one lightsaber form, you instead learn three lightsaber forms. If you already know at least three lightsaber forms, you instead learn seven lightsaber forms. If you already know at least ten lightsaber forms, you instead learn the remaining forms.",
  },
  {
    name: "Galvanizing Presence",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "Your presence on the battlefield is a source of inspiration. You gain the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- As a bonus action, you let out a rallying war cry, ending the frightened or charmed condition on yourself and a number of allies that can hear you equal to your Charisma modifier (minimum of one). Once you've used this ability, you must complete a short or long rest before you can use it again.",
  },
  {
    name: "Haggler",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "Your skills at bartering have granted you the following benefits:\n- Increase your Charisma score by 1 up to a maximum of 20.\n- You have advantage on Charisma (Persuasion) and Charisma (Deception) checks when attempting to barter or trade.\n- You are always aware of the current monetary value for any unenhanced or common enhanced item. Whenever you identify an item, you gain a rough estimate of its current monetary value.",
  },
  {
    name: "Healer",
    prerequisite: null,
    abilityOptions: ["int", "wis"],
    text: "You are an able medic, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:\n- Increase your Intelligence or Wisdom score by 1, to a maximum of 20.\n- When you use a traumakit to stabilize a dying creature, that creature also regains 1 hit point.\n- As an action, you can spend one use of a traumakit to tend to a creature and restore 1d6 + 4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points again in this way until it finishes a short or long rest.",
  },
  {
    name: "Inspiring Leader",
    prerequisite: "Charisma 13",
    abilityOptions: [],
    text: "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.",
  },
  {
    name: "Investigator",
    prerequisite: null,
    abilityOptions: ["int"],
    grantsSkill: "Investigation",
    text: "You have an eye for detail and can pick out the smallest clues. You gain the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You gain proficiency in the Investigation skill. If you are already proficient in it, you instead gain expertise in it.\n- You can take the Search action as a bonus action.",
  },
  {
    name: "Keen Mind",
    prerequisite: null,
    abilityOptions: ["int"],
    text: "You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits.\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You always know which way is north.\n- You always know the number of hours left before the next sunrise or sunset.\n- You can accurately recall anything you have seen or heard within the past month.",
  },
  {
    name: "Linguist",
    prerequisite: null,
    abilityOptions: ["int"],
    choices: [languageChoice(3)],
    text: "You have studied languages and codes, gaining the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You learn three languages of your choice.\n- You can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC = your Intelligence score + your proficiency bonus), or they use a power to decipher it.",
  },
  {
    name: "Loremaster",
    prerequisite: null,
    abilityOptions: ["int"],
    grantsSkill: "Lore",
    text: "Your study of history rewards you with the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You gain proficiency in the Lore skill. If you are already proficient in it, you instead gain expertise in it.\n- When you take the Help action to aid another creature's ability check, you can make a DC 15 Intelligence (Lore) check. On a success, that creature's check gains a bonus equal to your proficiency bonus, as you share pertinent advice and historical examples. To receive this bonus, the creature must be able to understand what you're saying.",
  },
  {
    name: "Lucky",
    prerequisite: "4th level",
    abilityOptions: [],
    text: "You have inexplicable luck that seems to kick in at just the right moment.\n\nYou have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\n\nYou can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker's roll or yours. If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\n\nYou regain your expended luck points when you finish a long rest.",
  },
  {
    name: "Mariner",
    prerequisite: null,
    abilityOptions: ["con"],
    text: "You've spent an exorbitant amount of time in water. You gain the following benefits:\n- Increase your Constitution score by 1, to a maximum of 20.\n- You gain a swimming speed equal to your movement speed.\n- You have advantage on ability checks and saving throws related to swimming.\n- You can hold your breath for a number of minutes equal to 1 + twice your Constitution modifier.",
  },
  {
    name: "Medic",
    prerequisite: null,
    abilityOptions: ["wis"],
    grantsSkill: "Medicine",
    text: "You master the physician's arts, gaining the following benefits:\n- Increase your Wisdom score by 1, to a maximum of 20.\n- You gain proficiency in the Medicine skill. If you are already proficient in it, you instead gain expertise in it.\n- During a short rest, you can clean and bind the wounds of up to six willing beasts and humanoids. Make a DC 15 Wisdom (Medicine) check for each creature. On a success, if a creature spends a Hit Die during this rest, that creature can forgo the roll and instead regain the maximum number of hit points the die can restore. A creature can do so only once per rest, regardless of how many Hit Dice it spends.",
  },
  {
    name: "Mobile",
    prerequisite: "4th level",
    abilityOptions: [],
    text: "You are exceptionally speedy and agile. You gain the following benefits:\n- Your speed increases by 10 feet.\n- When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.\n- When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.",
  },
  {
    name: "Naturalist",
    prerequisite: null,
    abilityOptions: ["int"],
    grantsSkill: "Nature",
    text: "Your extensive study of nature rewards you with the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You gain proficiency in the Nature skill. If you are already proficient in it, you instead gain expertise in it.\n- You learn the toxin scan tech power. You can cast it once, using supplies scavenged around you, without the use of a wristpad and without spending tech points, and you regain the ability to do so when you finish a long rest.",
  },
  {
    name: "Observant",
    prerequisite: null,
    abilityOptions: ["int", "wis"],
    text: "Quick to notice details of your environment, you gain the following benefits:\n- Increase your Intelligence or Wisdom score by 1, to a maximum of 20.\n- If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.\n- You are considered to have advantage when determining your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
  },
  {
    name: "Perceptive",
    prerequisite: null,
    abilityOptions: ["wis"],
    grantsSkill: "Perception",
    text: "You hone your senses until they become razor sharp. You gain the following benefits:\n- Increase your Wisdom score by 1, to a maximum of 20.\n- You gain proficiency in the Perception skill. If you are already proficient in it, you instead gain expertise in it.\n- Being in a lightly obscured area doesn't impose disadvantage on your Wisdom (Perception) checks if you can both see and hear.",
  },
  {
    name: "Performer",
    prerequisite: null,
    abilityOptions: ["cha"],
    grantsSkill: "Performance",
    text: "You master performance so that you can command any stage. You gain the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- You gain proficiency in the Performance skill. If you are already proficient in it, you instead gain expertise in it.\n- While performing, you can try to distract one humanoid you can see who can see and hear you. Make a Charisma (Performance) check contested by the humanoid's Wisdom (Insight) check. If your check succeeds, you grab the humanoid's attention enough that it makes Wisdom (Perception) and Intelligence (Investigation) checks with disadvantage until you stop performing.",
  },
  {
    name: "Power Adept",
    prerequisite: "4th level, the ability to cast force or tech powers",
    abilityOptions: [],
    choices: [otherChoice("Damage Type", DAMAGE_TYPES)],
    text: "When you gain this feat, choose one of the following damage types: acid, cold, fire, force, lightning, or necrotic. Powers you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a power you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\n\nYou can take this feat multiple times. Each time you do so, you must choose a different damage type.",
  },
  {
    name: "Power Channeling",
    prerequisite: "4th level, the ability to cast force or tech powers",
    abilityOptions: [],
    text: "Choose one from force- or tech-casting. You've learned to cast powers of the chosen type with greater deliberation. Choose a number of powers you know of 1st level or higher equal to half your proficiency bonus. When you cast one of the chosen powers, you can choose to spend an additional minute casting the power for each level of the power. If you do so, the cost of the power is reduced by half the number of points. Casting a power in this way requires concentration. If your concentration is broken, the power dissipates without taking effect.\n\nWhenever you gain a level in a class with casting of the chosen type, you can replace one of the chosen powers with another power of 1st level or higher you know.",
  },
  {
    name: "Practiced",
    prerequisite: null,
    abilityOptions: ALL_ABILITIES,
    choices: [skillChoice(2)],
    text: "You have acquired skills over your career, gaining the following benefits:\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You gain proficiency in any combination of two skills or tools of your choice.",
  },
  {
    name: "Promising Commander",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "You've trained relentless to lead your allies on the field of battle, gaining the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- As an action, you can gain tactical insight. For one minute, once per turn you can utter a special command or warning whenever an ally you can see within 30 feet makes an attack roll or saving throw. This creature can add a d4 to the roll provided it can hear and understand you. A creature can only benefit from one such die at a time. Once you've used this feature, you must complete a short or long rest before you can use it again.",
  },
  {
    name: "Quick-Fingered",
    prerequisite: null,
    abilityOptions: ["dex"],
    grantsSkill: "Sleight of Hand",
    text: "Your nimble fingers and agility let you perform sleight of hand. You gain the following benefits:\n- Increase your Dexterity score by 1, to a maximum of 20.\n- You gain proficiency in the Sleight of Hand skill. If you are already proficient in it, you instead gain expertise in it.\n- As a bonus action, you can make a Dexterity (Sleight of Hand) check to plant something on someone else, conceal an object on a creature, lift a purse, or take something from a pocket.",
  },
  {
    name: "Quick-Witted",
    prerequisite: null,
    abilityOptions: ["int"],
    text: "Great ideas come to you naturally, often when your life depends on it. You always have a plan, or at least parts of it. You gain the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You can use your Intelligence modifier instead of your Dexterity modifier when making Initiative checks.\n- When you would make a Dexterity saving throw, you can instead make an Intelligence saving throw. You can use this feature a number of times equal to your proficiency bonus. You regain all expended uses of this feature when you complete a long rest.",
  },
  {
    name: "Resilient",
    prerequisite: "4th level",
    abilityOptions: ALL_ABILITIES,
    grantsSavingThrowForAbilityChoice: true,
    text: "Choose one ability score. You gain the following benefits:\n- Increase the chosen ability score by 1, to a maximum of 20.\n- You gain proficiency in saving throws using the chosen ability.",
  },
  {
    name: "Shard Modification",
    prerequisite: "Type droid",
    abilityOptions: ALL_ABILITIES,
    text: "You are specially modified droid used to house a shard. Shards are sentient crystals native to the planet Orax, roughly a foot in length, that communicate with each other through pulses of light. While inhabiting a specialized droid host, shards are able to overcome the droid's inability to wield the Force, granting the following benefits:\n\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You lose the Force-Insensitive special trait.\n- You can cast the sense force force power once per day. Wisdom or Charisma (your choice) is your forcecasting ability for this power.",
  },
  {
    name: "Silver-Tongued",
    prerequisite: null,
    abilityOptions: ["cha"],
    grantsSkill: "Deception",
    text: "You develop your conversational skill to better deceive others. You gain the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- You gain proficiency in the Deception skill. If you are already proficient in it, you instead gain expertise in it.\n- When you take the Attack action, you can replace one attack with an attempt to deceive one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Deception) check contested by the target's Wisdom (Insight) check. If your check succeeds, your movement doesn't provoke opportunity attacks from the target and your attack rolls against it have advantage; both benefits last until the end of your next turn or until you use this ability on a different target. If your check fails, the target can't be deceived by you in this way for 1 hour.",
  },
  {
    name: "Snappy Interjection",
    prerequisite: null,
    abilityOptions: ["cha"],
    text: "You've mastered a quick tongue to aid your allies. You gain the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- Once per short or long rest, when an ally makes an attack roll, an ability check or a saving throw, you can spend your reaction to give them advantage on the roll.",
  },
  {
    name: "Specialist",
    prerequisite: null,
    abilityOptions: ALL_ABILITIES,
    choices: [toolChoice("Specialist's Kit", KITS)],
    text: "You have focused training with a specific tool. Select one type of specialist's kit. You gain the following benefits:\n- Increase an ability score of your choice by 1, to a maximum of 20.\n- You gain proficiency with the chosen kit. If you are already proficient with it, you instead gain expertise with it.\n- You can attempt ability checks with the chosen kit without the kit present, but you have disadvantage on the check when you do so.\n- Whenever you make an ability check with the chosen kit and you don't have disadvantage on the check, you can treat a d20 roll of 9 or lower as a 10, as long as you spend at least 1 minute on the check.\n\nYou can take this feat multiple times. Each time you do so, you must choose a different specialist's kit.",
  },
  {
    name: "Stealthy",
    prerequisite: null,
    abilityOptions: ["dex"],
    grantsSkill: "Stealth",
    text: "You know how best to hide, gaining the following benefits:\n- Increase your Dexterity score by 1, to a maximum of 20.\n- You gain proficiency in the Stealth skill. If you are already proficient in it, you instead gain expertise in it.\n- If you are hidden, you can move up to 10 feet in the open without revealing yourself if you end the move in a position where you're not clearly visible.",
  },
  {
    name: "Supreme Accuracy",
    prerequisite: "4th level; Dexterity, Intelligence, Wisdom, or Charisma 13",
    abilityOptions: ["dex", "int", "wis", "cha"],
    text: "You have uncanny aim with attacks that rely on precision. You gain the following benefits:\n- Increase your Dexterity, Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma you can reroll one of the dice once.",
  },
  {
    name: "Supreme Aptitude",
    prerequisite: "4th level; Strength, Dexterity, Constitution, or Intelligence 13",
    abilityOptions: ["str", "dex", "con", "int"],
    text: "You have uncanny skill with a preternatural focus. You gain the following benefits:\n- Increase your Strength, Dexterity, Constitution, or Intelligence score by 1, to a maximum of 20.\n- Whenever you have advantage on an ability check using Strength, Dexterity, Constitution, or Intelligence you can reroll one of the dice once.",
  },
  {
    name: "Supreme Durability",
    prerequisite: "4th level; Strength, Constitution, Wisdom, or Charisma 13",
    abilityOptions: ["str", "con", "wis", "cha"],
    text: "You have uncanny resilience of both body and mind. You gain the following benefits:\n- Increase your Strength, Constitution, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Whenever you have advantage on a saving throw using Strength, Constitution, Wisdom, or Charisma you can reroll one of the dice once.",
  },
  {
    name: "Survivalist",
    prerequisite: null,
    abilityOptions: ["wis"],
    grantsSkill: "Survival",
    text: "You master wilderness lore, gaining the following benefits:\n- Increase your Wisdom score by 1, to a maximum of 20.\n- You gain proficiency in the Survival skill. If you are already proficient in it, you instead gain expertise in it.\n- You learn the alarm tech power. You can cast it once, using supplies scavenged around you, without the use of a wristpad and without spending tech points, and you regain the ability to do so when you finish a long rest.",
  },
  {
    name: "Tech Dabbler",
    prerequisite: null,
    abilityOptions: [],
    text: "You know two at-will tech powers. When you reach 3rd level, you learn and can cast one 1st-level tech power once per long rest. When you reach 5th level, you learn and can cast one 2nd-level tech power once per long rest. Your techcasting ability is Intelligence. You require use of a wristpad for these powers. Additionally, you lose the Tech-Impaired special trait if you have it.",
  },
  {
    name: "Techie",
    prerequisite: null,
    abilityOptions: ["int"],
    grantsSkill: "Technology",
    text: "You master the theory and practice of technology, gaining the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You gain proficiency in the Technology skill. If you are already proficient in it, you instead gain expertise in it.\n- You learn the repair droid tech power. You can cast it once, using supplies scavenged around you, without the use of a wristpad and without spending tech points, and you regain the ability to do so when you finish a long rest.",
  },
  {
    name: "Threatening",
    prerequisite: null,
    abilityOptions: ["cha"],
    grantsSkill: "Intimidation",
    text: "You become fearsome to others, gaining the following benefits:\n- Increase your Charisma score by 1, to a maximum of 20.\n- You gain proficiency in the Intimidation skill. If you are already proficient in it, you instead gain expertise in it.\n- When you take the Attack action, you can replace one attack with an attempt to demoralize one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Intimidation) check contested by the target's Wisdom (Insight) check. If your check succeeds, the target is frightened until the end of your next turn. If your check fails, the target can't be frightened by you in this way for 1 hour.",
  },
  {
    name: "Tough",
    prerequisite: "4th level, Durable feat",
    abilityOptions: ["con"],
    text: "You have the blood of heroes flowing through your veins. You gain the following benefits:\n- Increase your Constitution score by 1, to a maximum of 20.\n- Whenever you take the Dodge action in combat, you can spend one Hit Die to heal yourself. Roll the die, add your Constitution modifier, and regain a number of hit points equal to the total (minimum of one).",
  },
  {
    name: "Weapon Expert",
    prerequisite: null,
    abilityOptions: ["str", "dex", "con"],
    text: "You have practiced extensively with a variety of weapons, gaining the following benefits:\n- Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.\n- You gain proficiency with all blasters. If you are already proficient with all blasters, instead once per turn when you would roll weapon damage using a blaster, you can choose to have advantage.\n- You gain proficiency with all lightweapons. If you are already proficient with all lightweapons, instead once per turn when you would roll weapon damage using a lightweapon, you can choose to have advantage.\n- You gain proficiency with all vibroweapons. If you are already proficient with all vibroweapons, instead once per turn when you would roll weapon damage using a vibroweapon, you can choose to have advantage.\n\nYou can take this feat twice.",
  },
];
