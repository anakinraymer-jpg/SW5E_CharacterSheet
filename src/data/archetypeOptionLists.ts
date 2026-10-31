// Archetype option lists from sw5e.com, picked like class choices (see classFeatureChoices.ts).
// Generated from sw5eapi.azurewebsites.net/api/archetype by scripts/gen-archetype-options.mjs, not hand-typed;
// auto-apply fields are added in that script's EXTRAS.
import type { ClassSubChoiceOption } from "../types";

// Each Scholar pursuit's own discoveries, added to the Discoveries choice while it is the archetype.
export const PURSUIT_DISCOVERIES: Record<string, ClassSubChoiceOption[]> = {
  "Gambler Pursuit": [
    {
      "name": "Ace Up Your Sleeve",
      "text": "Whenever you make a Dexterity (Sleight of Hand) or Charisma (Deception) check, you can expend a superiority die, adding the result to your total for the check."
    },
    {
      "name": "Against the House",
      "text": "Whenever you would make a Charisma (Persuasion) check involving haggling, you can instead challenge the target to a game of chance. If they accept your offer, you can make an ability check with an available gaming set. If you win the challenge, you automatically succeed on the Charisma (Persuasion) check."
    },
    {
      "name": "Ante Up",
      "text": "When you roll initiative, are not surprised, and end up first in the initiative order, you can take one additional action on top of your regular action and a possible bonus action during your first turn in combat."
    },
    {
      "name": "Calculated Bluff",
      "text": "When you make an ability check using Charisma, you can choose to instead make the check using your Intelligence or Wisdom modifier (your choice)."
    },
    {
      "name": "Cold Read",
      "prerequisite": "5th level",
      "text": "As an action, you may make a Wisdom (Insight) check contested by a target's Charisma (Deception) check. On a success, you know the next action the target intends to take, so long as the situation does not change dramatically."
    },
    {
      "name": "Feeling the Pressure",
      "prerequisite": "13th level",
      "text": "Whenever you roll a 4 or higher on your Risk Versus Reward feature, the target of your Critical Analysis feature also has disadvantage on attack rolls made against you until the start of your next turn."
    },
    {
      "name": "Take a Chance",
      "prerequisite": "9th level",
      "text": "Before making an attack roll, you can expend a superiority die. On a miss, you lose that superiority die and do not benefit from it in any way. On a hit, you can choose two other maneuvers that you know, and subject the target to both maneuvers, without expending additional superiority dice."
    },
    {
      "name": "The Magic Number",
      "prerequisite": "7th level",
      "text": "Whenever you roll a 7 on an ability check or saving throw, you can reroll the ability check or saving throw with advantage."
    }
  ],
  "Physician Pursuit": [
    {
      "name": "Advanced Remote Healer",
      "prerequisite": "11th level",
      "text": "The range of your Remote Healer feature increases to 60 feet."
    },
    {
      "name": "Experimental Treatments",
      "text": "Your medication and treatments are known to be untested and unstable. Immediately after you use a maneuver that causes a creature to regain hit points or gain temporary hit points, you can choose to roll on the Side Effects table to the right. The condition or effect lasts until the creature completes a long rest, or you use this feature again.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you finish a short or long rest."
    },
    {
      "name": "From the Brink",
      "prerequisite": "7th level",
      "text": "If the target of your Critical Analysis feature would be reduced to 0 hp, you may use your reaction and end your Critical Analysis feature to have them be reduced to 1 hp instead. Once a creature has benefited from this feature, they must complete a long rest before they can do so again."
    },
    {
      "name": "Health Advisor",
      "text": "Whenever a creature that is a target of your Critical Analysis feature begins their turn, you can use your reaction to give them temporary hit points equal to one-fourth your scholar level + your proficiency bonus, as shown in the scholar table, which last until the start of their next turn."
    },
    {
      "name": "Patient Protector",
      "prerequisite": "5th level",
      "text": "You can treat creatures within 5 feet of the target of your Critical Analysis feature as if they were also targets of your Critical Analysis."
    },
    {
      "name": "Surgical Precision",
      "prerequisite": "5th level",
      "text": "When you hit a creature that is the target of your Critical Analysis feature with a weapon attack, it takes additional damage equal to your Dexterity modifier."
    },
    {
      "name": "Tend the Wounded",
      "text": "If you or any friendly creatures you can touch regain hit points by spending one or more Hit Dice at the end of a short rest, each of those creatures regain 1d4 extra hit points.\n\nThis die increases when you reach certain levels in this class: 1d6 at 5th level, 1d8 at 9th level, 1d10 at 13th level, and to 1d12 at 17th level.\n\n##### Side Effects\n\n| d20 | Side Effects  |\n|:----:|:-------------|\n| 1  | The creature turns out to be allergic to this specific treatment. Every ability score is reduced by 1. |\n| 2  | The creature starts sneezing uncontrollably. Any attack rolls with a die roll value of 19 results in a miss due to a poorly timed sneeze. |\n| 3 | The creature's legs become swollen. The creature gains 1 slowed level. |\n| 4 | The creature becomes one size larger or smaller. |\n| 5 | The skin at their joints turns into a wooden material, giving them a bonus of +2 to AC. |\n| 6 | The creature's body starts producing powerful stomach acid in high amounts. The creature can use an action to spew stomach acid in a 15 feet cone. The DC for this saving throw equals 8 + your proficiency bonus + your Constitution modifier. A creature takes 2d6 acid damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 5th level, 4d6 at 11th level, and 5d6 at 17th level. | \n| 7 | The creature becomes mute and has uncontrollable gas. They have disadvantage on Dexterity (Stealth) checks that rely on smell.|\n| 8 | The creature's eyes glows bright red. The creature also gains darkvision, but if they already have darkvision they get a light headache instead. |\n| 9 | The creature gains advantage on perception checks based on hearing, but everything seems uncomfortably loud to them. They gain vulnerability to sonic damage. |\n| 10 | The treatment slows down their brain function, reducing their Intelligence by 4.|\n| 11  | The creature's skin turns dark purple. If they are already purple, they turn bright pink instead.  |\n| 12  |  The creature becomes covered in sickly, green pustules. When the creature is hit by a melee attack, the attacker takes 1d4 poison damage. |\n| 13 | The creature's skin starts to seriously bloat up from internal pressure build-up, and a strong impact may cause it to explode. Whenever the creature takes damage, the creature has to pass a concentration check or the creature takes kinetic damage equal to half their maximum hit points. Other creatures within 10 feet of the explosion also take a fourth of the damage. Once this explosion occurs, their skin becomes very soft. |\n| 14 | The creature rapidly grows body hair all over, including the face, until they resemble a wookiee. If they are already a wookiee, the reverse effect occurs; all hair immediately falls off, leaving the skin bare. |\n| 15 | The creature's body temperature fluctuates to extremes. They gain resistance to cold and fire damage.|\n| 16 | The creature becomes ravenous. Every hour they haven't eaten a meal they gain a level of exhaustion. |\n| 17 | The creature believes they are the chosen one. |\n| 18 | The creature has a difficult time resting. The amount they heal from Hit Dice is now halved. |\n| 19 | The creature's movement speed is increased by 15 feet, and opportunity attacks on them have disadvantage. |\n| 20 | The creature gains 10d10 hit points, and they feel happy and carefree. |"
    }
  ],
  "Politician Pursuit": [
    {
      "name": "Charming Feint",
      "text": "Allies within range of your Motivating Diplomat feature also gain a bonus to their damage rolls equal to half your Critical Analysis ability modifier."
    },
    {
      "name": "Demanding Leader",
      "prerequisite": "5th level",
      "text": "The range of each of your maneuvers increases by 10 feet. If the range is touch, it becomes 10 feet."
    },
    {
      "name": "Dominating Presence",
      "prerequisite": "15th level",
      "text": "As a bonus action, you can call out to a humanoid who can understand you that is charmed by you or frightened of you to direct their next action. The target must succeed a Wisdom saving throw against your maneuver save DC. On a failed save, until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do.\n\nDuring this time you can use your reaction to force the creature to use its reaction.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
    },
    {
      "name": "Influencer",
      "prerequisite": "5th level",
      "text": "The range on the your Motivating Diplomat feature is increased to 15 feet."
    },
    {
      "name": "Reliable Words",
      "prerequisite": "9th level",
      "text": "Charisma (Deception, Intimidation, or Persuasion) checks you make gain a minimum roll threshold, discussed in chapter 7."
    },
    {
      "name": "Social Opportunist",
      "text": "You can add half your proficiency bonus to any Charisma check you make that doesn't already include your proficiency bonus.",
      "passiveBuffText": "Half proficiency bonus on Charisma checks without proficiency"
    },
    {
      "name": "Tyrant's Ferocity",
      "text": "You have advantage on any attack against a creature that is charmed by you or frightened of you."
    }
  ],
  "Tactician Pursuit": [
    {
      "name": "Commander's Armor",
      "prerequisite": "5th level",
      "text": "You gain proficiency in medium armor. If you are already proficient in medium armor, you instead gain proficiency in heavy armor.",
      "grantsProficiency": "Medium armor"
    },
    {
      "name": "Contingency Plan",
      "prerequisite": "9th level",
      "text": "When the target of your Critical Analysis feature scores a critical hit, you can use your reaction and expend a superiority die to treat the attack as a normal hit instead."
    },
    {
      "name": "Fighting Style",
      "text": "You adopt a particular style of fighting as your specialty. Choose one of the fighting style options, detailed in Chapter 6.",
      "fightingStyleChoice": true
    },
    {
      "name": "Firing Command",
      "text": "You can take the Help action as a bonus action. Additionally, when you take the Help action to assist an ally attacking the target of your Critical Analysis, it has a range of 30 feet."
    },
    {
      "name": "Observant Leader",
      "text": "You have advantage Wisdom (Perception) checks that rely on sight.",
      "passiveBuffText": "Advantage on sight-based Perception checks"
    },
    {
      "name": "Studied Commander",
      "text": "When you make an Intelligence (Lore) or Intelligence (Technology) check related to battles, tactics, or weaponry, you may expend a superiority die and add it to the roll."
    },
    {
      "name": "Tactical Retreat",
      "text": "When you take the Dash action, opportunity attacks made against you are made at disadvantage."
    },
    {
      "name": "Unbound Commander",
      "prerequisite": "12th level",
      "text": "You learn to command your allies to victory from afar. Your Critical Analysis range is increased to 120 feet."
    }
  ],
  "Archaeologist Pursuit": [
    {
      "name": "Archive Research",
      "text": "Your expeditions have turned up a bevy of knowledge on the force. You learn three at-will force powers of your choice, which don't count against your number of force powers known."
    },
    {
      "name": "Force Combat Knowledge",
      "text": "Your research into Jedi and Sith combat techniques has allowed you to gain proficiency in simple lightweapons. Additionally, you gain knowledge of one lightsaber form of your choice.",
      "grantsProficiency": "Simple lightweapons",
      "lightsaberFormChoiceCount": 1
    },
    {
      "name": "It Belongs in a Museum",
      "prerequisite": "9th level",
      "text": "Your knowledge of antiquities is unparalleled. When you make an Intelligence (Lore) check or an ability check with your archaeologist kit, you may treat any roll of a 9 or lower as a 10."
    },
    {
      "name": "Localized Survey",
      "prerequisite": "13th level",
      "text": "Your affinity for the force allows you to key in to the recent past of an area you enter. When you would expend a use of your Psychometric Analysis, you can instead choose to target your immediate vicinity (up to a 50-foot cube) and investigate for at least 1 minute. For each minute you investigate, you see visions of recent events in the area going back a number of days equal to your scholar level, you learn about one significant event, beginning with the most recent. \n\nYou can investigate in this way for a number of minutes equal to your scholar level and must maintain concentration during that time, as if you were concentrating on a power. \n\nOnce you've used this feature, you can't use it again until you complete a short or long rest."
    },
    {
      "name": "Making This Up As You Go",
      "prerequisite": "17th level",
      "text": "You may now cast force powers at 4th-level twice between rests."
    },
    {
      "name": "Telekinetic Ministrations",
      "prerequisite": "9th level",
      "text": "You can cast the telekinesis force power at 5th level without spending force points.\n\nOnce you've used this feature, you must complete a long rest before you can use it again."
    },
    {
      "name": "The Years and the Mileage",
      "text": "Your archaeological studies have taken you all across the galaxy. While you are the target of your Critical Analysis feature, you can use your universal forcecasting ability instead of Wisdom when making Insight or Survival checks."
    },
    {
      "name": "Tomb of the Ancients",
      "prerequisite": "5th level",
      "text": "As a reaction when you take damage, you can entomb yourself in the Force until the end of your next turn. For the duration, you have resistance to the triggering damage, you gain temporary hit points equal to 1d10 + your universal forcecasting ability modifier + your scholar level to potentially absorb the attack, and your speed is reduced to 0.\n\nOnce you've used this feature, you can't use it again until you finish a short or long rest."
    }
  ],
  "Chef Pursuit": [
    {
      "name": "Allergens",
      "text": "As a bonus action while preparing or touching food, you may expend a superiority die and add to it an irritating allergen. At the start of each of its turns, a creature that consumes this food must make a Constitution saving throw. On a failed save, it subtracts half the result of your superiority die (minimum of one) from the first ability check, attack roll, or saving throws it makes before the start of its next turn. The effect of this maneuver ends when the creature completes its next long rest or 24 hours have passed. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Alternative Fuel",
      "text": "Any of your chef features, maneuvers, or discoveries can now affect droids and constructs."
    },
    {
      "name": "Banquet",
      "prerequisite": "17th level, Full Course",
      "text": "Over the course of a long or short rest, you may utilize an additional maneuver from this archetype (total of four)."
    },
    {
      "name": "Brain Food",
      "text": "At the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature gains a number of temporary force or tech points (their choice) equal to the number you roll on the superiority die. When an affected creature casts a force or tech power, the temporary force or tech points are spent first. An affected target can only benefit from one source of temporary force or tech points at a time, and they last until they're depleted or until the affected target completes their next short or long rest. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Debilitants",
      "text": "As a bonus action when preparing or touching food, you may expend a superiority die and add to it a subtle poison. Any creature that consumes this food must make a Constitution saving throw. On a failed save, their hit point maximum is reduced by an amount equal to twice the number rolled on your superiority die + your maneuver modifier. The effect of this maneuver ends when the creature completes its next long rest or 24 hours have passed. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Energizers",
      "text": "At the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature has their walking speed increased by 10 until the end of their next short or long rest. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Enhancers",
      "text": "At the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Once before the end of their next short or long rest, affected targets may add the result of the superiority die to a damage roll that would affect only one target. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Filling Meal",
      "prerequisite": "7th level",
      "text": "Over the course of a long or short rest, you may utilize up to two different maneuvers from this archetype, rather than one."
    },
    {
      "name": "Full Course",
      "prerequisite": "12th level, Filling Meal",
      "text": "Over the course of a long or short rest, you may utilize an additional maneuver from this archetype (total of three)."
    },
    {
      "name": "Health Food",
      "text": "At the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature gains a number of temporary hit points equal to twice the number you roll on the superiority die. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Muscle Relaxants",
      "text": "As a bonus action while preparing or touching food, you may expend a superiority die and add to it a fast acting muscle relaxant. At the start of each of its turns, a creature that consumes this food must make a Constitution saving throw. On a failed save, it subtracts the result of your superiority die from the first damage roll it makes before the start of its next turn. The effect of this maneuver ends when the creature completes its next long rest or 24 hours have passed. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "On the Rocks",
      "text": "Any food you prepare over a short or long rest carries with it an additional cooling effect. Creatures that consume it are considered adapted to hot climates, as described in chapter 5 of the Dungeon Master's Guide, until the end of the creature's next long rest or 24 hours have passed. Additionally, the first time a creature who eats your food takes fire damage before the end of their next short or long rest, they are considered resistant to the damage."
    },
    {
      "name": "Secret Ingredient",
      "text": "If you or any friendly creature that has consumed food made by you during their last short or long rest gains temporary hit points, the number of temporary hit points they gain increases by an amount equal to your Critical Analysis ability modifer."
    },
    {
      "name": "Spice of Life",
      "text": "Any food you prepare over a short or long rest carries with it an additional warming effect. Creatures that consume it are considered adapted to cold climates, as described in chapter 5 of the Dungeon Master's Guide, until the end of the creature's next long rest or 24 hours have passed. Additionally, the first time a creature who eats your food takes cold damage before the end of their next short or long rest, they are considered resistant to the damage."
    },
    {
      "name": "Supplements",
      "text": "At the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Once before the end of their next short or long rest, affected targets may add the result of the superiority die to one ability check, attack roll, or saving throw. The creature can wait until after it rolls the d20 before deciding to use this feature, but must decide before the DM says whether the roll succeeds or fails. This maneuver has no effect on droids or constructs."
    },
    {
      "name": "Vitamins",
      "text": "At the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature gains proficiency in Constitution saving throws until the end of their next short or long rest. If a creature was already proficient in Constitution saving throws, they instead become proficient in a saving throw of your choice. This maneuver has no effect on droids or constructs."
    }
  ],
  "Detective Pursuit": [
    {
      "name": "Athletic",
      "text": "You gain your choice of a climbing, crawling, or swimming speed equal to your walking speed."
    },
    {
      "name": "Brawler Adept",
      "prerequisite": "5th level",
      "text": "Your unarmed strike damage increases by one step (from 1 to d4, d4 to d6, or d6 to d8). Additionally, your unarmed strikes and count as enhanced for the purpose of overcoming resistance and immunity to unenhanced attacks and damage."
    },
    {
      "name": "Eye for Attire",
      "prerequisite": "5th level",
      "text": "As an action, you can touch a suit of armor that isn't being worn or carried by a hostile creature and instantly don it, provided you aren't wearing armor already."
    },
    {
      "name": "Eye for Detail",
      "text": "You take the Search action as a bonus action."
    },
    {
      "name": "Ear for Deceit",
      "text": "Whenever you make a Wisdom (Insight) check to determine whether a creature is lying, treat a roll of 7 or lower on the d20 as an 8.",
      "passiveBuffText": "Insight to spot lies: 7 or lower counts as 8"
    },
    {
      "name": "Fighting Style",
      "text": "You adopt a particular style of fighting as your specialty. Choose one of the fighting style options, detailed in Chapter 6 of the Player's Handbook.",
      "fightingStyleChoice": true
    },
    {
      "name": "Scrapper's Armor",
      "prerequisite": "5th level",
      "text": "You gain proficiency in medium armor. If you are already proficient in medium armor, you instead gain proficiency in heavy armor.",
      "grantsProficiency": "Medium armor"
    },
    {
      "name": "Steady Eye",
      "prerequisite": "9th level",
      "text": "On your turn, you can reduce your speed by half to gain advantage on Wisdom (Perception) or Intelligence (Investigation) checks until the end of the turn. You can not use this feature if you have moved more than half your speed this turn."
    },
    {
      "name": "Thirst for Justice",
      "text": "When you reduce a hostile creature to 0 hit points, but don't kill it outright, you gain temporary hit points equal to your scholar level, which last for 1 minute."
    },
    {
      "name": "Unerring Eye",
      "prerequisite": "15th level",
      "text": "You can see the true form of any shapechanger or creature concealed by illusion while the creature is within 30 feet of you and within line of sight.",
      "passiveBuffText": "See true forms of shapechangers and illusions within 30 ft"
    }
  ],
  "Explorer Pursuit": [
    {
      "name": "Cover Adept",
      "prerequisite": "12th level",
      "text": "You treat one-quarter cover as half cover, half cover as three-quarters cover, and three-quarters cover as full cover. Additionally, while you are in cover, Dexterity (Stealth) checks you make gain a bonus equal to your Critical Analysis ability modifer (minimum of +1)."
    },
    {
      "name": "Dungeon Explorer",
      "text": "You have advantage on Wisdom (Perception) checks and Intelligence (Investigation) checks to locate any secret doors or traps, and you have resistance to damage dealt by traps.\n\nAdditionally, you can use your Sage Advice feature to teach friendly creatures about various types of traps, following the same rules of that feature. When you do so, the chosen creatures have resistance to damage dealt by traps.",
      "passiveBuffText": "Resistant: trap damage; advantage finding secret doors and traps"
    },
    {
      "name": "Galactic Explorer",
      "prerequisite": "9th level",
      "text": "When you make an Intelligence (Piloting) check and add your proficiency bonus to the check, treat any roll of 9 or lower as if you had rolled a 10."
    },
    {
      "name": "Grappling Hunter",
      "prerequisite": "5th level",
      "text": "Attack rolls that you make against creatures that you are grappling have advantage."
    },
    {
      "name": "High Ground",
      "prerequisite": "5th level",
      "text": "Once per turn, when you or a friendly creature hits a creature that is a target of your Critical Analysis feature, it takes additional damage equal to half your Critical Analysis ability modifer (minimum of +1)."
    },
    {
      "name": "No Stone Left Unturned",
      "text": "When you make a Wisdom (Perception) or Intelligence (Investigation) check to find a hidden creature that is inside the area that is targeted by your Critical Analysis feature, you do so with advantage."
    },
    {
      "name": "Versatile Explorer",
      "text": "You can hold your breath twice as long as you are normally able to, and take half as much damage from fall damage.",
      "passiveBuffText": "Hold breath twice as long; half fall damage"
    }
  ],
  "Geneticist Pursuit": [
    {
      "name": "Adapted Hide",
      "text": "When you aren't wearing armor, your AC is 13 + your Dexterity modifier. Additionally, you are adapted to hot or cold climates (your choice), as described in chapter 5 of the Dungeon Master's Guide. When you undergo your mutagenic transformation, you add your full Critical Analysis ability modifer, instead of half, to your AC for the duration."
    },
    {
      "name": "Atmospheric Adaptation",
      "text": "You can breathe air and water. When you undergo your mutagenic transformation, you no longer need to breathe, and you can survive up to one hour within the vacuum of space for the duration.",
      "passiveBuffText": "Breathe air and water"
    },
    {
      "name": "Enhanced Musculature",
      "text": "Your carrying capacity and the weight you can push, drag, or lift doubles. If it would already double, it instead triples. Additionally, when you make a long jump, you can cover a number of feet up to twice your Strength score. When you make a high jump, you can leap a number of feet up into the air equal to 3 + twice your Strength modifier. When you undergo your mutagenic transformation, you have advantage on Strength checks and Strength saving throws for the duration.",
      "carryingCapacityMultiplier": 2,
      "passiveBuffText": "Carrying capacity doubled; long jump up to twice your Strength score"
    },
    {
      "name": "Icarian Mutation",
      "text": "You sprout a pair of winged arms. You gain a flying speed equal to half your walking speed. You can only gain the benefit of items held by two of your arms at any given time, and once per round you can switch which arms you are benefiting from (no action required). When you undergo your mutagenic transformation, your flying speed increases to your full walking speed, and you can use your bonus action to take the Dash action for the duration."
    },
    {
      "name": "Mutagenic Hardiness",
      "text": "Your hit point maximum increases by a number equal to your level, and it increases by 1 every time you gain a level. When you undergo your mutagenic transformation, and at the beginning of each of your turns, you gain temporary hit points equal to your half your scholar level + your Critical Analysis ability modifer for the duration.",
      "hpBonusPerLevel": 1
    },
    {
      "name": "Predatory Senses",
      "text": "You have darkvision out to 60 feet. If you already have darkvision, its range instead increases by 30 feet. When you undergo your mutagenic transformation, you gain advantage on Wisdom (Perception) checks that rely on smell for the duration. Additionally, you can track creatures that have left a scent in the last 24 hours.",
      "passiveBuffText": "Darkvision 60 ft (or +30 ft if you already have it)"
    },
    {
      "name": "Underground Adaptation",
      "text": "You gain a burrowing speed equal to your walking speed and you can tunnel through solid rock at a rate of 1 foot per round. In order to use this speed, you must have two free hands. When you undergo your mutagenic transformation, you gain tremorsense out to 30 feet for the duration. You can detect and pinpoint the origin of vibrations within a specific radius, provided that monster and the source of the vibrations are in contact with the same ground or substance. Tremorsense can't be used to detect flying or incorporeal creatures."
    },
    {
      "name": "Unnatural Weaponry",
      "text": "You sprout claws or some other natural weapon. Your unarmed strikes deal 1d4 kinetic damage, and you can use your choice of your Strength, Dexterity, or Critical Analysis ability modifer for the attack and damage rolls. You must use the same modifier for both rolls. When you undergo your mutagenic transformation, your unarmed strikes increase to a d6 and are considered enhanced for the duration. Additionally, you deal an additional 1d4 acid, lightning, or poison damage when you hit with them."
    }
  ],
  "Occultist Pursuit": [
    {
      "name": "Arcane Membrane",
      "text": "You have advantage on Intelligence (Lore) or Intelligence (Nature) checks.",
      "passiveBuffText": "Advantage on Lore and Nature checks"
    },
    {
      "name": "Evil Eye",
      "prerequisite": "5th level",
      "text": "You can cast the bestow curse and remove curse force powers without spending force points. Wisdom or Charisma (your choice) is your forcecasting modifier for these powers.\n\nOnce you've cast a power using this feature, you must complete a long rest before you can cast it again."
    },
    {
      "name": "Exsanguination",
      "prerequisite": "9th level",
      "text": "When a creature marked by your Curse of Objurgation is reduced to 0 hit points, you can use a reaction and expend a Hit Die to immediately regain a use of your Curse of Objurgation."
    },
    {
      "name": "Hexes and Superstitions",
      "text": "When you roll a 13 on an ability check, you treat it as if you rolled a 20.",
      "passiveBuffText": "A 13 on an ability check counts as a 20"
    },
    {
      "name": "Natural Karma",
      "text": "Before you use a maneuver or power to set a curse on a target you can see, you can make a contested Dexterity (Sleight of Hand) check against the target's Wisdom (Insight) check. On a success, the target is unaware you set the curse on them."
    },
    {
      "name": "Savage Sortilege",
      "prerequisite": "13th level",
      "text": "You ignore resistance to psychic damage, and you have resistance to psychic damage.",
      "passiveBuffText": "Resistant: psychic; you ignore psychic resistance"
    },
    {
      "name": "Supernatural Vigor",
      "text": "At the end of a long rest, you can choose one creature you can see within 30 feet (this includes you) to imbue with unnatural power. The creature's hit point maximum and current hit points increase by an amount equal to your scholar level, and it has advantage on Constitution saving throws made to avoid exhaustion. Both effects end after 8 hours."
    }
  ],
  "Slicer Pursuit": [
    {
      "name": "Administrator's Log",
      "text": "If you spend at least 10 minutes working on a computer or terminal, you can get a full list of users who have accessed the machine within the past 24 hours. Over the course of a long rest, you may then form a facsimile of identification that would allow you to pass yourself off as that person when accessing machines."
    },
    {
      "name": "Backdoor Egress",
      "text": "When you cast a tech power that affects an area and requires a saving throw, and you are inside that power's area, you can use your reaction to move up to half your speed without provoking opportunity attacks. If you end this movement outside the area affected by the tech power, you do not have to make a saving throw to avoid its effects."
    },
    {
      "name": "Intelligence Core Override",
      "prerequisite": "9th level",
      "text": "You can cast the override interface tech power at 5th level without spending tech points. \n\nOnce you've used this feature, you must complete a long rest before you can use it again."
    },
    {
      "name": "Resource Appropriation",
      "prerequisite": "11th level",
      "text": "If you reduce the target of your Critical Analysis feature to 0 hit points, and it has tech point remaining, you may choose to gain any tech points it had remaining. Your current tech points cannot exceed your tech point maximum.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
    },
    {
      "name": "Skillful Casting",
      "text": "When you hit a creature with an at-will tech power that requires an attack roll, you may treat that attack roll as a weapon attack for the purpose of using maneuvers."
    },
    {
      "name": "Sleeper Program",
      "text": "Whenever you cast a tech power with a casting time of 1 action, you can choose to delay the power's activation up to a minute. When you do so, you cast the power as normal, but holds its energy for the duration of the delay. Holding onto the power's effect requires concentration. If your concentration is broken before the delay ends, the power dissipates without taking effect. You can use your reaction to activate the power at any time.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses  when you finish a long rest."
    }
  ],
  "Zoologist Pursuit": [
    {
      "name": "Advantageous Companion",
      "text": "When you make a Charisma (Intimidation) check against a creature that can see your beast companion, and your companion is size Medium or larger, you make the check with advantage.\n\nWhen you make a Charisma (Persuasion) check against a creature that can see your beast companion, and your companion is size Small or Tiny, you make the check with advantage."
    },
    {
      "name": "Holocam Attachment",
      "text": "You have learned how to safely attach a holocam on the head of the companion. You learn the tracker droid interface tech power, your beast becomes a valid target of this power, and when you cast this power targeting your beast, you do so without spending tech points. You require use of a wristpad for this power."
    },
    {
      "name": "Neat Tricks",
      "prerequisite": "5th level",
      "text": "Your beast gains proficiency in one Strength or Dexterity skill of your choice. If your beast's size is Medium or larger and the chosen skill uses Strength, it has expertise in the chosen skill. If your beast's size is Small or smaller and the chosen skill uses Dexterity, it has expertise in the chosen skill."
    },
    {
      "name": "One Big Baddie",
      "prerequisite": "Size Medium or larger beast",
      "text": "Your beast companion gains the following benefits:\n- It deals double damage against structures.\n- It can take the Guard action as a bonus action, but it can only guard you in this way.\n- It can spend a bonus action to spend one of its Hit Dice to recover hit points.\n- When it rolls a Hit Die to regain hit points, the minimum number of hit points it can regain from the roll equals twice its Constitution modifier (minimum of 2)."
    },
    {
      "name": "Protective Friend",
      "text": "If a creature makes a melee attack against you or your companion, and your companion is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll."
    },
    {
      "name": "The More the Merrier",
      "prerequisite": "Size Small or smaller beast",
      "text": "Rather than a single beast companion, you instead control multiple beasts that function as a swarm. Your beast companion gains the following benefits:\n- Its effective size increases by two categories (from Tiny to Medium or Small to Large).\n- Its hit points increase by an amount equal to twice its level + 2.\n- It can only be mounted by creatures at least three size categories smaller than it, instead of one.\n- It can occupy another creature's space and vice versa, and it can move through any opening large enough for a creature two size categories smaller than it.\n- While it is above half its hit point maximum, when it takes the Attack action, it can make an additional attack. If the creature has the Extra Attack feature, this attack is in addition to the attack granted by that feature."
    }
  ]
};

// Enhancement Specialist (Fighter): Special Ammunition.
export const AMMUNITION_ENHANCEMENTS: ClassSubChoiceOption[] = [
  {
    "name": "Carbonite Shot",
    "text": "When this shot strikes its target, shards of carbonite wrap around the target. The creature hit by the shot takes an extra 2d6 cold damage, it gains 1 slowed level, and it takes 2d6 kinetic damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the carbonite with a successful Strength (Athletics) check against your Special Ammunition save DC. Otherwise, the carbonite lasts for 1 minute or until you use this option again.\n\nThe cold damage and kinetic damage both increase to 4d6 when you reach 18th level in this class."
  },
  {
    "name": "Coercing Shot",
    "text": "You enhance your shot with chemicals that confuse the target. The creature hit by the shot takes an extra 2d6 poison damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw.\n\nThe poison damage increases to 4d6 when you reach 18th level in this class."
  },
  {
    "name": "Explosive Shot",
    "text": "You fire a shot set to explode on impact. The shot detonates after your attack. Immediately after the shot hits the creature, the target and all other creatures within 10 feet of it take 2d6 fire damage each.\n\nThe fire damage increases to 4d6 when you reach 18th level in this class."
  },
  {
    "name": "Hallucinogen Shot",
    "text": "You enhance your shot with hallucinogenic chemicals. The creature hit by the shot takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn.\n\nThe psychic damage increases to 4d6 when you reach 18th level in this class."
  },
  {
    "name": "Piercing Shot",
    "text": "You enhance your shot with armor-piercing properties. When you use this option, you don't make an attack roll for the attack. Instead, the shot shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The shot passes through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the shot, plus an extra 1d6 damage of the weapon's type. On a successful save, a target takes half as much damage.\n\nThe extra damage increases to 2d6 when you reach 18th level in this class."
  },
  {
    "name": "Quell Shot",
    "text": "You fire a shot enhanced with a debilitating poison. The creature hit by the shot takes an extra 2d6 poison damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn.\n\nThe poison damage increases to 4d6 when you reach 18th level in this class."
  },
  {
    "name": "Seeking Shot",
    "text": "You apply a tracing signal to your shot. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The shot flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the shot to travel to the target, the target must make a Dexterity saving throw. Otherwise, the shot disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the shot, plus an extra 1d6 kinetic damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location.\n\nThe kinetic damage increases to 2d6 when you reach 18th level in this class."
  }
];

// Totem Specialist (Fighter): Totem Creation.
export const TOTEMS: ClassSubChoiceOption[] = [
  {
    "name": "Totem of the Acklay",
    "text": "This totem evokes the ferocity of an acklay, granting you advantage on Intelligence (Nature) checks and Charisma (Intimidation) checks.\n\nAdditionally, you can invoke the totem as a bonus action. For 10 minutes, your carrying capacity and the weight you can push, drag, or lift doubles, and your Strength score increases by 2. This increase can cause your score to exceed 20.",
    "passiveBuffText": "Advantage on Nature and Intimidation checks (Acklay totem)"
  },
  {
    "name": "Totem of the Hawk",
    "text": "This totem is inspired by the visage of a hawk, granting you advantage on Intelligence (Investigation) checks, and darkvision out to a range of 60 feet. If you already have darkvision, its range increases by 30 feet.\n\nAdditionally, when a creature you can see ends its turn within 30 feet of you, you can use your reaction to invoke the totem and force the creature to make a Constitution saving throw by emitting a powerful sound. Unless the save succeeds, the creature is dazed, suffering from the charmed condition, for 1 minute. While charmed in this way, the creature has a speed of 0 and is incapacitated. The effect ends if the charmed creature takes any damage or if someone else uses an action to shake the creature out of its haze. Once you invoke the totem, you can't do so again until you finish a short or long rest. A deaf creature automatically succeeds on its saving throw.",
    "passiveBuffText": "Advantage on Investigation; darkvision 60 ft or +30 ft (Hawk totem)"
  },
  {
    "name": "Totem of the Loth-wolf",
    "text": "This totem emulates the near etherealness of a loth-wolf, granting you advantage on Dexterity (Sleight of Hand) checks and Charisma (Deception) checks.\n\nAdditionally, when you or a creature you can see within 30 feet of you is hit by an attack roll, you can use your reaction to invoke the totem and cause that attack to target a different creature within 30 feet of you (other than the attacker) that you can see, using the same roll. This ability can transfer the attack regardless of the attack's range.",
    "passiveBuffText": "Advantage on Sleight of Hand and Deception checks (Loth-wolf totem)"
  },
  {
    "name": "Totem of the Rancor",
    "text": "This totem bestows a resilience reminiscent of a mighty rancor, granting you advantage on saving throws against being poisoned and resistance to poison damage.\n\nAdditionally, you can invoke the totem as a bonus action, gaining resistance to energy and kinetic damage for 1 minute.",
    "passiveBuffText": "Resistant: poison; advantage on saves against poisoned (Rancor totem)"
  },
  {
    "name": "Totem of the Sarlacc",
    "text": "This totem channels the experience of an ancient sarlacc, granting you expertise in any one tool in which you are proficient.\n\nAdditionally, when you hit a creature with a weapon attack, you can invoke the totem to summon the tentacles of the creature: The target must succeed on a Strength saving throw or be restrained for 1 minute. While restrained by the tentacles, the target takes 2d6 acid damage at the start of each of its turns. The target can repeat the saving throw at the end of each of its turns, tearing free on a success.",
    "passiveBuffText": "Expertise in one tool you're proficient with (Sarlacc totem)"
  },
  {
    "name": "Totem of the Vornskr",
    "text": "With this totem you are able to access the Force-enhanced senses of the vornskr, granting you advantage on Wisdom (Survival) checks, and you can't be surprised as long as you are not incapacitated.\n\nAdditionally, you can invoke the totem as a bonus action to enter a state of hyper awareness for 1 minute or until you're incapacitated. Until the state ends, when you or another creature you can see within 60 feet of you makes an attack roll, a saving throw, or an ability check, you can use your reaction to cause the roll to have advantage or disadvantage.",
    "passiveBuffText": "Advantage on Survival; can't be surprised (Vornskr totem)"
  }
];
