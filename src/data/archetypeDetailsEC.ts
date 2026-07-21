// Echoes of the Force (EC) archetypes, sourced from sw5e.com. Two stale duplicate
// entries ("Cybertech Engineering (Depreciated)" and "(Old)") were excluded. Nested
// sub-catalogs referenced within feature text (e.g. modification lists, discovery
// tables) are kept as descriptive text only, consistent with the PHB archetype file.

import type { ArchetypeEntry } from "../types";

export const ARCHETYPES_CATALOG_EC: ArchetypeEntry[] = [
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Slythmonger Savvy",
        "text": "You gain proficiency in your choice of brewer's kit or spicer's kit. Additionally, you have advantage on saving throws to avoid the low or addiction to substances. Lastly, you can consume substances as a bonus action, and when you do so, you can also enter a rage as a part of this same bonus action."
      },
      {
        "level": 3,
        "name": "Freedom Through Slavery",
        "text": "While you are raging or experiencing the high of a substance, you have advantage on saving throws that would force you to act against your will, be frightened, or prevent you from attacking a creature. If you are both raging and experiencing the high of a substance, you are instead immune to effects that would force you to act against your will or would prevent you from attacking a creature."
      },
      {
        "level": 6,
        "name": "Release the Beast",
        "text": "While you are raging or experiencing the high of a substance, when you hit a creature with a melee weapon attack, you can expend a Hit Die to deal additional damage to the target. Roll the Hit Die, adding the result of the die to the damage roll. If you are both raging and experiencing the high of a substance, you also add your Constitution modifier to the damage roll."
      },
      {
        "level": 10,
        "name": "Seeing Sound",
        "text": "While you are raging or experiencing the high of a substance, you have blindsight with a range of 10 feet. If you are both raging and experiencing the high of a substance, you instead have blindsight with a range of 30 feet. If you would already have blindsight, it instead increases by 5 feet or 15 feet, respectively."
      },
      {
        "level": 14,
        "name": "Fuel the Rampage",
        "text": "While you are both raging and experiencing the high of a substance, having 0 hit points doesn't knock you unconscious. You still must make death saving throws, and you suffer the normal effects of taking damage while at 0 hit points. However, if you would die due to failing death saving throws, you don't die until your rage ends, and you die then only if you still have 0 hit points."
      }
    ],
    "name": "Addicted Approach"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Forcecasting",
        "text": "You have learned powers, fragments of knowledge that imbue you with an abiding force ability. See chapter 10 for the general rules of forcecasting and chapter 11 for the force powers list.\n\nYou learn 4 force powers of your choice, and you learn more at higher levels, as shown in the Force Powers Known column of the Adept Specialist Forcecasting table. You may not learn a force power of a level higher than your Max Power Level, and you may learn a force power at the same time you learn its prerequisite.\n\nYou have a number of force points equal to your fighter level, as shown in the Force Points column of the Adept Specialist Forcecasting table, + your Wisdom or Charisma modifier (your choice). You use these force points to cast force powers. You regain all expended force points when you finish a long rest.\n\nMany force powers can be overpowered, consuming more force points to create a greater effect. You can overpower these abilities to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Adept Specialist Forcecasting table.\n\nYou may only cast force powers at 4th-level once. You regain the ability to do so after a long rest.\n\nYour forcecasting ability varies based on the alignment of the powers you cast. You use your Wisdom for light side powers, Charisma for dark side powers, and Wisdom or Charisma for universal powers (your choice). You use this ability whenever a power refers to your forcecasting ability. Additionally, you use this ability modifier when setting the saving throw DC for a force power you cast and when making an attack roll with one.\n\nForce save DC = 8 + your proficiency bonus + your forcecasting ability modifier\n\nForce attack modifier = your proficiency bonus + your forcecasting ability modifier"
      },
      {
        "level": 3,
        "name": "Growing Momentum",
        "text": "You can cast the *burst of speed* force power targeting yourself at 1st-level without expending force points. At 10th level, when you do so, your speed increases by an additional 10 feet. At 18th level, when you do so, your speed increases by an additional 10 feet.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain any expended uses when you finish a long rest."
      },
      {
        "level": 7,
        "name": "Whirling Weapons",
        "text": "Your constant blur of motion and attacks becomes an unending barrage as you build momentum. Once on your turn when you miss with a weapon attack you can make another weapon attack, no action required."
      },
      {
        "level": 10,
        "name": "Focused Breathing",
        "text": "You learn to recover some of your expended power quickly. When you use your Second Wind you also regain a number of force points equal to your Wisdom or Charisma modifier (your choice, a minimum of one)."
      },
      {
        "level": 15,
        "name": "Unstoppable Force",
        "text": "You learn to completely ignore many of the most devastating impediments of combat. You can expend a use of Indomitable to gain the effect of the *freedom of movement* force power until the end of your next turn."
      },
      {
        "level": 18,
        "name": "Instant Acceleration",
        "text": "You reach the pinnacle of your training, moving faster than eyes or most sensors can track. When you use Action Surge feature, you can teleport up to 30 feet to an unoccupied space you can see. You can teleport before or after the additional action."
      }
    ],
    "name": "Adept Specialist"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Forcecasting",
        "text": "You have learned powers, fragments of knowledge that imbue you with an abiding force ability. See chapter 10 for the general rules of forcecasting and chapter 11 for the force powers list.\n\nYou learn 4 force powers of your choice, and you learn more at higher levels, as shown in the Force Powers Known column of the Aing-Tii Order Forcecasting table. You may not learn a force power of a level higher than your Max Power Level, and you may learn a force power at the same time you learn its prerequisite.\n\nYou have a number of force points equal to your monk level, as shown in the Force Points column of the Aing-Tii Order Forcecasting table, + your Wisdom or Charisma modifier (your choice). You use these force points to cast force powers. You regain all expended force points when you finish a long rest.\n\nMany force powers can be overpowered, consuming more force points to create a greater effect. You can overpower these abilities to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Aing-Tii Order Forcecasting table.\n\nYou may only cast force powers at 4th-level once. You regain the ability to do so after a long rest.\n\nYour forcecasting ability varies based on the alignment of the powers you cast. You use your Wisdom for light side powers, Charisma for dark side powers, and Wisdom or Charisma for universal powers (your choice). You use this ability whenever a power refers to your forcecasting ability. Additionally, you use this ability modifier when setting the saving throw DC for a force power you cast and when making an attack roll with one.\n\nForce save DC = 8 + your proficiency bonus + your forcecasting ability modifier\n\nForce attack modifier = your proficiency bonus + your forcecasting ability modifier"
      },
      {
        "level": 6,
        "name": "Flow-Walking",
        "text": "You can cast the *phasestrike* force power without expending force points. When you reach 11th level, the damage bonus of the special attack made during *phasestrike* increases to 2d8, and at 17th level it increases to 3d8.\n\nAdditionally, when you use your action to cast an at-will force power, you can use your Martial Arts or Focus features.\n\nYou can use these features a combined three times. You gain an additional use at 9th, 13th, and 17th level. You regain any expended uses when you finish a long rest."
      },
      {
        "level": 11,
        "name": "Prismatic Step",
        "text": "When you take the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see.\n\nIf you attack at least two different creatures with the action, you can make one additional attack against a third creature (no action required)."
      },
      {
        "level": 17,
        "name": "Iridescent Strikes",
        "text": "When you use your action to cast a force power, you can spend 2 focus points to teleport to a space within 5 feet of a creature affected by the power and make two unarmed strikes against that creature as a bonus action."
      }
    ],
    "name": "Aing-Tii Order"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in astrotech's implements and the Technology skill."
      },
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Aqinos lightsaber form, detailed in the Lightsaber Forms section of the Customization Options document for Expanded Content. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "Techcasting Secrets",
        "text": "You have learned to blend your technological aptitude with the Force. Choose two tech powers of no higher level than your Max Power Level, as shown in the guardian table. The chosen powers count as both universal force powers and tech powers for you, but are not included in the number in the Powers Known column of the guardian table.\n\nYou learn two additional powers at 5th, 9th, 13th, and 17th level. Whenever you gain a level in this class, you can choose one of the tech powers you know and replace it with another tech power of no higher level than your Max Power Level."
      },
      {
        "level": 3,
        "name": "Droid Companion",
        "text": "You learn to employ all the knowledge you've accumulated to create, customize, and bond with your own droid companion.\n\nCreate your droid companion as detailed in the Companions section of the Customization Options document for Expanded Content. You must have astrotech's implements in order to create your droid.\n\nIf your companion is irreparably destroyed, or you want a companion, you must first break the bond with your current companion. Bonding with a new companion takes 8 hours spent in an appropriate location. You may only have one companion at a time.\n\nIn addition to its traits and features, your droid companion gains additional benefits while it is bonded to you:\n- Your companion is a valid target of the *tracker droid interface* tech power.\n- Your companion gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each companion trait in excess of your proficiency bonus, your force point maximum is reduced by 2. Over the course of a long rest, you can replace or remove a number of companion traits equal to half your Intelligence modifier (minimum of one).\n\nLastly, while bonded and within 10 feet of you, your companion can cast the tech powers you know without expending tech points. If your companion casts an at-will power in this way, it does not scale normally at higher levels. Instead, if it would scale at 5th level, it instead scales at 11th level, and if it would scale at 11th level, it instead scales at 17th level. If your companion casts a power of 2nd-level or higher, it consumes a number of uses of this feature equal to that power's level. At 11th level, your droid companion must be within 30 feet of you to benefit from this feature. At 17th level, your droid companion must be within 60 feet. You can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 7,
        "name": "Channel the Force",
        "text": "You learn your choice of the Cause Harm or Lend Aid Channel the Force options, and when you use either of these options, you gain additional benefits.\n\nYou can choose to deal ion damage instead of necrotic.\n\nDroids and constructs are now valid targets."
      },
      {
        "level": 15,
        "name": "Adaptive Calibration",
        "text": "When you reduce a hostile creature to 0 hit points with a tech power, or you restore hit points to a friendly creature that is at 0 hit points with a tech power, you regain an expended use of your Channel the Force, and you gain temporary force points equal to the power's level."
      },
      {
        "level": 20,
        "name": "Master of Adaptation",
        "text": "Your masteries of the Force and technology have achieved equilibrium. Your Constitution and Wisdom or Charisma (your choice) scores increase by 2. Your maximum for those scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to ion damage, and you can't have disadvantage on saving throws against ion or lightning damage.\n- You can't have disadvantage on attack rolls you make as a part of a tech power, and enemies can't have advantage on saving throws against your tech powers.\n- You add your governing ability modifier (minimum of +1) to any damage or healing you do with tech powers you cast that don't already include that modifier.\n\nWhile you are conscious and your droid is within 60 feet of you and conscious, it also gains these benefits.\n\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Aqinos Form"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Studious Excavator",
        "text": "You gain proficiency with archaeologist kits and in the Lore skill. Additionally, you can't have disadvantage on checks you make with them."
      },
      {
        "level": 3,
        "name": "Forcecasting",
        "text": "You have learned powers from your studies of civilizations that were also once close to the Force. See chapter 10 for the general rules of forcecasting and chapter 11 for the force powers list.\n\nYou learn 4 force powers of your choice, and you learn more at higher levels, as shown in the Force Powers Known column of the Archaeologist Pursuit Forcecasting table. You may not learn a force power of a level higher than your Max Power Level, and you may learn a force power at the same time you learn its prerequisite.\n\nYou have a number of force points equal to your scholar level, as shown in the Force Points column of the Archaeologist Pursuit Forcecasting table, + your Intelligence, Wisdom, or Charisma modifier (your choice). You use these force points to cast force powers. You regain all expended force points when you finish a long rest.\n\nMany force powers can be overpowered, consuming more force points to create a greater effect. You can overpower these abilities to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Archaeologist Pursuit Forcecasting table.\n\nYou may only cast force powers at 4th-level once. You regain the ability to do so after a long rest.\n\nYour forcecasting ability varies based on the alignment of the powers you cast. You use your Intelligence or Wisdom for light side powers (your choice), Intelligence or Charisma for dark side powers (your choice), and Intelligence, Wisdom, or Charisma for universal powers (your choice). You use this ability whenever a power refers to your forcecasting ability. Additionally, you use this ability modifier when setting the saving throw DC for a force power you cast and when making an attack roll with one.\n\nForce save DC = 8 + your proficiency bonus + your forcecasting ability modifier\n\nForce attack modifier = your proficiency bonus + your forcecasting ability modifier"
      },
      {
        "level": 3,
        "name": "Archaic Diagnostics",
        "text": "When you analyze a hostile creature, you can use maneuvers that require a weapon attack when you cast a force power that requires a force attack and you can use maneuvers that require a hit with a weapon attack when a creature fails a saving throw against a force power you cast."
      },
      {
        "level": 6,
        "name": "Force Carving",
        "text": "You have unlocked more control over the Force, allowing you to choose wisely who it affects. When you cast a force power that affects other creatures that you can see, you can choose a number of them equal to 1 + the power's level. The chosen creatures automatically succeed on their saving throws against the power, and they take no damage if they would normally take half damage on a successful save."
      },
      {
        "level": 9,
        "name": "Psychometric Analysis",
        "text": "Your strength in the Force and your ability to read the objects around you intensifies. You can use your Critical Analysis to analyze an object of Huge size or smaller that you can see within range. When you do so, you learn whether or not the object is enhanced, cursed, and how old it is. \n\nAdditionally, you can end your Critical Analysis on the object (no action required) to ask it a single question and receive an answer, usually in the form of an auditory or visual hallucination. For example, touching the rusted, broken remains of a lightsaber and asking how it got there may result in a brief vision of a disgruntled Jedi Knight casting it to the ground on that spot. An object �questioned� in this way can only provide information relating to its past. The GM has the final say on what objects can be questioned, and to what extent.\n\nYou can use this feature four times. You gain an additional use at 13th and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 17,
        "name": "Knowledge is Power",
        "text": "You gain the ability to steal the knowledge of how to cast a power from another forcecaster. When a hostile creature casts a force power that affects a friendly creature within range of your Critical Analysis feature, and you use your reaction target that friendly creature with your Critical Analysis feature, you can force the creature casting the power to make a Wisdom or Charisma saving throw (your choice) against your universal force save DC. On a successful save, the power is cast as normal.\n\nOn a failed save, you negate the power's effects, and you steal the knowledge of that power if it is at least 1st level and of a level you can cast. For the next 8 hours, you know the power and can cast it using your force points. The creature cannot cast that power again until the 8 hours have passed.\n\nOnce you've used this feature, you cannot use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Archaeologist Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect your studies into historical civilations. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order. \n\nYour expeditions have turned up a bevy of knowledge on the force. You learn three at-will force powers of your choice, which don't count against your number of force powers known.\n\nYour research into Jedi and Sith combat techniques has allowed you to gain proficiency in simple lightweapons. Additionally, you gain knowledge of one lightsaber form of your choice.\n\n_Prerequisite: 9th level_\nYour knowledge of antiquities is unparalleled. When you make an Intelligence (Lore) check or an ability check with your archaeologist kit, you may treat any roll of a 9 or lower as a 10.\n\n_Prerequisite: 13th level_\nYour affinity for the force allows you to key in to the recent past of an area you enter. When you would expend a use of your Psychometric Analysis, you can instead choose to target your immediate vicinity (up to a 50-foot cube) and investigate for at least 1 minute. For each minute you investigate, you see visions of recent events in the area going back a number of days equal to your scholar level, you learn about one significant event, beginning with the most recent. \n\nYou can investigate in this way for a number of minutes equal to your scholar level and must maintain concentration during that time, as if you were concentrating on a power. \n\nOnce you've used this feature, you can't use it again until you complete a short or long rest.\n\n_Prerequisite: 17th level_\nYou may now cast force powers at 4th-level twice between rests. \n\n_Prerequisite: 9th level_\nYou can cast the *telekinesis* force power at 5th level without spending force points.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\nYour archaeological studies have taken you all across the galaxy. While you are the target of your Critical Analysis feature, you can use your universal forcecasting ability instead of Wisdom when making Insight or Survival checks.\n\n_Prerequisite: 5th level_\nAs a reaction when you take damage, you can entomb yourself in the Force until the end of your next turn. For the duration, you have resistance to the triggering damage, you gain temporary hit points equal to 1d10 + your universal forcecasting ability modifier + your scholar level to potentially absorb the attack, and your speed is reduced to 0.\n\nOnce you've used this feature, you can't use it again until you finish a short or long rest."
      }
    ],
    "name": "Archaeologist Pursuit"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Spiked Armor",
        "text": "You gain proficiency in armormech's implements. Over the course of a long rest, you can customize a suit of light or medium armor into spiked armor. You must have the armor and armormech's implements in order to perform this modification. You can only have one suit of spiked armor at a time.\n\nThis armor gains the barbed (1d4) property. If the armor already has the barbed property, the barbed damage increases by one step (from d4 to d6, or from d6 to d8). Additionally, while raging, you add your rage damage bonus to your barbed damage when you successfully initiate or maintain a grapple.\n\nWhile wearing your spiked armor, you can use your Constitution modifier instead of your Dexterity modifier when determining your AC.\n\nAdditionally, while wearing your spiked armor, you can use your spiked armor as an improvised weapon. When you do so, you are considered proficient with it, and if your armor's barbed damage would be higher than your damage with improvised weapons, you use the barbed damage instead. If you take the Attack action on your turn and make at least one attack with your spiked armor, you can use your bonus action to make an additional attack with your spiked armor against the same target."
      },
      {
        "level": 6,
        "name": "Environmental Shielding",
        "text": "You customize your spiked armor to better protect you. Choose one of the following damage types: acid, cold, fire, lightning, or sonic. While wearing your spiked armor, you have resistance to damage of the chosen type. Over the course of a long rest, you can select a different damage type, provided you have the armor and armormech's implements with you.\n\nAdditionally, while wearing your spiked armor, you have advantage on Constitution saving throws made to avoid exhaustion due to extreme heat or cold."
      },
      {
        "level": 10,
        "name": "Customized Armor",
        "text": "You learn new ways to customize your spiked armor. Choose one of the following options. While wearing your spiked armor, you gain the effects of the chosen option. Over the course of a long rest, you can select a different option, provided you have the armor and armormech's implements with you.\n\nOn your turn, you can use a bonus action to gain temporary hit points equal to 1d12 + your berserker level. Once you use this feature, you must finish a short or long rest before you can use it again.\n\nYour armor class increases by 1.\n\nYou can use a bonus action to launch a grappling line at one creature of your choice that you can see within 15 feet. The target must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Strength modifier) or be pulled up to 10 feet in a straight line towards you. If it ends this movement within 5 feet of you, it takes kinetic damage from your armor spikes equal to your Strength modifier.\n\nYou can use an action to give yourself the benefits of the *true sight* force power for 1 hour. Once you use this feature, you must finish a short or long rest before you can use it again.\n\nYou are immune to all effects that would cause you to be charmed or frightened."
      },
      {
        "level": 14,
        "name": "Spiked Retribution",
        "text": "When a creature within 5 feet of you hits you with a melee attack, the attacker takes kinetic damage equal to your Strength modifier, as long as you are wearing your spiked armor and you aren't incapacitated.\n\nIf you are raging, you add your rage damage bonus to this damage."
      }
    ],
    "name": "Armored Approach"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in artificer's implements, and with the lightsaber simple lightweapon. Additionally, when you engage in crafting with artificer's implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Modified Lightsaber",
        "text": "You learn to modify an unenhanced lightsaber utilizing your artificer knowledge. Over the course of a long rest, you can modify your lightsaber. You must have the lightsaber and artificer's implements in order to perform this modification.\n\nYour modified lightsaber is enhanced, requires attunement, can only be used by you, and counts as a tech focus for your tech powers while you are attuned to it. Your modified lightsaber has 4 modification slots, and it gains more at higher levels, as shown in the Modification Slots column of the engineer table. For each modification installed in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of modifications up to your Intelligence modifier (minimum of one).\n\nSome modification effects require saving throws. When you use such an effect from this class, the DC equals your tech save DC.\n\nAt 9th level, you can maintain two different modified lightsabers. The total modification slots are split across the two items."
      },
      {
        "level": 3,
        "name": "Force Resonance",
        "text": "Once per round, when you hit a creature with your modified lightsaber, you can expend one use of your Potent Aptitude to deal an extra 2d6 damage to that target. The damage is the same type as your modified lightsaber's damage.\n\nThe damage increases when you reach certain levels in this class, increasing to 3d6 at 5th level, 5d6 at 11th level, and 8d6 at 17th level."
      },
      {
        "level": 6,
        "name": "Forcecasting Secrets",
        "text": "Your study of kyber crystals has awakened a latent force sensitivity. Choose two force powers of 1st level. The chosen powers count as tech powers for you, but are not included in the number in the Powers Known column of the engineer table.\n\nAt 7th level, you learn two additional force powers of 1st or 2nd level. At 13th level, you learn two force powers of 1st-3rd level, and at 17th level, you learn two force powers of 1st-4th level. Whenever you gain a level in this class, you can choose one of the force powers you know and replace it with another force power of the same level."
      },
      {
        "level": 14,
        "name": "Disruptive Resonance",
        "text": "When you hit a creature that is concentrating on a power with your modified lightsaber, the creature has disadvantage on the Constitution saving throw to maintain concentration. Additionally, on a failed save, the creature immediately takes psychic damage equal to your engineer level + your Intelligence modifier."
      },
      {
        "level": 18,
        "name": "Resonating Recovery",
        "text": "Once per turn, when you reduce a hostile creature to 0 hit points, you regain a use of your Potent Aptitude. Your number of Potent Aptitude uses can not exceed your Intelligence modifier."
      },
      {
        "level": 3,
        "name": "Artificer Modifications",
        "text": "If a modification has prerequisites, you must meet them to install it. You can install the modification at the same time that you meet its prerequisites.\n\nYou install a second beam port into your modified lightsaber. Your modified lightsaber gains the double (1d8) property. You can only benefit from this property while wielding your modified lightsaber with two hands.\n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to damage rolls made with this weapon. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 15th level, Prototype Blastsaber_\nYou further fine tune your blastsaber. As an action, you can disable a single electronic device not being worn or held by another creature within 5 feet of you. The device is then disabled until it is rebooted.\n\nAdditionally, when you activate this conversion to alter the properties of your lightweapon, you create a projected barrier of ion energy in a 10-foot-radius sphere around you until the start of your next turn. Hostile creatures treat this area as difficult terrain. When a hostile creature enters the shielded area or starts its turn there, that creature takes 3d4 ion damage. Any electronics not being worn or held within the barrier's radius are disabled until rebooted.\n\n_Prerequisite: 15th level, Prototype Brightsaber_\nYou further fine tune your brightsaber. While activated, your modified lightsaber's bright light now automatically dispels illusions and can detect invisibility, as with truesight.\n\nAdditionally, when you activate this conversion to alter the properties of your lightweapon and use a bonus action to attempt to blind your target, it makes the saving throw with disadvantage.\n\n_Prerequisite: 15th level, Prototype Disruptorsaber_\nYou further fine tune your disruptorsaber. While activated, your modified lightsaber lightly obscures the area within 5 feet of it.\n\nAdditionally, when you activate this conversion to alter the properties of your lightweapon and use a bonus action to attempt to knock your target prone, the next saving throw you make before the end of your next turn has advantage.\n\n_Prerequisite: 5th level_\nOn your turn, when you make an attack roll with your modified lightsaber, you can choose to forgo your proficiency bonus. If you do, you can use your reaction to erect a temporary barrier that lasts until the start of your next turn. While the barrier is activated, you have a bonus to AC against the first attack roll made against you equal to your proficiency bonus.\n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to attack rolls made with this weapon. This bonus increases to +2 at 9th level and +3 at 13th level.\n\nA security system is installed into the hilt of your lightweapon. When a creature other than you attempts to activate your lightweapon, the activation fails. Additionally, the creature attempting to activate must make on a Constitution saving throw or take lightning damage equal to engineer level, and become shocked until the start of its next turn. On a successful save the creature takes half damage and is not shocked. Regardless of success or failure, the creature drops your modified lightsaber.\n\n_Incompatible with other conversions_\nYou heavily modify your lightweapon to allow you to make a ranged weapon attack. With this modification, you can make a ranged weapon attack with a range of 30/60. On a hit, it deals 1d6 energy damage.\n\nAdditionally, when you make your first attack on your turn, you can alter the properties of your modified lightsaber. Until the start of your next turn, the damage type of your modified lightsaber is changed to ion. \n\nYou can use this trait a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you complete a short or long rest.\n\n_Incompatible with other conversions_\nYou modify your lightweapon, giving it a brighter glow. While activated, your modified lightsaber sheds bright light in a 20-foot radius and dim light for an additional 20 feet.\n\nAdditionally, when you make your first attack on your turn, you can alter the properties of your modified lightsaber. Until the start of your next turn, the damage type of your modified lightsaber is changed to fire.\n\nYou can use this trait a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you complete a short or long rest.\n\nWhen you score a critical hit with your modified lightsaber, you have advantage on the next attack roll you make against that creature.\n\nYou make minor modifications to the ergonomics of your modified saber's hilt. Your modified lightsaber gains the finesse property.\n\nYou add an energy guard at the base of your modified lightsaber's blade. While wielding your modified lightsaber, you gain a +1 bonus to your armor class against melee weapon attacks.\n\n_Incompatible with other conversions_\nYou modify your lightweapon, causing it to eminate a sickly green light. Your modified lightsaber loses the luminous property.\n\nAdditionally, when you make your first attack on your turn, you can alter the properties of your modified lightsaber. Until the start of your next turn, the damage type of your modified lightsaber is changed to acid.\n\nYou can use this trait a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you complete a short or long rest.\n\nYou install a series of beam focusing amplifiers into your modified lightsaber. Your modified lightsaber gains the reach property.\n\nYou augment the configuration of your modified lightsaber. Your modified lightsaber gains the two-handed property, and it's damage die increases to 1d12.\n\n_Prerequisite: 11th level, Burn Through_\nYour modified lightsaber's critical hit range increases by 1.\n\nYou insert a series of magnetically charged grips into your modified lightsaber's hilt. While wielding your modified lightsaber, you have advantage on ability checks and saving throws made to disarm or avoid being disarmed.\n\n_Prerequisite: 7th level, Blastsaber Conversion_\nYou fine tune your blastsaber. When you activate this conversion to alter the properties of your lightweapon, you can use your bonus action to cause your modified lightsaber to let loose a burst of energy. Creatures other than yourself within 5 feet of the target creature must succeed on a Dexterity saving throw. On a failed save, they take ion damage equal to your Intelligence modifier.\n\n_Prerequisite: 7th level, Brightsaber Conversion_\nYou fine tune your brightsaber. When you activate this conversion to alter the properties of your lightweapon, you can use your bonus action to attempt to blind the target of the attack. The creature must succeed on a Constitution saving throw or be blinded. \n\n_Prerequisite: 7th level, Disruptorsaber Conversion_\nYou fine tune your disruptorsaber. When you activate this conversion to alter the properties of your lightweapon, you can use your bonus action to attempt to knock the target of your attack prone. The creature must make a Strength saving throw or be knocked prone.\n\nYou install a retractible chain in the hilt of your modified lightsaber. Your modified lightsaber gains the thrown property with a range of 20/60, and when you throw the weapon, it immediately returns to your hand."
      }
    ],
    "name": "Artificer Engineering"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Modular Munitions",
        "text": "When you cast a tech power, rather than having it take effect instantly, you can choose to delay the effect to occur on initiative count 20 (losing all initiative ties). When you do so, any creature that leaves the affected area of your tech power is unaffected when the tech power occurs. If the power would only target one creature, and that creature moves from the space it was in when you cast the power, the tech power automatically misses if it would call for an attack roll, as if you had rolled a 1 on the attack, and the creature automatically succeeds on the saving throw against the power if it calls for a saving throw, as if it had rolled a 20 on the save.\n\nAdditionally, when you cast a tech power and choose to delay it in this way, and that tech power would deal damage, you can apply one of the following additional empowerment effects:\n- Flashbang: Each creature damaged by this power must succeed on a Constitution saving throw or be blinded and deafened until the start of your next turn.\n- Mire: Each creature damaged by this power must succeed on a Dexterity saving throw or gain one slowed level until the start of your next turn.\n- Psyche: Each creature damaged by this power must succeed on a Wisdom saving throw or become frightened until the start of your next turn.\n\nIf an empowerment effect calls for a saving throw, the DC equals your tech save DC.\n\nYou can use these features a combined number of times equal to your proficiency bonus, as shown in the scout table. You regain all expended uses when you complete a short or long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 1 tech point to use it. When you do so, your maximum tech points are reduced by 1 until you complete a long rest."
      },
      {
        "level": 3,
        "name": "Mark of the Artillerist",
        "text": "You can now use your Ranger's Quarry feature on a 10-foot cube area within 60 feet of you that you can see. You can treat any creatures inside this cube as if they are the target of your Ranger's Quarry feature, and when a creature is hit by a tech attack or fails a saving throw against a tech power you cast that deals damage, you can apply your Ranger's Quarry damage to that creature.\n\nAt 11th level, you can now use your Ranger's Quarry feature on a 15-foot cube area, instead of a 10-foot cube."
      },
      {
        "level": 7,
        "name": "Sundered Defenses",
        "text": "Your precise bombardments make even the most hardened defenses crumble. When you cast a power that calls for a tech attack or a Dexterity saving throw, it reduces partial cover by one step (from three-quarters to half or half to one-quarter) against creatures affected by it. If an affected creature has one-quarter cover, your power ignores it entirely."
      },
      {
        "level": 11,
        "name": "Target Masking",
        "text": "You are familiar with various turrets and defensive emplacements, and their operation. \n\nAs a bonus action, you can activate a masking effect to confuse the targeting of constructs for 1 minute. Any construct who targets you with an attack, a harmful power, or a hostile action must first make a Wisdom saving throw against your tech save DC. On a failed save, the construct must choose a new target or lose the attack or power. This power doesn't protect you from area effects.\n\nYou can use this feature a combined number of times equal to your proficiency bonus, as shown in the scout table. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 15,
        "name": "Master of Ordnance",
        "text": "You can now expend two uses of your Modular Munitions feature when you cast a tech power to apply two empowerment effects, instead of only one. Additionally, you gain three additional empowerment effects:\n- Confusion: Each creature damaged by this power must make a Charisma saving throw. On a failure, on its next turn, a creature must use its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn.\n- Knockout: Each creature damaged by this power must succeed on a Strength saving throw or be knocked prone.\n- Static: Each creature damaged by this power must succeed on an Intelligence saving throw or become shocked until the start of your next turn.\n\nAdditionally, when you would spend 1 tech point to apply an empowerment effect, it no longer reduces your maximum tech points."
      }
    ],
    "name": "Artillerist Technique"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in artillerist's implements."
      },
      {
        "level": 3,
        "name": "Turret Companion",
        "text": "You learn to apply your knowledge to construct and bond with your own portable turret.\n\nCreate your turret companion as detailed in the Companions section of the Customization Options document for Expanded Content. You must have artillerist's implements in order to create your turret.\n\nIn addition to its traits and features, your turret companion gains additional benefits while it is bonded to you:\n- Your turret is a valid target of the *tracker droid interface* tech power.\n- Your turret gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each turret trait in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of turret traits equal to half your Intelligence modifier (rounded up, minimum of one).\n- When you would make a weapon attack, you can let your turret make a weapon attack instead.\n\nLastly, while your turret is bonded, within 10 feet of you, and the target of your *tracker droid interface* tech power, when you cast a tech power with a range of 5 feet or greater, you can cast it as if you were in your turret's space, and the range increases to 10 feet if it isn't greater.\n\nBoth the range and radius increase to 30 feet at 11th level, and 60 feet at 17th level."
      },
      {
        "level": 3,
        "name": "Mark of the Artillerist",
        "text": "Once per round, when your turret deals damage to the target of your Ranger's Quarry, you can roll your Ranger's Quarry die and add it to the damage roll."
      },
      {
        "level": 7,
        "name": "Crisis Management",
        "text": "While you can see your turret, it can add half its proficiency bonus to any saving throws it makes that doesn't already include it."
      },
      {
        "level": 11,
        "name": "Double Up",
        "text": "When you deal damage to a creature with a weapon or tech power, your turret has advantage on the next attack roll it makes against the creature or it has disadvantage on the first saving throw it makes against an effect your turret controls before the start of your next turn. When your turret deals damage to a creature, you have advantage on your next attack roll against the creature or it has disadvantage on the first saving throw it makes against an effect you control before the start of your next turn."
      },
      {
        "level": 15,
        "name": "Battlefront",
        "text": "When you use your Combat Tech feature, both you and your turret can each make one weapon attack as part of the same bonus action."
      }
    ],
    "name": "Artillerist Technique (Companion)"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in astrotech's implements. Additionally, when you engage in crafting with astrotech's implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Electronic Warfare Platform",
        "text": "You learn to modify your astrotech's implements into a mobile electronic warfare platform. Over the course of a long rest, you can modify your astrotech's implements. You must have astrotech's implements in order to perform this modification.\n\nYour electronic warfare platform is enhanced, requires attunement, can only be used by you, and counts as a tech focus for your tech powers while you are attuned to it. Your electronic warfare platform has 4 modification slots, and it gains more at higher levels, as shown in the Modification Slots column of the engineer table. For each modification installed in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of modifications up to your Intelligence modifier (minimum of one).\n\nSome modification effects require saving throws. When you use such an effect from this class, the DC equals your tech save DC.\n\nYour electronic warfare platform comes equipped with electromagnetic projection and sensing systems, enabling three fields: ionizing, jamming, and targeting. As a bonus action, you can activate a field, which lasts for 1 minute, causing an effect determined by the field. Only one field can be active at a time, and you can end your field at any time on your turn, no action required. The range of your barriers increases to 15 feet at 9th level and 30 feet at 17th level. You can use these fields a combined number of times equal to your proficiency bonus, as shown in the engineer table. You regain all expended uses when you complete a long rest.\n\nWhenever a droid or construct other than you starts its turn within 5 feet of you, it gains 4 slowed levels and takes ion damage equal to half your engineer level. \n\nWhenever you or a friendly creature within 10 feet of you are forced to make a saving throw by a tech power, the creature gains a bonus to the saving throw equal to your Intelligence modifier (minimum of +1). \n\nYou and friendly creatures within 5 feet of you gain a bonus to the first ranged weapon damage rolls you \n\nmake each round equal to your Intelligence modifier (minimum of +1)."
      },
      {
        "level": 3,
        "name": "Potent Electromagnetism",
        "text": "Once per round, when you deal damage to a droid or construct, you can expend one use of your Potent Aptitude to deal an extra 2d6 damage to that target. The damage is the same type as the source of the damage.\n\nThe damage increases when you reach certain levels in this class, increasing to 3d6 at 5th level, 5d6 at 10th level, and 8d6 at 15th level."
      },
      {
        "level": 6,
        "name": "Direct Controller",
        "text": "Your mastery of droids improves your ability to manipulate them. When you cast a power that could affect only droids or constructs, and you only affect droids with the power, you can choose to treat the power as if cast at your Max Power Level.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 14,
        "name": "Systems Hijack",
        "text": "All droids, constructs, and creatures wearing or holding a techcasting focus within 120 feet are viable targets for any tech powers which you cast with a range of touch."
      },
      {
        "level": 18,
        "name": "Electromagnetic Burst",
        "text": "As an action, you can end your field in a electromagnetic burst of power with an effect determined by the field you were generating.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\nChoose up to 10 creatures of your choice that are within 60 feet. Each must make a Constitution saving throw. On a failed save, a target takes 14d6 ion damage and is stunned until the start of your next turn. On a success, it takes half damage and isn't stunned.\n\nChoose up to 10 creatures of your choice that are within 60 feet. Once in the next minute, when a chosen creature fails a saving throw caused by a tech power or is hit by an attack power, the creature can choose to succeed on the saving throw or have the attack miss instead.\n\nChoose up to 10 creatures of your choice that are within 60 feet. Each creature must succeed on a Constitution saving throw against your tech save DC or be blinded for 1d4+1 turns."
      },
      {
        "level": 3,
        "name": "Astrotech Modifications",
        "text": "If a modification has prerequisites, you must meet them to install it. You can install the modification at the same time that you meet its prerequisites.\n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to melee tech attack rolls. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to ranged tech attack rolls. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 15th level, Hardening_\nYou have resistance to ion damage.\n\n_Prerequisite: 15th level, Prototype Grounding System_\nYou have resistance to lightning damage.\n\n_Prerequisite: 15th level, Prototype Jamming Phased Array_\nWhile your jamming field is active, any hostile creature within the field must make a Constitution saving throw at the end of each of its turns to maintain concentration on the power.\n\n_Prerequisite: 15th level, Prototype Pulsating Phased Array_\nWhile your ionizing field is active, your tech powers and class features ignore resistance to ion damage, and immunity to ion damage is instead treated as resistance from any creature within range of your field.\n\nAdditionally, when you use your Ionizing Phased Array feature, you create a fourth blast.\n\n_Prerequisite: 15th level, Prototype Targeting Phased Array_\nWhile your targeting field is active, as an action, you can allow a number of allies within the field up to your Intelligence modifier (minimum of one) to use their reaction to make a ranged weapon attack against a single target you can see.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\nWhen you would install a restraining bolt, you can do so in half the time. Additionally, when determining the save DC of a restraining bolt you control, you can use your tech save DC, if it would be higher than the item's DC.\n\nYou affix a targeted light to your electronic warfare platform. As a bonus action, you can toggle the light on or off. While on, your electronic warfare platform sheds bright light in a 60-foot cone.\n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to the tech save DC of powers you cast that requires a Strength or Constitution saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\nYou have advantage on saving throws against lightning damage.\n\nAs a bonus action, you may choose any number of creatures that you can see within 60 feet of you that have commlinks, headcomms, or other such communications devices. Each creature must succeed on a Constitution saving throw or take sonic damage equal to your Intelligence modifier (minimum of one). Additionally, on a failed save, their communication devices are disabled until rebooted.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\nYou have advantage on saving throws against ion damage.\n\n_Prerequisite: 9th level_\nYou can cast the *override interface* tech power at 5th level without spending tech points.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\n_Prerequisite: 5th level_\nWhile your ionizing field is active, as an action, you can send forth blasts of directed ionic energy. Make two ranged tech attacks against targets within the field. These attacks can target the same creature or different ones. Make separate attack rolls for each blast. The attack deals 1d6 ion damage on a hit.\n\nWhile your jamming field is active, as an action, you can choose a number of creatures concentrating on a power equal to your Intelligence modifier (a minimum of one) within your field, and force them to make a Concentration saving throw. If you cause at least one creature to lose concentration on a power using this feature, you can use your reaction to make all creatures that lost concentration take ion damage equal to your Intelligence modifier.\n\nYour electronic warfare platform can store 20 lb., not exceeding 1 cubic foot, which does not count towards your encumbrance.\n\n_Prerequisite: 7th level_\nYou further tweak your transmitter design, extending the area of your fields.  When you activate a field you may choose to double the radius of your field.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\n_Prerequisite: 7th level, Grounding System_\nYou have immunity to the shocked condition.\n\n_Prerequisite: 7th level, Jamming Phased Array_\nWhile your jamming field is active, when a creature within your field attempts to cast a tech power, you can use your reaction to cast the *tech override* power at 3rd level without spending tech points. When you cast this power using this feature and you make the techcasting ability check as a part of this casting, you add your proficiency bonus to the check.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\n_Prerequisite: 7th level, Ionizing Phased Array_\nWhile your ionizing field is active, when you cast a tech power or use a class feature that affects other creatures within the radius of your field, you can choose a number of them equal to 1 + the power's level. The chosen creatures automatically succeed on their saving throws against the power, and they take no damage if they would normally take half damage on a successful save.\n\nAdditionally, when you use your Ionizing Phased Array feature, you create a third blast.\n\n_Prerequisite: 7th level, Target Marking Phased Array_\nWhile your targeting field is active, as an action, you can cast the *scramble interface* power at 3rd level without spending tech points. \n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\n_Prerequisite: 15th level_\nYou can have two fields active at a time. \n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to the tech save DC of powers you cast that requires a Dexterity or Intelligence saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nAll creatures within 10 feet of you become undetectable to electronic sensors and cameras for the next 10 minutes. Anything these creatures are wearing or carrying is also undetectable, so long as it's on the creature's person. The creatures are still visible to regular vision.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\n_Prerequisite: 7th level_\nYou integrate a portable, personal cloaking device into your electronic warfare platform. Activating or deactivating the generator requires a bonus action and, while active, you have advantage on Dexterity (Stealth) ability checks that rely on sight. The generator lasts for 1 minute. This effect ends early if you make an attack or cast a force or tech power.\n\nOnce the generator has been activated, it can't be activated again until you finish a short or long rest.\n\n_Prerequisite: 5th level_\nWhile your targeting field is active, as an action, you can choose a number of creatures equal to your Intelligence modifier you can see within 60 feet (a minimum of one creaeture), and force them to make a Dexterity saving throw. On a failed save, all ranged weapon attacks made by allies within your field against the target have advantage until the beginning of your next turn.\n\n_Prerequisite: 11th level, Flashlight Attachment_\nYou modify your electronic warfare platform with a toggle allowing you to briefly gain enhanced sight. As a bonus action, you can activate the truesight feature of your electronic warfare platform. When toggled on, for the next minute your electronic warfare platform now automatically dispel illusions and can detect invisibility, as with truesight.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to the tech save DC of powers you cast that requires a Wisdom or Charisma saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nYou tweak your sensors to find weak points in thick armor. Your weapon attacks and tech powers deal double damage against constructs."
      }
    ],
    "name": "Astrotech Engineering"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in astrotech's implements. Additionally, when you engage in crafting with astrotech's implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Droid Companion",
        "text": "You employ all the knowledge you've accumulated to create and bond with your own droid companion.\n\nCreate your droid companion as detailed in the Companions section of the Customization Options document for Expanded Content. You must have astrotech's implements in order to create your droid.\n\nIn addition to its traits and features, your droid companion gains additional benefits while it is bonded to you:\n- Your droid is a valid target of the *tracker droid interface* tech power.\n- Your droid gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each droid trait in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of droid traits equal to half your Intelligence modifier (minimum of one).\n\nLastly, while bonded and within 10 feet of you, when you would use your action to cast a 1st-level tech power, you can instead have your droid companion cast it. You still expend tech points as normal, and if the power requires concentration, it still uses your concentration. Your droid companion must use its action, and it uses its tech attack modifier and tech save DC instead of your own. At 5th level, your droid can cast 2nd-level tech powers in this way. This increases to 3rd-level powers at 9th level, 4th-level powers at 13th level, and 5th-level powers at 17th level. When you cast a power, you consume a number of uses of this feature equal to that power's level.\n\nAt 11th level, your droid companion must be within 30 feet of you to benefit from this feature. At 17th level, your droid companion must be within 60 feet.\n\nYou can use this feature four times, and you gain more uses at higher levels, as shown in the Modification Slots column of the engineer table. Each time you use this feature in excess of your proficiency bonus, your tech point maximum is reduced by 1 until you complete a long rest. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 3,
        "name": "Potent Integration",
        "text": "When your droid makes an attack roll, you can use your reaction to expend one use of your Potent Aptitude to give it a boost. Roll the die and add it to both the attack and damage rolls, if the attack hits."
      },
      {
        "level": 6,
        "name": "Direct Controller",
        "text": "Your mastery of droids improves your ability to manipulate them. When you cast a power that could affect only droids or constructs, and you only affect droids with the power, you can choose to treat the power as if cast at your Max Power Level.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 14,
        "name": "Coordinated Attack",
        "text": "When you are the source of an effect that would force other creatures to make a saving throw, and your droid is one of those creatures, you can have your droid automatically succeed on the save. When your droid is the source of an effect that would force other creatures to make a saving throw, and you are one of those creatures, you can choose to automatically succeed on the save."
      },
      {
        "level": 18,
        "name": "Droid Defense",
        "text": "While your droid can see you, it has advantage on all saving throws."
      }
    ],
    "name": "Astrotech Engineering (Companion)"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Ataru lightsaber form, detailed in Chapter 6 of the Player's Handbook. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Hawk-Bat",
        "text": "As a bonus action, you can take an aggressive stance, leaping around the battlefield for 1 minute. As a part of this bonus action, and as a bonus action on each of your turns, you can cast the *force jump* power at 1st-level without expending force points. Additionally, when you cast *force jump*, you have advantage on the first attack roll you make against each creature within 5 feet of where you land.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain the following Channel the Force option.\n\nWhen a creature makes a melee attack roll against you, you can expend a use of your Channel the Force and your reaction to jump 10 feet in a direction of your choice, imposing disadvantage on the roll. This movement does not provoke opportunity attacks. You can wait until after the attack roll is made, but before the DM determines whether the attack hits."
      },
      {
        "level": 7,
        "name": "Hawk-Bat Swoop",
        "text": "You gain the ability to move along vertical surfaces without falIing during the move. If you end your turn in the air, you fall immediately to the ground.\n\nAdditionally, you no longer take damage when falling from a distance no greater than your walking speed."
      },
      {
        "level": 15,
        "name": "Whirlwind Attack",
        "text": "You can use your action to make melee attacks against any number of creatures within 5 feet of you, with a separate attack roll for each target."
      },
      {
        "level": 20,
        "name": "Master of Aggression",
        "text": "Your presence on the field of battle is as a graceful blur of deadly blades and daring acrobatics. Your Dexterity and Wisdom or Charisma scores (your choice) increase by 2. Your maximum for those scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to kinetic, energy, and ion damage from weapons.\n- When an ally within 30 feet of you takes the Attack action, they can make one additional attack as a part of that same action.\n- When you hit a creature with a weapon attack, you can move up to 10 feet. This movement does not provoke opportunity attacks.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Ataru Form"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in three musical instruments and audiotech's implements. Additionally, when you engage in crafting with audiotech�s implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Modified Instrument",
        "text": "You learn to modify an instrument utilizing your audiotech knowledge. Over the course of a long rest, you can modify an instrument. You must have the instrument and audiotech's implements in order to perform this modification.\n\nYour modified instrument is enhanced, requires attunement, can only be used by you, and counts as a tech focus for your tech powers while you are attuned to it. Your modified instrument has 4 modification slots, and it gains more at higher levels, as shown in the Modification Slots column of the engineer table. For each modification installed in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of modifications up to your Intelligence modifier (minimum of one).\n\nSome modification effects require saving throws. When you use such an effect from this class, the DC equals your tech save DC."
      },
      {
        "level": 3,
        "name": "Potent Amplitude",
        "text": "As an action while wielding your modified instrument, you can begin performing an enhanced song, which lasts for 1 minute. While playing a song, you gain access to a new use for your Potent Aptitude, as determined by the song, listed below. You can end your song at any time, no action required.\n\nWhenever you take damage while playing your song, you must make a Constitution saving throw to continue playing. The DC equals 10 or half the damage you take, which number is higher. If you take damage from multiple sources, you must make a separate saving throw for each source of damage.\n\nWhen you cast a damage dealing tech power while playing your song that requires an attack roll or saving throw, you can cause that power to instead deal sonic damage. If you do so, instead of an attack roll or saving throw, the power instead requires a Constitution saving throw.\n\nYour song ends early if you are incapacitated or die, or if you are no longer holding your modified instrument.\n\nYou can initiate playing an enhanced song twice. You regain all expended songs when you finish a short or long rest.\n\nWhen an ally within 60 feet of you that can hear you deals damage to a creature, you can use your reaction to expend one use of your Potent Aptitude, adding the result of the die to the damage dealt.\n\nWhen an ally within 60 feet of you that can hear you makes a saving throw against a harmful effect, you can use your reaction to expend one use of your Potent Aptitude, adding the result of the die to their saving throw.\n\nWhen an enemy within 60 feet of you that can hear you makes a saving throw, you can use your reaction to expend one use of your Potent Aptitude, subtracting the result of the die from their saving throw."
      },
      {
        "level": 6,
        "name": "Concussive Blast",
        "text": "You add your Intelligence modifier (a minimum of +1) to any damage you deal with tech powers and class features that deal sonic damage."
      },
      {
        "level": 14,
        "name": "Smooth Rhythm",
        "text": "Whenever you use your Potent Aptitude while your playing an enhanced song, you can roll a d6 and use it instead of expending a Potent Aptitude Dice."
      },
      {
        "level": 18,
        "name": "Legendary Coda",
        "text": "You've gained mastery over your modified instrument. As an action, you can end your enhanced song in a triumphant blast of power with an effect determined by the song you are playing.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\nChoose up to 10 creatures of your choice that you can see and that can hear your song. Each must make a Constitution saving throw. On a failed save, a target takes 14d6 sonic damage and is stunned for 1d4+1 turns. On a success, it takes half damage and isn't stunned. If a creature is killed by this power, its head explodes.\n\nChoose up to 10 creatures of your choice that you can see and that can hear your song. Once in the next minute, each creature can, as a free action in response to taking damage, choose to halve that damage. Additionally, if the damage would reduce them to 0 hit points, they are instead reduced to 1.\n\nChoose up to 10 creatures of your choice that you can see and that can hear your song. Each creature must succeed on a Constitution saving throw or be paralyzed for 1d4+1 turns. If a creature affected by this feature is damaged in any way, the effect ends for that creature."
      },
      {
        "level": 3,
        "name": "Audiotech Modifications",
        "text": "If a modification has prerequisites, you must meet them to install it. You can install the modification at the same time that you meet its prerequisites.\n\n_Prerequisite: 15th level, Prototype Battle Enhancement_\nWhile playing your Song of Battle, your tech powers and class features ignore resistance to sonic damage, and immunity to sonic damage is instead treated as resistance from any creature within range of your song that can hear you.\n\nAdditionally, when you use your Battle Song Enhancement feature, you create a fourth burst.\n\n_Prerequisite: 15th level, Prototype Disruption Enhancement_\nWhile playing your Song of Disruption, any hostile creature within range of your song that can hear you must make a Constitution saving throw at the end of each of its turns to maintain concentration on the power.\n\n_Prerequisite: 15th level, Prototype Support Enhancement_\nWhile playing your Song of Support, allies add your Intelligence modifier to their death saving throws (minimum of +1). If this amount would increase the roll of the d20 to 20 or greater, the creature regains 1 hit point.\n\n_Prerequisite: 5th level_\nWhile playing your Song of Battle, as an action, you can send forth busts of directed sonic energy, make two ranged power attacks. These attacks can target the same creature different ones. Make separate attack rolls for each burst. The attack has a range equal to the radius of your song, and deals 1d8 sonic damage on a hit. \n\n_Prerequisite: 5th level_\nWhile playing your Song of Disruption, as an action, you can choose a number of creatures concentrating on a power equal to your Intelligence modifier (a minimum of one) within range of your song that can hear you, and force them to make a Concentration saving throw. If you cause at least one creature to lose concentration on a power using this feature, you can use your reaction to make all creatures that lost concentration take damage equal to your Intelligence modifier.\n\n_Prerequisite: 13th level, Hypnotic Melody_\nFor the duration of an enhanced song you play, whenever any creature that can hear your song tries to attack you for the first time on a turn, the attacker must make a Charisma saving throw. On a failed save, it can't attack you on this turn, and it must choose a new target for its attack or the attack is wasted. On a successful save, it can attack you on this turn, but it has disadvantage on any saving throw it makes against your powers or features on your next turn.\n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\n_Prerequisite: Rush_\nWhile you are playing an enhanced song, when a creature would make a melee attack roll against you, you can use your reaction to move 5 feet without provoking opportunity attacks, imposing disadvantage on the roll. \n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nAs an action while wielding your modified instrument, you can begin to play a song woven with subtle hypnotic influence. Choose a number of creature up to your Intelligence modifier. If those creatures listen to this song for a full minute, they must succeed on a Wisdom saving throw or become charmed by you for 1 minute. Creatures that succeed the saving throw are not aware that you attempted to influence them, nor are creatures that failed their saving throw once the power ends.\n\nOnce you've used this feature, you can't use it again until you finish a short or long rest.\n\n_Prerequisite: 7th level, Simple Melodies_\nWhen you cast a tech power or make use of a feature that requires playing your modified instrument, you can choose to do so quietly. Creatures have disadvantage on Intelligence (Investigation) and Wisdom (Perception) checks that rely on sound to determine you cast a tech power.\n\n_Prerequisite: 13th level_\nThe radius of your songs increases to 120 feet. Additionally, any tech power you cast with your modified instrument that deals sonic damage and has a range of 10 feet or greater gains a range of 120 feet.\n\n_Prerequisite: 5th level_\nWhile using your instrument as a tech focus, you gain a +1 bonus to tech attack rolls. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 15th level_\nWhile playing, creatures of your choice treat a 15-foot-radius sphere around you as difficult terrain. Additionally, as an action, you can cause each affected creature to make a Constitution saving throw, taking 3d8 sonic damage on a failed save.\n\n_Prerequisite: 9th level, Battle Song Enhancement_\nWhile playing your Song of Battle, when you cast a tech power or use a class feature that affects other creatures within the radius of your song, you can choose a number of them equal to 1 + the power's level. The chosen creatures automatically succeed on their saving throws against the power, and they take no damage if they would normally take half damage on a successful save.\n\nAdditionally, when you use your Battle Song Enhancement feature, you create a third burst.\n\n_Prerequisite: 9th level, Disruption Song Enhancement_\nWhile playing your Song of Disruption, when a creature you can see that can hear you attempts to cast a power, you can use your reaction to cast the *tech override* power at 3rd level. When you cast this power using this feature, the power works against both tech and force powers, and when you make the techcasting ability check as a part of this casting, you your proficiency bonus to the check.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\n_Prerequisite: 9th level, Support Song Enhancement_\nWhile playing your Song of Support, when you use your Song of Support's Potent Amplitude feature, the target instead takes no damage if they succeed on the saving throw, and only half damage if they fail.\n\nOver the course of a short rest, you can play a rejuvenating song to assist in the recovery of your allies. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest, each of those creatures regains an extra 1d6 hit points.\n\nThe extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d 10 at 13th level, and to 1d12 at 17th level.\n\nWhile you are playing an enhanced song, your speed increases by 10 feet, and opportunity attacks made against you have disadvantage.\n\nAs an action while wielding your modified instrument, choose a creature you can see. If it can hear you, it must succeed on a Constitution saving throw or take 1d4 sonic damage and have disadvantage on its next attack roll before the end of its next turn.\n\nThis feature's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).\n\n_Prerequisite: 5th level_\nWhile using your instrument as a tech focus, you gain a +1 bonus to your tech save DC. This bonus increases to +2 at 9th level and +3 at 13th level.\n\nWhen you are holding your modified instrument, and not actively playing a song, any tech power that you could cast that could have its damage type altered by your Potent Amplitude feature can be cast as if used with Potent Amplitude. \n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nAs an action while wielding your modified instrument, you can release a wave of sound that provides feedback on your surroundings. For the next minute, you have advantage on Wisdom (Perception) and Intelligence (Investigation) checks to search for hidden doors, traps, or invisible creatures.\n\nOnce you've used this feature, you can't use it again until you finish a short or long rest.\n\n_Prerequisite: 11th level_\nWhile playing an enhanced song, you can use your bonus action to change from one song to another.\n\n_Prerequisite: 5th level_\nWhile playing your Song of Support, when you cast a tech power that restores hit points or grants temporary hit points, the amount restored or granted is increased by an amount equal to your Intelligence modifier (minimum of +1).\n\nYou can integrate a single weapon that weighs no more than 8 lb. into your instrument. While integrated, that weapon gains the hidden property."
      }
    ],
    "name": "Audiotech Engineering"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Bestial Fury",
        "text": "While raging, you have advantage on any Wisdom (Perception) or Wisdom (Survival) checks.\n\nAdditionally, once on each of your turns while raging, you can mark a creature you can see as your prey for the duration of your rage (no action required). When you do so, once per turn when you deal damage to the creature with a weapon attack, you deal an additional 1d4 damage of the same type. Once per turn when the creature deals damage to you with a weapon attack, you take an additional 1d4 damage of the same type. This die increases to d6 at 5th level, d8 at 9th level, d10 at 13th level, and d12 at 17th level. You can only have one creature marked in this way at a time."
      },
      {
        "level": 3,
        "name": "Pack Tactics",
        "text": "When you have advantage on an attack roll against a creature, another enemy of the creature is within 5 feet of it, that enemy isn't incapacitated, you can reroll one of the dice once."
      },
      {
        "level": 6,
        "name": "Animalistic Momentum",
        "text": "You gain a your choice of a climbing or swimming speed equal to your walking speed. Additionally, you gain an effect while raging based on your choice of speed:\n- If you chose a climbing speed, you can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.\n- If you chose a swimming speed, you can use your bonus action to Dash or Disengage while in water."
      },
      {
        "level": 10,
        "name": "Lick Wounds",
        "text": "Whenever you reduce a creature to 0 hit points while raging, you gain a number of temporary hit points equal to your berserker level, which last for the duration of your rage."
      },
      {
        "level": 14,
        "name": "Hunter's Call",
        "text": "When you enter your rage, you can choose up to 5 allies that you can see within 30 feet of you. You gain 5 temporary hit points for each creature. For the duration of your rage, once on each of their turns, an affected ally can add your rage damage bonus to a weapon attack's damage roll.\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a long rest."
      }
    ],
    "name": "Beastmaster Approach"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in Animal Handling."
      },
      {
        "level": 3,
        "name": "Beast Companion",
        "text": "You learn to capitalize on a primal attunement to nature to forge a powerful bond with your own beast companion.\n\nCreate your beast companion as detailed in the Companions section of the Customization Options document for Expanded Content. \n\nIn addition to its traits and features, your beast companion gains additional benefits while it is bonded to you:\n- Your beast gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each beast trait in excess of your proficiency bonus, your number of available Hit Dice that can be spend to restore hit points is reduced by 1.\n\nLastly, while bonded and within 10 feet of you, your beast companion gains the benefits of one of your chosen instincts. If that instinct relies on raging, your beast companion gains the benefits of that instinct while you are raging.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet."
      },
      {
        "level": 3,
        "name": "Pack Tactics",
        "text": "When you have advantage on an attack roll against a creature your companion has dealt damage since the start of your last turn, you can reroll one of the dice once. When your companion has advantage on an attack roll against a creature you've dealt damage since the start of your last turn, it can reroll one of the dice once."
      },
      {
        "level": 6,
        "name": "Animalistic Momentum",
        "text": "Your bond with your beast companion strengthens, granting the following benefits while your beast companion is within 10 feet of you:\n- If you or your beast have a climbing or swimming speed and the other doesn't, the other gains it with the same speed. If you both have the a climbing or swimming speed, you both use the larger speed of the two, which then increases by 5 feet.\n- Whenever your beast deals damage to a hostile creature you can see on your turn, it counts as you taking a hostile action for the purposes of maintaining your rage.\n\nThis radius increases to 30 feet at 11th level 60 feet at 17th level."
      },
      {
        "level": 10,
        "name": "Lick Wounds",
        "text": "Whenever your companion reduces a creature to 0 hit points while you are raging, it gains a number of temporary hit points equal to your berserker level, which last for the duration of your rage."
      },
      {
        "level": 14,
        "name": "Hunter's Call",
        "text": "When you enter your rage, you can choose up to 5 allies that you can see within 30 feet of you. You gain 5 temporary hit points for each creature. For the duration of your rage, once on each of their turns, an affected ally can add your rage damage bonus to a weapon attack's damage roll.\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a long rest."
      }
    ],
    "name": "Beastmaster Approach (Companion)"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in the Medicine skill, biochemist's kits, and poisoner's kits. Additionally, when you engage in crafting with biochemist's kits and poisoner's kits, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Modified Biochemist's Pack",
        "text": "You learn to modify and combine your biochemist's kit and poisoner's kit, creating a mobile laboratory using your chemistry expertise. Over the course of a long rest, you can create your modified biochemist's pack. You must have a biochemist's kit, a poisoner's kit, and materials in order to perform this modification.\n\nYour biochemist's pack is enhanced, requires attunement, can only be used by you, and counts as a tech focus for your tech powers while you are attuned to it. Your modified biochemist's pack has 4 modification slots, and it gains more at higher levels, as shown in the Modification Slots column of the engineer table. For each modification installed in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of modifications up to your Intelligence modifier (minimum of one).\n\nSome modification effects require saving throws. When you use such an effect from this class, the DC equals your tech save DC.\n\nYour modified biochemist's pack comes equipped with a chemical distribution system, complete with three chemical mixtures: corrosive, invigorating, and noxious. As an action, you can activate your distributor and target a creature within 30 feet, with an effect determined by the mixture.\n\nYour distributor emits a burst of acid. The target must make a Dexterity sav-ing throw. On a failed save, a creature takes 1d6 + your Intelligence modifier acid damage. This mixture's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).\n\nYour distributor emits a bolt of kolto. The target gains 1d6 + your Intelligence modifier temporary hit points, which last until the end of your next turn. The temporary hit points granted by this mixture increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).\n\nYour distributor emits a cloud of poison. The target must make a Constitution saving throw. On a failed save, a creature takes 1d6 + your Intelligence modifier poison damage. This mixture's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
      },
      {
        "level": 3,
        "name": "Biochemist's Touch",
        "text": "Whenever you grant temporary hit points, or deal acid or poison damage using a tech power or class feature, you may expend one use of your Potent Aptitude to increase the potency. When you do so, the amount of temporary hit points you grant or damage you deal is increased by the amount rolled on the die. The damage is the same type as the original damage."
      },
      {
        "level": 6,
        "name": "Potent Mixtures",
        "text": "When you cast a tech power of 1st-level or higher that grants temporary hit points, or deals acid or poison damage, you add your Intelligence modifier (a minimum of +1) to the roll."
      },
      {
        "level": 14,
        "name": "Epicenter",
        "text": "As a reaction when you take damage from a creature within 15 feet of you that you can see, you can use one of your mixtures. The effects of the mixture release in a 15-foot-radius sphere centered on you, and if the mixture requires a saving throw, you automatically succeed on it. Additionally, the affected area is difficult terrain to creatures other than you until the end of your next turn.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 18,
        "name": "Masterful Mixtures",
        "text": "When you deal acid or poison damage using a tech power or class feature, you ignore resistance and treat immunity as resistance."
      },
      {
        "level": 3,
        "name": "Biochem Modifications",
        "text": "If a modification has prerequisites, you must meet them to install it. You can install the modification at the same time that you meet its prerequisites.\n\n_Prerequisite: 5th level_\nWhile using your biochemist's pack as a tech focus, you gain a +1 bonus to tech attack rolls. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nWhile using your biochemist's pack as a tech focus, you gain a +1 bonus to your tech save DC. This bonus increases to +2 at 9th level and +3 at 13th level.\n\nYou may choose one type of damage that benefits from your Biochemist's Touch and Potent Mixtures features. While wearing your modified biochemist's pack you have resistance to that type of damage.\n\nYou can select this modification multiple times. Each time you do so, you must choose a different damage type.\n\nWhen you or an ally within 30 feet of you is suffering from the poisoned condition, you may use your reaction on your turn to end the poisoned condition on that creature. The creature also gains immunity to the poisoned condition for one minute.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nYou upgrade your distributor with a secondary, detachable distributor. As a bonus action, you can throw your detachable distributor at a point within range. Your detachable distributor has a range equal to 30 feet + your Strength modifier x 5. Your detachable distributor works for 1 minute before coming inert. Once it does so, you can't use it again until you recover it as an action.\n\nAdditionally, while your detachable distributor is within 100 feet of you, when you use your action to activate your distributor, you can choose to affect each creature within 5 feet of your detachable distributor. You can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nYou upgrade your distributor, interfacing it with the target of your *tracker droid interface* power. When you use your action to activate your distributor, while your tracker droid is within 100 feet of you, you can choose to have your tracker droid deliver the mixture. Your tracker droid must use its reaction to deliver the mixture.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You \n\nregain all expended uses when you complete a short or long rest.\n\n_Prerequisite: 5th level_\nYou add additional chemicals to your modified biochemist's pack. When you deal fire damage with a tech power or class feature, you can use your Biochemist's Touch and Potent Mixture features.\n\nAdditionally, when a creature fails their Dexterity saving throw against your Corrosive Mixtures feature, you can choose to instead deal fire damage. If you do so, each creature within 5 feet of the target takes fire damage equal to your Intelligence modifier. You can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\n_Prerequisite: 5th level_\nYou add additional chemicals to your modified biochemist's pack. When you deal cold damage with a tech power or class feature, you can use your Biochemist's Touch and Potent Mixture features.\n\nAdditionally, when a creature fails their Constitution saving throw against your Noxious Mixtures feature, you can choose to instead deal cold damage. If you do so, it gains 1 slowed level until the start of your next turn. You can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\n_Prerequisite: 5th level_\nYou add additional chemicals to your modified biochemist's pack. When you restore hit points with a tech power or class feature, you can use your Biochemist's Touch and Potent Mixture features.\n\nAdditionally, when you use your Invigorating Mixture to grant temporary hit points to a creature, you can choose to restore that many hit points to the same creature. You can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nYou've created a new mixture from your chemicals that you can use when you activate your distributor. When you do so, the target creature must make a Strength saving throw. If the creature is Large or larger, it has advantage on the saving throw. On a failed save, a creature gains 4 slowed levels until the start of your next turn. As an action on their turn, an affected creature can repeat this saving throw, ending the effect on a success. \n\nYou've created a new mixture from your chemicals that you can use when you activate your distributor. When you do so, the target creature must make a Constitution saving throw. On a failed save, a creature \n\nis blinded until the start of your next turn.\n\nYou've created a new mixture from your chemicals that you can use when you activate your distributor. When you do so, the target creature must make an Intelligence saving throw. On a failed save, the target loses the ability to distinguish friend from foe, regarding all creatures it can see as enemies until the end of your next turn. Each time the target takes damage, it can repeat the saving throw, ending the effect on itself on a success. \n\nWhenever the affected creature chooses another creature as a target, it must choose the target at random from among the creatures it can see within range of the attack, power, or other ability it's using. If an enemy provokes an opportunity attack from the affected creature, the creature must make that attack if it is able to.\n\nThis feature has no effect on droids or constructs.\n\nYou upgrade your distributor, granting it the ability to create a volley. When you use your action to activate your distributor, you can choose to affect each creature in a 10-foot-radius sphere centered on a point you can see within 30 feet.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nYou install a wrist mounted injection apparatus into your modified biochemist's pack. It is a simple vibroweapon with the finesse and light properties, and deals 1d4 kinetic damage on a hit. Your injection apparatus does not fill the hand slot, but you can't use it while the hand is full.\n\nWhen you hit with the weapon, you can activate your distributor to deploy one of your mixtures. If you do so, the target has disadvantage on the saving throw against your mixture.\n\nYou gain immunity to the poisoned and disease conditions.\n\nYou make several additions to your modified biochemist's pack, you are protected from hazardous conditions, as if wearing an EVA suit, for as long as you are wearing your modified biochemist's pack.\n\n_Prerequisite: 9th level_\nYou add a special dispersal system to your modified biochemist's pack. This system slowly disperses small amounts of kolto in the air. If creatures spend the entirety of a long rest within 30 feet of you, they regain all expended Hit Dice, instead of only half. Additionally, they are cured of any poisons or diseases that are suffering from.\n\nYou upgrade your distributor, improving the range. When you use your action to activate your distributor, \n\nyou can choose to increase the range to 60 feet.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest.\n\nYou've added a light-emitting gel to your modified biochemist's pack. As an action, you can coat an item, object, or location up to 5-foot-square with this gel. When you do so, the gel sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The gel lasts for 1 hour before losing its potency. You can end this effect as a bonus action.\n\nAs an action, you can cast the *oil slick* tech power without expending tech points. Casting the power in this way does not require concentration, and the oil will remain in place for the full duration of the power.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\n_Prerequisite: 7th level_\nWhenever you use your Biochemist's Touch feature, you may select one creature that was damaged. At the start of each of that creature's turns, it must make a Constitution saving throw. On a failed save, it takes damage of the triggering type equal to your Intelligence modifier and has disadvantage on attack rolls until the start of its next turn. On a success, this feature ends, and the creature becomes immune to it for one day.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\n_Prerequisite: 11th level, Luminous Gel_\nYour luminous gel now automatically dispels illusions and can detect invisibility, as with truesight.\n\nYou install a special kolto injector into your modified biochemist's pack that can inject you with kolto in response to pain. When you take damage, you can use your reaction and expend a Hit Die to regain health as long as the damage would not reduce your hit points to 0.\n\nWhen you activate your distributor, you can choose a number of creature equal to your Intelligence modifier. Those creature automatically succeed on their saving throws against your mixtures.\n\nYou upgrade your distributor, granting it the ability to spray in a cone. When you use your action to activate your distributor, you can choose to affect each creature in a 15-foot cone.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest."
      }
    ],
    "name": "Biochem Engineering"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in biotech's implements. Additionally, when you engage in crafting with biotech's implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Modified Self",
        "text": "You've learned to make modifications to your body, cybernetically augmenting yourself. Over the course of a long rest, you can modify yourself with cybernetic augmentations. You must have biotech's implements in order to perform this modification.\n\nWhile you have at least one cybernetic augmentation installed, your body counts as a tech focus for your tech powers. Additionally, you have 4 modification slots, and you gain more at higher levels, as shown in the Modification Slots column of the engineer table. For each modification installed in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of modifications up to your Intelligence modifier (minimum of one).\n\nSome modification effects require saving throws. When you use such an effect from this class, the DC equals your tech save DC."
      },
      {
        "level": 3,
        "name": "Quick-Release Stimulant",
        "text": "When you are dealt damage by an attack while you have at least one cybernetic augmentation installed, you can use your reaction and expend one use of your Potent Aptitude to reduce the damage you take. The damage is reduced by an amount equal to 1d10 + your Constitution modifier + your engineer level. If you reduce the damage to 0, you can gain temporary hit points equal to the remaining damage reduction."
      },
      {
        "level": 6,
        "name": "Overclock Body",
        "text": "You've learned to use your body as a conduit for your tech powers. When you cast a tech power, you can choose to pay up to half the cost of the tech power using your hit points instead of your tech points. When you do so, your maximum hit points are reduced by the same amount until you complete a long rest."
      },
      {
        "level": 14,
        "name": "More Machine Than Man",
        "text": "While you have temporary hit points, when you are subjected to an effect that allows you to make a saving throw to take only half damage, you instead take no damage if you succeed on a saving throw, and only half damage if you fail."
      },
      {
        "level": 18,
        "name": "Focused Augmentation",
        "text": "You add your Intelligence modifier to Constitution saving throws you make to maintain concentration.\n\nAdditionally, when you cast a power that requires concentration and would affect only one target, you can target an additional creature with that power."
      },
      {
        "level": 3,
        "name": "Biotech Modifications",
        "text": "If a modification has prerequisites, you must meet them to install it. You can install the modification at the same time that you meet its prerequisites.\n\n_Prerequisite: 13th level_\nAs an action, you can activate this augmentation to cast the *infiltrate* tech power targeting yourself. Intelligence is your tech casting ability for this power, and if you cast it using this augmentation, it does not require concentration.\n\nThis augmentation replaces your eyes.\n\nYou are immune to the blinded condition, and you can enable or disable your ability to see anytime. Additionally, your eyes are equipped with a holorecorder device. You can perfectly recall anything you've seen in the last 7 days.\n\n_Prerequisite: 5th level, Hardy Torso Prothesis_\nThe Constitution score of your Hardy Torso Prosthesis increases by 2. Additionally, when you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can�t use this feature again until you finish a long rest.\n\nThis augmentation replaces an arm.\n\nWhen you make an ability check, attack roll, or saving throw using Strength using only this arm, your Strength score is treated as 15. When you make an ability check, attack roll, or saving throw using Strength using more than just this arm, you take the average of the arm's Strength score and your own.\n\nYou can choose this modification multiple times.\n\nThis augmentation replaces both legs.\n\nWhen determining your bonus to AC and saving throws from Dexterity, your Dexterity score is treated as 15. If your Dexterity score is already equal to or greater than 15, it has no effect on you.\n\nAdditionally, you can substitute this score for your own whenever you make an ability check or attack roll that uses your legs. \n\nThis augmentation replaces an eye.\n\nAs an action, you can remove or replace this eye. While removed, the eye sprouts eight small legs, has a speed of 15 feet, an AC of 10, and 1 hit point. If it dies, you can't use it again until you complete a long rest. As an action on each of your turns, you can move the eye up to its speed as long as it is within 30 feet of you. You can see through both the detached eye and your remaining eye at the same time, or you can use your action to see through only one eye or the other.\n\nYou can choose this modification multiple times.\n\nThis augmentation replaces a hand.\n\nAs an action, you can attach or detach this hand. While detached, the hand has a speed of 15 feet, an AC of 10, and 1 hit point. If it dies, you can't use it again until you complete a long rest. As an action on each of your turns, you can control the hand as long as it is within 30 feet of you. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a container. You can move the hand up to its speed each time you use it.\n\nYou can choose this modification multiple times.\n\n_Prerequisite: 5th level_\nWhile using your body as a tech focus, you gain a +1 bonus to the tech save DC of powers you cast that requires a Strength or Constitution saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\nThis augmentation replaces your torso.\n\nYour Constitution score becomes 13. Additionally, you have advantage on saving throws against poison.\n\nThis augmentation replaces a hand.\n\nYou modify your hand, granting it the ability to transform into a harpoon. With this hand, you can make a ranged weapon attack with a range of 30/60. On a hit, it deals 1d6 kinetic damage. This attack can target a surface, object, or creature.\n\nA creature struck by this attack is impaled by the harpoon. As an action, a creature can attempt to remove the harpoon. Removing the harpoon requires a Strength check. While the harpoon is stuck in the target, you are connected to the target by a 60 foot cable.\n\nWhile the harpoon is deployed, you can use your bonus action to activate the reel, pulling yourself to the location if the target is larger than you. A creature or object your size or smaller is pulled to you. Alternatively, you can opt to release the cable (no action required).\n\nOnce you've used this feature, you can't use your hand again until you recover and reinsert it as an action.\n\nYou can choose this modification multiple times.\n\n_Prerequisite: 5th level_\nWhen you aren't wearing armor, your AC becomes 13 + your Dexterity modifier.\n\nThis augmentation replaces a hand.\n\nYour unarmed strikes with this arm deal 1d4 ion damage, and your carrying capacity and the weight you can push, drag, or lift doubles. Additionally, you deal double damage to energy-based structures with your unarmed strikes.\n\nYou can choose this modification multiple times.\n\nThis augmentation replaces a forearm.\n\nUnarmed strikes with this hand have the reach property.\n\nYou can choose this modification multiple times.\n\n_Prerequisite: 5th level, Brawny Arm Prothesis_\nThe Strength score of your Brawny Arm Prosthesis increases by 2. Additionally, you are considered proficient with any weapon you wield with this arm. If the weapon requires two hands to use, and you are not already proficient with it, you only add half your proficiency bonus to attack rolls you make with it, unless you wield it with two of these arms. \n\nYou can choose this modification multiple times, but only once per arm.\n\nThis augmentation replaces your eyes.\n\nYou can activate or deactivate this implant as a bonus action. While active, you gain darkvision to a range of 120 feet.\n\n_Prerequisite: 9th level, Harpoon Hand_\nWhile your harpoon hand is deployed, when you cast a tech power with a range of touch, your hand can deliver the power as if it had cast it.\n\n_Prerequisite: 5th level_\nWhile using your body as a tech focus, you gain a +1 bonus to the tech save DC of powers you cast that requires a Dexterity or Intelligence saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 13th level_\nWhen you make an ability check using a skill you are proficient in, you can roll a d4 and add the result to your total.\n\nThis augmentation replaces your ears.\n\nYou are immune to the deafened condition, and you can enable or disable your ability to hear anytime. Additionally, your ears are equipped with a personal translator that allows you to understand up to 15 different languages, however, you cannot speak them. The languages can be changed out while interfaced with a protocol droid or appropriate computer.\n\nThis augmentation replaces your face.\n\nThis implant includes a headcomm with a scrambler that automatically encodes messages sent to a specified recipient commlink or receiver.\n\n_Prerequisite: 9th level_\nThis augmentation replaces your eyes and face.\n\nThis implant contains several tools for long-term survival and reconnaissance. As a bonus action, you \n\ncan activate one of the below modes that enable you to use several of these tools at once. Activating a different mode deactivates any currently active mode. \n- Communications Mode: This communications suite includes a headcomm with a scrambler that automatically encodes messages sent to a specified recipient commlink or receiver. While this mode is active, you cannot be deafened.\n- Interceptor Mode: This is a jamming and electronic warfare suite that includes a comm jammer, a holotrace device and pocket scrambler.\n- Respirator Mode: This includes a basic respirator that grants advantage on saving throws made to avoid being poisoned and resistance to poison damage. \n\n_Prerequisite: 5th level, Celerity Leg Prothesis_\nThe Dexterity score of your Celerity Leg Prosthesis increases by 2. Additionally, you gain proficiency in Dexterity saving throws.\n\n_Prerequisite: 5th level_\nWhile using your body as a tech focus, you gain a +1 bonus to melee tech attack rolls. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nWhile using your body as a tech focus, you gain a +1 bonus to ranged tech attack rolls. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nThis augmentation replaces your throat.\n\nThis augmentation allows you to synthesize and perfectly mimic any voice that you have heard in the last month, and the synthesizer can translate verbal communications between up to 5 languages. The languages can be changed out while interfaced with a protocol droid or appropriate computer. Additionally, you can add your Intelligence modifier to any Charisma (Deception) check made to lie to another creature.\n\nThis augmentation replaces a forearm.\n\nYou can integrate a single weapon that weighs no more than 8 lb. into your forearm. While integrated, you can use a bonus action to hide or reveal the weapon, which can only be used while revealed. While hidden, the weapon has the hidden property. While revealed, the weapon has the fixed property.\n\nYou can choose this modification multiple times.\n\n_Prerequisite: 5th level_\nWhile using your body as a tech focus, you gain a +1 bonus to the tech save DC of powers you cast that requires a Wisdom or Charisma saving throw. This bonus increases to +2 at 9th level and +3 at 13th level."
      }
    ],
    "name": "Biotech Engineering"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Furious Throw",
        "text": "Your throwing techniques have become a perfect extension of your melee prowess. When you throw a weapon with which you are proficient, you can benefit from your class features that only apply to melee weapon attacks, such as Rage or Reckless Attack."
      },
      {
        "level": 3,
        "name": "Returning Attacks",
        "text": "Any weapon you throw can ricochet back to you at your command. When you make a thrown weapon attack, you may have the weapon fly back to your hand immediately after the attack."
      },
      {
        "level": 6,
        "name": "Throw Anything",
        "text": "Your strength and mastery of throwing techniques has allowed you to throw vibroaxes as easily as others hurl vibrodaggers. When you are wielding a light- or vibro-weapon with which you are proficient, it gains the thrown property (range 20/60)."
      },
      {
        "level": 10,
        "name": "Fling People",
        "text": "You learn to throw creatures as easily as you throw your weapons. When you successfully grapple a creature, you may immediately throw the creature.\n\nIf the creature is a willing ally and volunteers to be grappled, you throw the target into any unoccupied space within 60 feet. That creature may immediately use its reaction to make one melee weapon attack, adding your Strength modifier to the attack's damage roll.\n\nIf the creature is an opponent, you throw the target into any unoccupied space within 30 feet, where it takes damage equal to your Strength modifier and falls prone."
      },
      {
        "level": 14,
        "name": "Raging Whirlwind",
        "text": "You can send your weapon spinning into a gravity-defying whirlwind of pain. Once per rage as an action, you may throw a weapon with the thrown property to a point you choose within 60 feet. The weapon fills the air as a cyclone in a 10 foot radius sphere centered on that point. A creature takes damage equal to the thrown weapon's damage + your Strength modifier + your Rage Damage when it enter's the whirlwind's area for the first time on a turn or starts its turn there. This effect ends when you command the weapon to return to you (no action required) or your rage ends."
      }
    ],
    "name": "Bloodstorm Approach"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Articulate Authority",
        "text": "When you use your Cunning Action feature to take the Dash, Disengage, or Hide actions, a number of friendly creatures up to your Charisma modifier within 30 feet of you who can hear you and who can understand you can use their reaction to gain an effect, determined by the action you took:\n- Dash: The creature can move up to half their speed. They must end this movement within 30 feet of you.\n- Disengage: The creature can move up to 5 feet. If this movement would provoke an opportunity attack, the opportunity attack is made with disadvantage.\n- Hide: The creature has advantage on the first attack roll they make before the end of their next turn against a creature you successfully hide from.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you finish a short or long rest."
      },
      {
        "level": 3,
        "name": "Fireteam Commander",
        "text": "You learn a number of squad maneuvers you can use to assist allies or exploit enemies. When you deal Sneak Attack damage to a creature, you may choose to forgo two of your Sneak Attack dice to make the attack a squad maneuver.\n\nYou inspire a friendly creature within 60 feet of you who can see or hear you and roll two Sneak Attack dice. That ally immediately gains temporary hit points equal to the amount of rolled.\n\nYou use the authority your attacks carry to help your ally focus on the task at hand. Choose a creature within 60 feet of you who can see or hear you and that is currently charmed or frightened by the creature you would deal Sneak Attack damage to. The condition immediately ends on that creature.\n\nYou choose a friendly creature within 60 feet of you who can see or hear you. Once before the start of your next turn, if that creature hits the creature against which you forwent two Sneak Attack damage dice, they deal additional damage to the target equal to the maximum of the two Sneak Attack dice."
      },
      {
        "level": 9,
        "name": "Open Opportunity",
        "text": "Once per turn, when you take the Attack action and hit a creature without applying your Sneak Attack damage to it, you can forgo your Sneak Attack damage for the turn and use your bonus action to throw the creature off balance. The next ally to hit that creature before the start of your next turn may add your Sneak Attack dice to the damage of their attack."
      },
      {
        "level": 13,
        "name": "Ambush Tactics",
        "text": "When attempting to move stealthily as a group, you may choose a number of creatures equal to your Charisma modifier. Those creatures may add their proficiency to any Dexterity (Stealth) checks they make as long as they remain within 60 feet of you and they do not already add their proficiency bonus.\n\nAdditionally, each ally other than you that surprises a creature and hits it with an attack on their first turn in combat rolls two dice equal to the size of your Sneak Attack dice, dealing additional damage of the same type to the creature."
      },
      {
        "level": 17,
        "name": "Squad Goals",
        "text": "You have such skill at maintaining the faith of your allies that the very sight of you in danger can spur them into action. When you are hit by an attack, up to six allies within 60 feet of you that can see or hear you and see the creature that hit you can make one weapon attack against that creature (no action required).\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      }
    ],
    "name": "Bolstering Practice"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Fists of Fury",
        "text": "You've learned to hone your rage through your fists. Your unarmed strike damage increases by one step (from 1 to d4, d4 to d6, or d6 to d8)."
      },
      {
        "level": 3,
        "name": "Reckless Strikes",
        "text": "While you are raging, not wearing heavy armor, and not wielding a shield, when you hit a creature with an unarmed strike or improvised weapon, you can choose to forgo your rage damage to make the attack a reckless strike.\n\nSome of your reckless strikes require your target to make a saving throw to resist the reckless strike's effects. The saving throw DC is calculated as follows:\n\nReckless Strike save DC = 8 + your proficiency bonus + your Strength modifier\n\nYou can use these features a combined number of times equal to your proficiency bonus, as shown in the berserker table. You regain all expended uses when you complete a short or long rest.\n\nYou gain temporary hit points equal to your rage damage bonus. If the target is grappled by you, you instead gain temporary hit points equal to twice your rage damage bonus.\n\nYour target must make a Constitution saving throw. On a failed save, the creature is deafened until the start of its next turn. If the target is grappled by you, it is instead incapacitated until the start of its next turn.\n\nYour target must make a Strength or Dexterity saving throw (the target chooses the ability score to use). On a failed save, your target is pushed back 5 feet. If the target is grappled by you, it is instead knocked prone."
      },
      {
        "level": 6,
        "name": "Shattering Strikes",
        "text": "Your rage causes your strikes to overcome the hardest of materials. While raging, you gain the following benefits:\n- Your unarmed strikes and improved weapons count as enhanced for the purpose of overcoming resistance and immunity to unenhanced attacks and damage.\n- Your unarmed strikes deal double damage against structures."
      },
      {
        "level": 10,
        "name": "Stop Hitting Each Other",
        "text": "You can grapple creatures two sizes larger than you, instead of one. \n\nAdditionally, you can use creatures you have grappled that are at least one size smaller than you as improvised weapons. When you do so, when you hit with an attack using a creature as a weapon, it takes damage equal to your Strength modifier. While raging, you can instead use creatures your size or smaller as improvised weapons."
      },
      {
        "level": 14,
        "name": "Enforcer",
        "text": "When you would make an unarmed strike or attack with an improvised weapon with advantage, you can choose to forgo the advantage. If you do so, your critical hit range increases by 1 for that attack, and on a hit, you deal maximum damage instead of rolling."
      }
    ],
    "name": "Brawling Approach"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Champion Superiority",
        "text": "You learn maneuvers that are fueled by special dice called superiority dice. See chapter 13 for the maneuvers list.\n\nYou learn two maneuvers of your choice, and you earn more at higher levels, as shown in the Maneuvers Known column of the Champion Superiority table. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack, and you may only use each maneuver once per turn.\n\nEach time you learn new maneuvers, you can also replace one maneuver you know with a different one.\n\nYou have two superiority dice, which are d4s, and you earn more at higher levels, as shown in the Superiority Dice Quantity column of the Champion Superiority table. This die changes as you gain berserker levels, as shown in the Superiority Dice Size column of the Champion Superiority table. A superiority die is expended when you use it. \n\nYou regain all of your expended superiority dice when you finish a short or long rest.\n\nYour maneuver ability varies based on the type of the maneuver you use. You use Strength, Dexterity, or Constitution for physical maneuvers (your choice), Intelligence, Wisdom, or Charisma for mental maneuvers (your choice), and an ability of your choice for general maneuvers. You use this ability whenever a maneuver refers to your maneuver ability. Additionally, you use this ability modifier when setting the saving throw DC for a maneuver you use.\n\nManeuver save DC = 8 + your proficiency bonus + your maneuver ability modifier"
      },
      {
        "level": 3,
        "name": "Reckless Maneuvers",
        "text": "When you use your Reckless Attack feature, you have advantage on superiority die rolls that would be added to the attack or damage rolls of your affected attacks."
      },
      {
        "level": 6,
        "name": "The Thrill",
        "text": "You have advantage on ability checks and saving throws to avoid being charmed or frightened, and creatures can't have advantage on ability checks or saving throws to avoid being charmed or frightened by effects that you control."
      },
      {
        "level": 10,
        "name": "Battlefield Euphoria",
        "text": "While raging, when you score a critical hit with a melee weapon attack, and when you reduce a hostile creature to 0 hit points with a melee weapon attack, you recover an expended superiority die."
      },
      {
        "level": 14,
        "name": "Furious Influence",
        "text": "While raging, you gain the following benefits:\n- You are resistant to psychic damage.\n- When you affect an ally with a maneuver, they gain the benefit of one of your damage resistances until the start of your next turn."
      }
    ],
    "name": "Champion Approach"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Culinary Knowledge",
        "text": "You gain proficiency with chef's kits and your choice of the Nature or Survival skills. Additionally, you can't have disadvantage on checks you make with them."
      },
      {
        "level": 3,
        "name": "Emergency Supplements",
        "text": "You are prepared to assist allies with specially prepared, instantly effective supplements. When an ally is the target of your Critical Analysis feature and within 5 feet of you, you may expend a superiority die and give that ally the benefits of any discovery that utilizes a superiority die and is exclusive to the Chef Pursuit, regardless of whether or not you've chosen it. \n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 6,
        "name": "Balanced Diet",
        "text": "Your cooking is so nutritionally balanced that it allows allies to stave off the effects of continued rigorous activity. Creatures of your choice who eat food prepared by you have advantage on Constitution saving throws to avoid exhaustion, as described in chapter 8, until the end of their next long rest."
      },
      {
        "level": 9,
        "name": "Comfort Food",
        "text": "If you or any friendly creatures who have consumed food you prepared during a short rest regain hit points by spending hit dice at the end of the short rest, each of those creatures regains an extra 1d8 hit points.\n\nThe extra hit points increase when you reach certain levels in this class: to 1d10 at 11th level, and to 1d12 at 15th level."
      },
      {
        "level": 17,
        "name": "Heroes' Feast",
        "text": "You have developed a signature feast that is the purest distillation of your knowledge and talent as a chef.\n\nOver the course of a long rest, you can expend rare culinary supplies worth 1,000 cr to create your feast, which can feed a number of creatures equal to twice your Critical Analysis ability modifer. Any creature partaking in the feast gains the following benefits:\n- It is cured of all poisons and disease, and becomes immune to poison and disease.\n- It makes Wisdom saving throws to avoid being frightened with advantage.\n- Its hit point maximum and current hit points increase by 2d10.\n\nThese benefits last until the end of the creature's next long rest or 24 hours have passed. This feature has no effect on droids or constructs."
      },
      {
        "level": 3,
        "name": "Chef Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect the progress of your studies into the culinary arts. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order. \n\nAs a bonus action while preparing or touching food, you may expend a superiority die and add to it an irritating allergen. At the start of each of its turns, a creature that consumes this food must make a Constitution saving throw. On a failed save, it subtracts half the result of your superiority die (minimum of one) from the first ability check, attack roll, or saving throws it makes before the start of its next turn. The effect of this maneuver ends when the creature completes its next long rest or 24 hours have passed. This maneuver has no effect on droids or constructs.\n\nAny of your chef features, maneuvers, or discoveries can now affect droids and constructs.\n\n_Prerequisite: 17th level, Full Course_\nOver the course of a long or short rest, you may utilize an additional maneuver from this archetype (total of four).\n\nAt the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature gains a number of temporary force or tech points (their choice) equal to the number you roll on the superiority die. When an affected creature casts a force or tech power, the temporary force or tech points are spent first. An affected target can only benefit from one source of temporary force or tech points at a time, and they last until they're depleted or until the affected target completes their next short or long rest. This maneuver has no effect on droids or constructs.\n\nAs a bonus action when preparing or touching food, you may expend a superiority die and add to it a subtle poison. Any creature that consumes this food must make a Constitution saving throw. On a failed save, their hit point maximum is reduced by an amount equal to twice the number rolled on your superiority die + your maneuver modifier. The effect of this maneuver ends when the creature completes its next long rest or 24 hours have passed. This maneuver has no effect on droids or constructs.\n\nAt the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature has their walking speed increased by 10 until the end of their next short or long rest. This maneuver has no effect on droids or constructs.\n\nAt the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Once before the end of their next short or long rest, affected targets may add the result of the superiority die to a damage roll that would affect only one target. This maneuver has no effect on droids or constructs.\n\n_Prerequisite: 7th level_\nOver the course of a long or short rest, you may utilize up to two different maneuvers from this archetype, rather than one.\n\n_Prerequisite: 12th level, Filling Meal_\nOver the course of a long or short rest, you may utilize an additional maneuver from this archetype (total of three).\n\nAt the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature gains a number of temporary hit points equal to twice the number you roll on the superiority die. This maneuver has no effect on droids or constructs.\n\nAs a bonus action while preparing or touching food, you may expend a superiority die and add to it a fast acting muscle relaxant. At the start of each of its turns, a creature that consumes this food must make a Constitution saving throw. On a failed save, it subtracts the result of your superiority die from the first damage roll it makes before the start of its next turn. The effect of this maneuver ends when the creature completes its next long rest or 24 hours have passed. This maneuver has no effect on droids or constructs.\n\nAny food you prepare over a short or long rest carries with it an additional cooling effect. Creatures that consume it are considered adapted to hot climates, as described in chapter 5 of the Dungeon Master's Guide, until the end of the creature's next long rest or 24 hours have passed. Additionally, the first time a creature who eats your food takes fire damage before the end of their next short or long rest, they are considered resistant to the damage.\n\nIf you or any friendly creature that has consumed food made by you during their last short or long rest gains temporary hit points, the number of temporary hit points they gain increases by an amount equal to your Critical Analysis ability modifer.\n\nAny food you prepare over a short or long rest carries with it an additional warming effect. Creatures that consume it are considered adapted to cold climates, as described in chapter 5 of the Dungeon Master's Guide, until the end of the creature's next long rest or 24 hours have passed. Additionally, the first time a creature who eats your food takes cold damage before the end of their next short or long rest, they are considered resistant to the damage.\n\nAt the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Once before the end of their next short or long rest, affected targets may add the result of the superiority die to one ability check, attack roll, or saving throw. The creature can wait until after it rolls the d20 before deciding to use this feature, but must decide before the DM says whether the roll succeeds or fails. This maneuver has no effect on droids or constructs.\n\nAt the end of a short or long rest you may expend a superiority die and choose a number of friendly creatures up to your maneuver modifier (minimum of one), if they ate food you prepared. Each creature gains proficiency in Constitution saving throws until the end of their next short or long rest. If a creature was already proficient in Constitution saving throws, they instead become proficient in a saving throw of your choice. This maneuver has no effect on droids or constructs."
      }
    ],
    "name": "Chef Pursuit"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in constructor's implements. Additionally, when you engage in crafting with constructor's implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Portable Structure",
        "text": "You have constructed a set of malleable, portable fortifications that can elevate you and your allies. Over the course of a long rest, you create a portable structure that travels with you. \n\nYour portable structure can only be directed by you, and you must have a tech focus in order to direct it remotely. If you lack a tech focus, you can instead direct it while it is within 5 feet of you. Your portable structure has the following features:\n- Its AC equals your tech save DC.\n- It has a number of hit points equal to 5 x your engineer level. If your structure is reduced to 0 hit points, it collapses and can't be used again until you spend 1 hour repairing it, which can be done during a short or long rest.\n- You can restore missing hit points to your structure by casting the *mending* tech power on it, or by completing a short or long rest. Casting the *mending* tech power restores a number of missing hit points equal to your Intelligence modifier (minimum of one), but it can't be repaired to more than half its hit point maximum in this way. Completing a short rest restores your structure to half its hit point maximum, and completing a long rest restores it to its hit point maximum.\n- Your structure has two modes: dismantled and deployed. While dismantled, your structure's speed equals your own, it hovers 5 feet off the ground, takes up the space of a 5-foot cube, and weighs 500 lbs. This increases to a 10-foot cube and 1,000 lbs. at 11th level, and a 15-foot cube and 2,000 lbs. at 17th level as you upgrade it. While deployed, your structure's speed is 0 and it takes up space dictated by how its deployed.\n\nAs an action, you can remotely deploy your structure at a space you can see on the ground within 30 feet of you, provided there is sufficient space to support it. This range increases to 60 feet at 11th level and 120 feet at 17th level. Automatic dismantling of your structure takes 1 minute, and can be initiated on your turn (no action required).\n\nYou can deploy your choice from these structures a combined total of four times, and you gain more uses at higher levels, as shown in the Modification Slots column of the engineer table. Each time you use this feature in excess of your proficiency bonus, your tech point maximum is reduced by 1 until you complete a long rest. You regain all expended uses when you complete a long rest.\n\nYou deploy a bridge up to 30 feet long, 10 feet wide, and 3 feet thick. The bridge starts from the point at which you deploy it, and extends in a direction of your choice. When you dismantle your bridge, it retracts to the point at which you initially deployed it. Both ends of the bridge must be supported in some fashion; one end cannot be suspended in the air or on unstable terrain. The bridge can hold up to 1,000 lbs., any weight above which causes the bridge to instantly drop to 0 hit points, destroying it. If a creature is on the bridge when it is destroyed or dismantled, it must make a Dexterity saving throw against your tech save DC. On a successful saving throw, it reaches the closest part of the bridge that has stable support, or it maintains a grip on your bridge as it retracts, as appropriate. On a failed save, it falls. \n\nWhen you reach 11th level, the bridge can now extend up to 45 feet long, 15 feet wide, and it can support up to 2,000 lbs. When you reach 17th level, the bridge can now extend up to 60 feet long, 20 feet wide, and it can support up to 4,000 lbs.\n\nYou create a cage that surrounds a cube up to 10 feet on each side centered on the target location. The cube is surrounded on all sides except the ground by 2-foot-thick walls. The walls and roof are completely opaque, and you choose whether the structure has a light source when you deploy it that provides bright light within the cube. Otherwise, the space within the cube is in complete darkness. The cage is permeable, allowing air, water, and sound to pass through it. You can attempt to trap unwilling Medium or smaller creatures inside the cage. When you deploy this structure in an unwilling creature's space, it must make a Dexterity saving throw against your tech save DC. On a successful save, it can immediately move to nearest unoccupied space outside of the cage. Otherwise, it is trapped within the structure when it is deployed. \n\nWhen you reach 11th level, the cage can extend up to 15 feet on each side, and it can trap creatures of Large size or smaller. When you reach 17th level, the cage can extend up to 20 feet on each side, and it can trap creatures of Huge size or smaller. \n\nYou erect a shelter up to 15 feet long, 10 feet wide, and 10 feet tall, with one-foot-thick walls, a roof, and a floor. It has a single door along its walls in a location of your choice. The building has temperature control and lighting systems, and can withstand harsh winds, heavy rain and snow. Any creature inside the shelter is protected from hazardous environmental effects outside the shelter such as extreme heat or cold. The structure does not provide additional breathing air for anyone inside if the environment it is placed in is not breathable. The shelter can comfortably support up to 5 Medium creatures. For each Medium creature, it can instead support 2 Small creatures. For each Small creature, it can instead support 2 Tiny creatures.\n\nWhen you reach 11th level, the shelter can extend up to 30 feet long, 15 feet wide, 15 feet tall, and it can now comfortably support up to 10 Medium creatures. For each Medium creature, it can instead support 2 Small creatures. For each Small creature, it can instead support 2 Tiny creatures. Additionally, when a creature completes a long rest while within your shelter, they regain all spent Hit Dice, instead of only half. When you reach 17th level, the shelter can extend up to 45 feet long, 20 feet wide, 20 feet tall, and it can now comfortably support up to 10 Large creatures. For each Large creature, it can instead support 2 Medium creatures. For each Medium creature, it can instead support 2 Small creatures. For each Small creature, it can instead support 2 Tiny creatures. Additionally, when a creature completes a long rest while within your shelter, their exhaustion level is reduced by 2, instead of only 1.\n\nYou erect a tower from a 5-foot square platform centered on the target location that rises up to 30 feet. If the tower is created under a creature, that creature must succeed on a Dexterity saving throw or be lifted by the tower. A creature can choose to fail the save. The tower comes equipped with a ladder that reaches from the ground to the platform. \n\nWhen you reach 11th level, the tower's platform can extend 5 feet by 10 feet and rise up to 40 feet. When you reach 17th level, the tower's platform can cover a 10-foot square, and rise up to 50 feet. Additionally, any creature on the tower's platform has advantage on Wisdom (Perception) checks that rely on sight.\n\nYou deploy a wall up to 30 feet long, 10 feet high, and 3 feet thick, or a ringed wall up to 10 feet in diameter, 10 feet high, and 3 feet thick. The wall features ramparts deep enough to support creatures of Medium size or smaller, and provides one-quarter cover to any creature on its ramparts. The wall includes a ladder on the side of your choice. You choose whether the wall contains any openings otherwise. Any openings chosen in this way can be seen through on both sides. The wall can be climbed, but requires a Strength (Athletics) check against your tech save DC for any creature without a climbing speed. A creature can only make this check once per turn. \n\nWhen you reach 11th level, the wall can deploy up to 45 feet long and 15 feet high, or a ringed wall up to 15 feet in diameter and 15 feet high. Additionally, the wall now provides half cover to any creature on its ramparts. When you reach 17th level, the wall can deploy up to 60 feet long and 20 feet high, or a ringed wall up to 20 feet in diameter and 20 feet high. Additionally, the wall now provides three-quarters cover to any creature on its ramparts."
      },
      {
        "level": 3,
        "name": "Potent Fortifications",
        "text": "When a friendly creature other than you that you can see is hit with a ranged attack while within 5 feet of your deployed portable structure, you can use your reaction and expend one use of your Potent Aptitude to have your structure take the damage instead. If your structure would normally have immunity or resistance to this damage, it loses that immunity or resistance for this attack. When you do so, the damage is reduced by an amount equal to 1d10 + your Intelligence modifier + your engineer level."
      },
      {
        "level": 6,
        "name": "Build and Destroy",
        "text": "You've learned how to manipulate the weak points in structures with your technology. Your tech powers and weapon attacks gain the siege property, and your portable structures have resistance to kinetic, energy, and ion damage dealt by weapons."
      },
      {
        "level": 14,
        "name": "Structural Knowledge",
        "text": "You can spend 1 hour inspecting and looking over a structure you can see from every angle available to you and comparing it to data you have on hand. At the end of the hour, you learn the basic blueprints for the structure, including but not limited to:\n- The structure's total hit points.\n- Any common materials that make up the structures.\n- Whether or not the structure is in use or abandoned.\n- The total floor count for the structure, as well as the general purpose of each floor if it was created to suit a specific purpose.\n- All non-secret entrances (including doors, windows, vents, pipe systems) and where you could find them.\n- A basic map-layout of every floor and ventilation system for the building.\n- The history of the building such as what company or species could have constructed it, as well as how long it's been built.\n- Any structural weak points it might have.\n\nAdditionally, when you make an Investigation check while searching this structure for hidden structural elements, such as doors or passages, if you have constructor's implements, you can treat a d20 roll of 9 or lower as a 10."
      },
      {
        "level": 18,
        "name": "Master Builder",
        "text": "Your ability with your portable structures has reached untold superiority. You gain the following benefits:\n- You can have two structures active at a time, instead of only one, as you learn to more efficiently use your portable structure.\n- Your structures no longer take double damage from the siege property.\n- Your structures no longer automatically fail Strength, Dexterity, and Constitution saving throws. Instead, your structure adds your proficiency bonus to the d20 roll when it makes one of these saving throws."
      }
    ],
    "name": "Construction Engineering"
  },
  {
    "className": "Engineer",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "*Cybertech Engineering: 3rd level* \nYou gain proficiency in cybertech's implements. additionally, when you engage in crafting with cybertech's implements, the rate at which you craft doubles."
      },
      {
        "level": 3,
        "name": "Cyberpad",
        "text": "*Cybertech Engineering: 3rd level* \nOver the course of a long rest, you can modify your wristpad. You must have a wristpad and cybertech's implements in order to perform this modification.\n\nYour wristpad requires attunement, can only be used by you, and counts as a tech focus for your tech powers while you are attuned to it. Your modified wristpad has 4 modification slots, and it gains more at higher levels, as shown in the Modification Slots column of the engineer class table. For each modification installed in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can replace or remove a number of modifications up to your Intelligence modifier (minimum of one).\n\nSome modification effects require saving throws. When you use such an effect from this class, the DC equals your tech save DC."
      },
      {
        "level": 3,
        "name": "Insightful Casting",
        "text": "*Cybertech Engineering: 3rd level* \nYou can expend uses of your Potent Aptitude to gain additional tech points, or expend tech points to gain additional Potent Aptitude uses. \n\n*Creating Tech Points.* You can transform a single use of Potent Aptitude into two tech points as a bonus action on your turn.  These additional tech points can exceed your maximum. Any tech points you create with this feature vanish when you finish a short rest.\n\n*Creating Potent Aptitude.* As a bonus action on your turn, you can expend two tech points to gain a single use of your Potent Aptitude."
      },
      {
        "level": 3,
        "name": "Quickslice",
        "text": "*Cybertech Engineering: 6th level* \nWhen a creature you can see casts a tech power, you may use your reaction to attempt to download that tech power to your wristpad for later use if it is of a level for which you can cast. \n\nMake an ability check using your techcasting ability with proficiency. The DC equals 10 + two times the power’s level. On a success you store the power for later use. On a failure, the power is not stored. You can cast powers stored in your wristpad as if you had learned them and they do not count against your tech powers known.\n\nOnce you have used this feature on a creature, you cannot do so again on the same creature until you complete a short or long rest.\n\nYou can store an amount of levels worth of tech powers equal to your engineer level at a time. Additionally, you can choose replace or remove one or more tech powers learned by this feature each time you use it."
      },
      {
        "level": 3,
        "name": "Severe Fallout",
        "text": "*Cybertech Engineering: 14th level* \nWhenever a creature rolls a natural 1 on a saving throw against one of your tech powers they take double damage from that power. If the power doesn't deal damage, instead they have disadvantage on their next saving throw against a tech power you cast."
      },
      {
        "level": 3,
        "name": "Maximum Output",
        "text": "*Cybertech Engineering: 18th level* \nWhen you cast a tech power, you can choose to deal maximum damage or provide maximum healing with that power.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 3,
        "name": "Cybertech Modifications",
        "text": "If a modification has prerequisites, you must meet them to install it. You can install the modification at the same time that you meet its prerequisites. \n\n_Prerequisite: 5th level_\nYou gain a +1 bonus to tech attack rolls. This bonus increases to +2 at 11th level and +3 at 17th level.\n\nWhen you cast a power that forces other creatures to make a saving throw, you can protect some of those creatures from the power’s full force. To do so, you spend 1 additional tech point and choose a number of those creatures up to your Intelligence modifier (minimum of one). A chosen creature automatically succeeds on its saving throw against the power.\n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\nWhen a creature takes cold damage from a tech power that you cast that requires an attack roll or saving throw, you deal additional cold damage equal to your Intelligence modifier (minimum of +1).\n\n_Prerequisite: 7th level, Cryo Amplifier_\nWhen you deal damage to a creature with this amplifier, the creature gains one level of slowed until the end of your next turn. If the tech power already imposes levels of slowed, the number of slowed levels imposed increases by 1.\n\nYou can use this feature a number of times equal to your Intelligence modifier (minimum of 1). You regain all expended uses when you complete a long rest.\n\n_Prerequisite: 13th level, Cryo Amplifier, Mk II_\nWhen you expend a use of your Cryo Amplifier, Mk II, when the creature fails Constitution saving throw it instead becomes restrained until the start of your next turn.\n\nWhen you cast a power that has a range of 5 feet or greater, you can spend 1 additional tech point to double the range of the power.\n\nAlternatively, when you cast a power that has a range of touch, you can spend 1 additional tech point to make the range of the power 30 feet.\n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\nWhen a creature takes lightning damage from a tech power that you cast that requires an attack roll or saving throw, you deal additional lightning damage equal to your Intelligence modifier (minimum of +1).\n\n_Prerequisite: 7th level, Electrical Amplifier_\nWhen you deal damage to a creature with this amplifier, the creature must succeed at a Constitution saving throw or become shocked until the end of your next turn.\n\nYou can use this feature a number of times equal to your Intelligence modifier (minimum of 1). You regain all expended uses when you complete a long rest.\n\n_Prerequisite: 13th level, Electrical Amplifier, Mk II_\nWhen you expend a use of your Electrical Amplifier, Mk II, when the creature fails Constitution saving throw it instead becomes stunned until the start of your next turn.\n\nWhen you cast a power that has a duration of 1 minute or longer, you can spend 1 additional tech point to double its duration, to a maximum duration of 24 hours. \n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\nYou can cast the *Analyze* power without using tech points. If you use this on a tech focus, you learn what tech powers, if any, are within it.\n\nWhen a creature takes fire damage from a tech power that you cast that requires an attack roll or saving throw, you deal additional fire damage equal to your Intelligence modifier (rounded up, minimum of +1).\n\n_Prerequisite: 7th level, Explosive Amplifier_\nWhen you deal damage to a creature with this amplifier, it becomes *ignited* (your techcasting ability modifier) until the start of it's next turn.\n\nYou can use this feature a number of times equal to your Intelligence modifier (minimum of 1).  You regain all expended uses when you complete a long rest.\n\n_Prerequisite: 13th level, Explosive Amplifier, Mk II_\nWhen a creature is *ignited* with a use of your Explosive Amplifier, Mk II and that creature takes any fire damage while *ignited*, the creature has disadvantage on the next Dexterity saving throw it makes before the start of it's next turn.\n\nYou can cast the *Absorb Energy* power once without expending Tech Points. You can't do so again until you finish a short or long rest.\n\n_Prerequisite: 11th level_\nWhen you cast a power that deals fire, lightning, or cold damage, you can spend 1 additional tech point and choose to swap the damage type to fire, lightning, or cold damage.\n\n_Prerequisite: 13th level, Elemental Ingenuity_\nWhen you cast a power that deals acid, ion, poison, or sonic damage, you can expend 1 additional tech point and choose to swap the damage type to fire, lightning, or cold damage.\n\n_Prerequisite: 11th level, Cryo Amplifier, Explosive Amplifier, or Electrical Amplifier_\nYou gain resistance to damage types for which you have a matching amplifier modification installed.\n\n_Prerequisite: 5th level_\nWhile using your wristpad as a tech focus, you gain a +1 bonus to the tech save DC of powers you cast that requires a Strength or Constitution saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\nYou can cast the *Translation Program* power once without expending Tech Points. You can't do so again until you finish a short or long rest.\n\n_Prerequisite: 5th level_\nWhen you cast a power that forces a creature to make a saving throw to resist its effects, you can spend 2 additional tech points to give one target of the power disadvantage on its first saving throw made against the power. \n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\nWhen you roll damage for a power, you can spend 1 additional tech point to reroll a number of the damage dice up to your Intelligence modifier (minimum of one). You must use the new rolls.\n\nYou can use Improved Subroutine even if you have already used a different Subroutine modification during the casting of the power. \n\n_Prerequisite: 5th level_\nWWhen you cast a power that requires concentration to maintain you can choose to spend 3 additional tech points. If you do, when you lose concentration on the power, the power will not end until the end of your next turn.\n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\n_Prerequisite: 5th level_\nYou can cast the *Sending* power, targeting a creature whose frequency is in your wristpad, without using tech points.  A willing creature can use its action to register its comm frequency on your device, which can contain a number of frequencies equal to your proficiency bonus.\n\nAs an action, you can remove a frequency on the device by deleting it.\n\nWhen you cast a power that allows you to force creatures in an area to make a saving throw you can instead spend 1 tech point and make a ranged tech attack against a single target that would be in the range. On a hit the target suffers the effects as though they failed their saving throw. \n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\n_Prerequisite: 5th level_\nWhen you cast a power that has a casting time of 1 action, you can spend 2 additional tech points to change the casting time to 1 bonus action for this casting. \n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\n_Prerequisite: 5th level_\nWhen you are forced to make a Constitution saving throw to maintain concentration on a power you can use your reaction and spend 2 tech points to automatically succeed on the saving throw.\n\nYou can use Refocused Subroutine even if you have already used a different Subroutine modification during the casting of the power.\n\n_Prerequisite: 5th level_\nWhile using your wristpad as a tech focus, you gain a +1 bonus to the tech save DC of powers you cast that requires a Dexterity or Intelligence saving throw. This bonus increases to +2 at 9th level and +3 at 13th level.\n\n_Prerequisite: 5th level_\nIf you miss with a tech power that calls for an attack roll, you can spend 2 tech points to reroll the attack. You must use the new roll.\n\nYou can use Seeking Subroutine even if you have already used a different Subroutine modificatio during the casting of the power.\n\nOnce per round when you take cold, fire, or lightning damage from a force or tech power, you gain temporary hit points equal to twice the power's level to potentially absorb the damage (minimum of 1). These points last until the end of your next turn.\n\nIf the Mk II upgrade of the affecting amplifier is installed, the temporary hit points gained increase by an amount equal to your Intelligence modifier (minimum of 1).\n\n_Prerequisite: 5th level_\nWhen you cast a power that can only have one target and doesn’t have a range of self, you can spend a number of additional tech points equal to the power’s level to choose a second target in range with the same power (1 tech point if the power is at-will).\n\nYou can use only one Subroutine modification on a power when you cast it, unless otherwise noted.\n\nYou can cast the *Voltaic Shielding* power once without expending Tech Points. You can't do so again until you finish a short or long rest.\n\n_Prerequisite: 5th level_\nWhile using your wrist as a tech focus, you gain a +1 bonus to the tech save DC of powers you cast that requires a Wisdom or Charisma saving throw. This bonus increases to +2 at 9th level and +3 at 13th level."
      }
    ],
    "name": "Cybertech Engineering"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Deadeye Superiority",
        "text": "You learn maneuvers that are fueled by special dice called superiority dice. See chapter 13 for the maneuvers list.\n\nYou learn two maneuvers of your choice, and you earn more at higher levels, as shown in the Maneuvers Known column of the Deadeye Superiority table. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack, and you may only use each maneuver once per turn.\n\nEach time you learn new maneuvers, you can also replace one maneuver you know with a different one.\n\nYou have two superiority dice, which are d4s, and you earn more at higher levels, as shown in the Superiority Dice Quantity column of the Deadeye Superiority table. This die changes as you gain scout levels, as shown in the Superiority Dice Size column of the Deadeye Superiority table. A superiority die is expended when you use it. \n\nYou regain all of your expended superiority dice when you finish a short or long rest.\n\nYour maneuver ability varies based on the type of the maneuver you use. You use Strength, Dexterity, or Constitution for physical maneuvers (your choice), Intelligence, Wisdom, or Charisma for mental maneuvers (your choice), and an ability of your choice for general maneuvers. You use this ability whenever a maneuver refers to your maneuver ability. Additionally, you use this ability modifier when setting the saving throw DC for a maneuver you use.\n\nManeuver save DC = 8 + your proficiency bonus + your maneuver ability modifier"
      },
      {
        "level": 3,
        "name": "Mark of the Deadeye",
        "text": "The range of your Ranger's Quarry feature doubles. Additionally, when making ranged weapon attacks against the target of your Ranger's Quarry, the normal and long range of your blaster weapons double."
      },
      {
        "level": 7,
        "name": "Cover to Cover",
        "text": "Attack rolls made against you on your turn are made with disadvantage."
      },
      {
        "level": 11,
        "name": "Shoot First",
        "text": "You have learned that the person who shoots first is often the one who walks out alive. When you make a ranged weapon attack against a creature that has not yet acted during your first turn in combat and you have advantage on the roll, you can reroll one of the dice once. Additionally, on a hit, you deal an extra 1d8 damage of the same type as the weapon. This damage increases to 1d10 at 13th level and 1d12 at 17th level."
      },
      {
        "level": 15,
        "name": "Overwatch",
        "text": "You have become a master at protecting your allies from afar. When a creature attempts to make an opportunity attack against an allied creature, or forces your ally to make a saving throw, you can use your reaction to make an attack roll against the enemy creature. \n\nIf your attack hits, either impose disadvantage on the enemy creature's opportunity attack roll or grant advantage to any allies making the saving throw."
      }
    ],
    "name": "Deadeye Technique"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in demolitions kit. Additionally, when you would install a breaching charge, you can do so in half the time."
      },
      {
        "level": 3,
        "name": "Explosive Charge",
        "text": "You learn to create a number of small explosives known as charges. Over the course of a short or long rest, you can create a number of charges equal to your Intelligence modifier. You must have a demolitions kit in order to create these charges. Your charges can only be used by you, and they lose their potency at the end of your next short or long rest.\n\nOnce per turn, when you would make a ranged weapon attack, you can instead throw one of your charges. Your charges have a range equal to 30 feet + your Strength modifier x 5. You can throw a charge at a point you can see within range. Each creature within 5 feet must make a Dexterity saving throw (DC = 8 + your proficiency bonus + your Intelligence modifier). A creature takes 2d4 + your Intelligence modifier kinetic damage on a failed save, or half as much on a successful one. \n\nThe damage of your charges increases to 3d4 at 7th level and 4d4 at 15th level."
      },
      {
        "level": 7,
        "name": "Cause and Effect",
        "text": "You learn to throw grenades as a bonus action. Additionally, when a creature fails a saving throw against a charge or grenade, you can expend a superiority die to apply one of your maneuvers. You can only use this feature once per grenade."
      },
      {
        "level": 10,
        "name": "Volatile Reflexes",
        "text": "When a creature within 5 feet of you makes a melee attack against you, you can use your reaction and throw a charge behind the target. If the target fails its saving throw against the charge, you impose disadvantage on the attack roll made against you."
      },
      {
        "level": 15,
        "name": "Backup Plans",
        "text": "When you roll initiative and have no charges remaining, you can create 2 charges. Additionally, whenever you create a charge, you can change the damage type to acid, energy, fire, ion, lightning, or sonic."
      },
      {
        "level": 18,
        "name": "Bombard",
        "text": "When a creature fails its saving throw against a charge or grenade thrown by you, it has disadvantage on the next Dexterity saving throw it makes before the end of your next turn."
      }
    ],
    "name": "Demolitions Specialist"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Martial Training",
        "text": "You gain proficiency in martial vibroweapons and the Investigation skill. Additionally, you can't have disadvantage on checks you make with it."
      },
      {
        "level": 3,
        "name": "Intelligent Applications",
        "text": "When you analyze a hostile creature with your Critical Analysis, you can use your Critical Analysis ability modifer with any weapon, as long as it does not have the heavy or special properties."
      },
      {
        "level": 6,
        "name": "Extra Attack",
        "text": "You can attack twice, instead of once, whenever you take the Attack action on your turn."
      },
      {
        "level": 9,
        "name": "Sharp Instincts",
        "text": "Once on each of your turns, when you hit the target of your Critical Analysis with a melee weapon attack, you can make a Wisdom (Insight) check contested by the target's Charisma (Deception) check. If you win the contest, you deal an additional 1d8 damage to the target, which is the same type as the weapon's damage\n\nThis die increases to d10 at 13th level and d12 at 17th level."
      },
      {
        "level": 17,
        "name": "Discombobulate",
        "text": "When you use a scholar maneuver on a hostile creature, you can force that target to make a Wisdom saving throw against your maneuver save DC. On a failed save, the target is stunned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nOnce you use this feature, you can't do so again until you finish a short or long rest."
      },
      {
        "level": 3,
        "name": "Detective Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect your investigative prowess. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order.\n\nYou gain your choice of a climbing, crawling, or swimming speed equal to your walking speed.\n\n_Prerequisite: 5th level_\nYour unarmed strike damage increases by one step (from 1 to d4, d4 to d6, or d6 to d8). Additionally, your unarmed strikes and count as enhanced for the purpose of overcoming resistance and immunity to unenhanced attacks and damage.\n\n_Prerequisite: 5th level_\nAs an action, you can touch a suit of armor that isn't being worn or carried by a hostile creature and instantly don it, provided you aren't wearing armor already.\n\nYou take the Search action as a bonus action.\n\nWhenever you make a Wisdom (Insight) check to determine whether a creature is lying, treat a roll of 7 or lower on the d20 as an 8.\n\nYou adopt a particular style of fighting as your specialty. Choose one of the fighting style options, detailed in Chapter 6 of the Player's Handbook.\n\n_Prerequisite: 5th level_\nYou gain proficiency in medium armor. If you are already proficient in medium armor, you instead gain proficiency in heavy armor.\n\n_Prerequisite: 9th level_\nOn your turn, you can reduce your speed by half to gain advantage on Wisdom (Perception) or Intelligence (Investigation) checks until the end of the turn. You can not use this feature if you have moved more than half your speed this turn.\n\nWhen you reduce a hostile creature to 0 hit points, but don't kill it outright, you gain temporary hit points equal to your scholar level, which last for 1 minute.\n\n_Prerequisite: 15th level_\nYou can see the true form of any shapechanger or creature concealed by illusion while the creature is within 30 feet of you and within line of sight."
      }
    ],
    "name": "Detective Pursuit"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Clinch Strike",
        "text": "You learn how to discourage, debilitate, and harm your enemies. You gain the following benefits while you aren't wearing heavy armor or wielding a medium or heavy shield:\n- Your damage die for your unarmed strikes and natural weapons increases by one step (from 1 to d4, d4 to d6, or d6 to d8), and you can apply your Sneak Attack damage when you hit with an unarmed strike even if it doesn't have the finesse property.\n- You don't need advantage on your attack roll to use your Sneak Attack if the target of your Sneak Attack is a creature grappled by you. All the other rules for the Sneak Attack class feature still apply to you.\n- You can use the bonus action granted by your Cunning Action to make an unarmed strike against a creature you are grappling."
      },
      {
        "level": 3,
        "name": "Skilled Grappler",
        "text": "You learn a number of grappling techniques to subdue your opponents. When you hit a creature grappled by you with an unarmed strike and deal Sneak Attack damage, you may choose to forgo two of your Sneak Attack dice to make the attack a grappling technique.\n\nSome of your grappling techniques require your target to make a saving throw to resist the grappling technique's effects. The saving throw DC is calculated as follows: \n\nGrapple Technique save DC = 8 + your proficiency bonus + your Strength modifier\n\nYou attempt to choke the target into unconsciousness. The target must make a Constitution saving throw or be restrained until the end of your following turn.  \n\nIf you maintain this technique for 1 minute, the target falls unconscious for 1 hour. Droids and constructs can not be knocked unconscious in this way.\n\nYou attempt to disarm a weapon or other object the target is holding. The target must make a Strength saving throw. On a failed save, it releases the object. If you have a free hand, you can catch the object. Otherwise, it lands at your feet.\n\nYou attempt to throw your target to the ground. The target must make a Dexterity saving throw. On a failed save, the target is pushed back 5 feet, knocked prone, and stunned until the start of your next turn. This ends the grapple."
      },
      {
        "level": 9,
        "name": "Human Shield",
        "text": "You learn to manipulate the body of a grappled target to make attacks against you more difficult to land. Moving a grappled creature the same size as you or smaller no longer halves your speed, and when a creature grappled by you would grant you half cover, you instead have three-quarters cover. Additionally, when you are hit by an attack while grappling a creature, you can use your reaction to force that attack to instead hit the grappled creature."
      },
      {
        "level": 13,
        "name": "Kiss the Wall",
        "text": "You can use your surroundings to further punish the target of your grapple. When you roll a 1 or 2 on a Sneak Attack damage die for an unarmed strike you make against a creature grappled by you, you can treat the result of the die as a 3."
      },
      {
        "level": 17,
        "name": "Neck Snap",
        "text": "You learn how to immediately remove your grappled opponent from the fight. As an action, you can force a creature grappled by you to make a Constitution saving throw. On a failed save, if the creature has 100 hit points or fewer, it dies. If the target has more than 100 hit points, it immediately takes 10d10 true damage. \n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      }
    ],
    "name": "Disabling Practice"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Studied Shooter",
        "text": "You learn specialized theory typical for practitioners of the enhancement trade. You gain proficiency in your choice of the Lore or Technology skills. Additionally, you learn your choice of the *encrypted message* or *minor hologram* tech power. Intelligence is your techcasting ability for these powers."
      },
      {
        "level": 3,
        "name": "Special Ammunition",
        "text": "You learn ammunition enhancements that are fueled by amplified shots to unleash special enhanced effects.\n\nYou know two ammunition enhancements of your choice, which are detailed under \"Ammunition Enhancements\" below, and you earn more at higher levels. Many ammunition enhancements boost an attack in some way. Once per turn when you fire a shot from a blaster as part of the Attack action, you can apply one of your Ammunition Enhancement options to that shot,\n\nYou gain an additional Ammunition Enhancement option of your choice when you reach certain levels in this class: 7th, 10th, 15th, and 18th level. Each option also improves when you become an 18th-level fighter.\n\nEach time you learn new ammunition enhancements, you can also replace one ammunition enhancement you know with a different one.\n\nYou have two amplified shots, which you use to activate your ammunition enhancements. An amplified shot is expended when you use it. When you fire an amplified shot, your weapon is treated as enhanced for overcoming resistance and immunity to unenhanced attacks and damage. You decide to use the option when the shot hits a creature, unless the option doesn't involve an attack roll. You regain all of your amplified shots when you finish a short or long rest.\n\nSome of your ammunition enhancements require your target to make a saving throw to resist the maneuver's effects. The saving throw DC is calculated as follows:\n\nAmmunition save DC = 8 + your proficiency bonus + your Dexterity modifier"
      },
      {
        "level": 3,
        "name": "Ammunition Enhancements",
        "text": "The ammunition enhancements are presented in alphabetical order.\n\nWhen this shot strikes its target, shards of carbonite wrap around the target. The creature hit by the shot takes an extra 2d6 cold damage, it gains 1 slowed level, and it takes 2d6 kinetic damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the carbonite with a successful Strength (Athletics) check against your Special Ammunition save DC. Otherwise, the carbonite lasts for 1 minute or until you use this option again.\n\nThe cold damage and kinetic damage both increase to 4d6 when you reach 18th level in this class.\n\nYou enhance your shot with chemicals that confuse the target. The creature hit by the shot takes an extra 2d6 poison damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw.\n\nThe poison damage increases to 4d6 when you reach 18th level in this class.\n\nYou fire a shot set to explode on impact. The shot detonates after your attack. Immediately after the shot hits the creature, the target and all other creatures within 10 feet of it take 2d6 fire damage each.\n\nThe fire damage increases to 4d6 when you reach 18th level in this class.\n\nYou enhance your shot with hallucinogenic chemicals. The creature hit by the shot takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn.\n\nThe psychic damage increases to 4d6 when you reach 18th level in this class.\n\nYou enhance your shot with armor-piercing properties. When you use this option, you don't make an attack roll for the attack. Instead, the shot shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The shot passes through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the shot, plus an extra 1d6 damage of the weapon's type. On a successful save, a target takes half as much damage.\n\nThe extra damage increases to 2d6 when you reach 18th level in this class.\n\nYou fire a shot enhanced with a debilitating poison. The creature hit by the shot takes an extra 2d6 poison damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn.\n\nThe poison damage increases to 4d6 when you reach 18th level in this class.\n\nYou apply a tracing signal to your shot. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The shot flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the shot to travel to the target, the target must make a Dexterity saving throw. Otherwise, the shot disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the shot, plus an extra 1d6 kinetic damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location.\n\nThe kinetic damage increases to 2d6 when you reach 18th level in this class."
      },
      {
        "level": 7,
        "name": "Enhanced Shot",
        "text": "You gain the ability to enhance your shots. Whenever you fire an unenhanced shot from a blaster, you can make it enhanced for the purpose of overcoming resistance and immunity to unenhanced attacks and damage."
      },
      {
        "level": 10,
        "name": "Redirected Shot",
        "text": "You learn how to direct an errant shot toward a new target. When you make an attack roll with an enhanced shot and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target."
      },
      {
        "level": 15,
        "name": "Ever-Ready Shot",
        "text": "Your enhanced ammunition is available whenever battle starts. If you roll initiative and have no uses of Special Ammunition remaining, you regain one use of it."
      },
      {
        "level": 18,
        "name": "Ammunition Upgrades",
        "text": "Your ammunition enhancements improve."
      }
    ],
    "name": "Enhancement Specialist"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in one Charisma skill of your choice."
      },
      {
        "level": 3,
        "name": "In The Spotlight",
        "text": "You can overwhelm an opponent with your unique blend of skill and style. As a bonus action, you can choose one creature you can see within 30 feet of you. The target is marked for 1 minute. While the target is marked, you gain the following benefits:\n- You can add half your Charisma modifier (minimum of one) to any weapon damage roll you make against the marked target that doesn't already include that modifier.\n- Your critical hit range against the marked target increases by 1.\n- If the marked target is reduced to 0 hit points, you regain hit points equal to your fighter level + your Charisma modifier (minimum of 1).\n\nThis effect ends early if you're incapacitated or die. Once you've used this feature, you can't use it again until you finish a short or long rest."
      },
      {
        "level": 3,
        "name": "Showoff",
        "text": "You're a master at dazzling your friends and enemies alike. When you would make a Strength, Dexterity, Constitution, or Charisma  check, you can roll a d4 and add it to the roll. On a success, you can immediately choose a number of creatures within 30 feet of you that can see you up to your Charisma modifier (no action required, minimum of one). Each creature must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Charisma modifier) or be charmed by you. This effects ends on a target after 1 minute, if it takes any damage, if you attack it, or if it witnesses you attacking or damaging any of its allies. If a target succeeds on this saving throw, the target has no hint you tried to charm it.\n\nThis die increases to 1d6 at 5th level, 1d8 at 9th level, 1d10 at 13th level, and 1d12 at 17th level.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 7,
        "name": "Glory Kill",
        "text": "As you defeat your enemies in combat, you can weaken the morale of other foes or bolster the resolve of your allies alike. When you score a critical hit or reduce a creature to 0 hit points, you can choose one or more creatures that you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). Each of the chosen \n\ncreatures are affected by one of the following effects of your choice:\n- The creature gains temporary hit points equal to 1d6 + your Charisma modifier (minimum of 1 temporary hit point).\n- The creature must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Charisma modifier) or be frightened of you until the start of your next turn."
      },
      {
        "level": 10,
        "name": "Relentless Competitor",
        "text": "Once on each of your turns, you can regain a use of your Action Surge (no action required). If you do so, you immediately suffer one level of exhaustion."
      },
      {
        "level": 15,
        "name": "Glorious Defense",
        "text": "Your glory on the battlefront can misdirect attacks. When a creature you can see hits you with an attack roll, you can use your reaction to gain a bonus to AC against that attack, potentially causing it to miss you. The bonus equals your Charisma modifier (minimum of +1). If the attack misses, you can make one weapon attack against the attacker as part of this reaction."
      },
      {
        "level": 18,
        "name": "The Beauty of Violence",
        "text": "You've perfected a fighting style that allows you to stylishly dominate the field of battle. When you mark a creature with your In The Spotlight feature, you can enhance it. For the duration of the mark, you gain the following additional benefits:\n- You can add your full Charisma modifier, instead of half, to any weapon damage roll you make against the marked target that doesn't already include that modifier.\n- You can add half your Charisma modifier (minimum of one) to any weapon attack roll you make against the marked target that doesn't already include that modifier.\n- If the marked target is reduced to 0 hit points, you can use your reaction to mark a new creature within 30 feet of you. The duration of the new mark is equal to the remaining duration of the existing mark.\n\nThis effect ends early if you're incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Exhibition Specialist"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Focused Navigator",
        "text": "You gain proficiency in two of the Perception, Piloting, Survival, and Acrobatics skills. Additionally, you can't have disadvantage on checks you make with them."
      },
      {
        "level": 3,
        "name": "Surveyed Area",
        "text": "You can now use your Critical Analysis feature on a 15-foot cube area within 60 feet of you that you can see. You can treat any creatures inside this cube as if they are the target of your Critical Analysis feature, and when a creature ends your Critical Analysis feature on themself, it does not end this effect for other creatures in your Surveyed Area."
      },
      {
        "level": 6,
        "name": "Field Advantage",
        "text": "You learn to quickly convey spatial information in the midst of combat about the area you analyzed, giving them an edge at maneuvering in the area. While moving through your Surveyed Area, you and friendly creatures of your choice ignore unenhanced difficult terrain, and opportunity attacks against them are made with disadvantage."
      },
      {
        "level": 9,
        "name": "Unstoppable Adventurer",
        "text": "You learn to swim and scale vertical surfaces with ease. You gain swimming and climbing speed equal to your walking speed.\n\nAdditionally, your Sage Advice feature can be used to give friendly creatures knowledge on how to swim or climb, provided you have a swimming or climbing speed. Chosen creatures have a swimming speed or climbing speed for the entire duration."
      },
      {
        "level": 17,
        "name": "Survey Master",
        "text": "When you use the Surveyed Area feature, the area affected is a 30-foot cube instead of a 15-foot cube."
      },
      {
        "level": 3,
        "name": "Explorer Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect your studies in maps and hidden routes. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order.\n\n_Prerequisite: 12th level_\nYou treat one-quarter cover as half cover, half cover as three-quarters cover, and three-quarters cover as full cover. Additionally, while you are in cover, Dexterity (Stealth) checks you make gain a bonus equal to your Critical Analysis ability modifer (minimum of +1).\n\nYou have advantage on Wisdom (Perception) checks and Intelligence (Investigation) checks to locate any secret doors or traps, and you have resistance to damage dealt by traps.\n\nAdditionally, you can use your Sage Advice feature to teach friendly creatures about various types of traps, following the same rules of that feature. When you do so, the chosen creatures have resistance to damage dealt by traps.\n\n_Prerequisite: 9th level_\nWhen you make an Intelligence (Piloting) check and add your proficiency bonus to the check, treat any roll of 9 or lower as if you had rolled a 10. \n\n_Prerequisite: 5th level_\nAttack rolls that you make against creatures that you are grappling have advantage. \n\n_Prerequisite: 5th level_\nOnce per turn, when you or a friendly creature hits a creature that is a target of your Critical Analysis feature, it takes additional damage equal to half your Critical Analysis ability modifer (minimum of +1). \n\nWhen you make a Wisdom (Perception) or Intelligence (Investigation) check to find a hidden creature that is inside the area that is targeted by your Critical Analysis feature, you do so with advantage. \n\nYou can hold your breath twice as long as you are normally able to, and take half as much damage from fall damage."
      }
    ],
    "name": "Explorer Pursuit"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Improved Combat Superiority",
        "text": "Your tactical skill in combat improves, granting bonuses to your Combat Superiority.\n\nYou know four maneuvers of your choice, instead of two, and you earn more at higher levels, as shown in the Maneuvers Known column of the Fireteam Superiority table.\n\nYou have four superiority dice, instead of two, and you earn more at higher levels, as shown in the Superiority Dice Quantity column of the Fireteam Superiority table."
      },
      {
        "level": 3,
        "name": "Lead By Example",
        "text": "Once per turn, when an ally that can see or hear you attacks a creature that you can see, you can expend a superiority die and enhance that ally's attack, using one of the maneuvers that you know."
      },
      {
        "level": 7,
        "name": "Rally the Troops",
        "text": "When you use your Second Wind feature, you can choose up to three allies within 60 feet of you that can see or hear you. Each ally gains temporary hit points equal to your fighter level.\n\nYou can choose an additional ally at 9th, 13th, and 17th level."
      },
      {
        "level": 10,
        "name": "On Your Six",
        "text": "You can use your bonus action to begin a coordinated maneuver with an ally who is within 5 feet of you. For the next minute, while you and the chosen ally are within 5 feet of each other and neither of you are wielding a shield, you each gain a bonus to AC equal to half your proficiency bonus.\n\nWhen the chosen ally moves on their turn, you can use your reaction to move with them. You must end this movement within 5 feet of the ally, and this movement can't exceed your speed.\n\nThis effect ends early if either you or your ally are incapacitated or die. Once you've used this feature, you can't use it again until you complete a long rest."
      },
      {
        "level": 15,
        "name": "Tactical Advice",
        "text": "Over the course of one minute, you can share knowledge with up to five allies. For the next hour, the chosen creatures gain all of your weapon and armor proficiencies, and a single use of your Indomitable feature. \n\nYou can choose an additional ally at 17th level.\n\nOnce you've used this feature, you can't use it again until you complete a long rest."
      },
      {
        "level": 18,
        "name": "No Soldier Left Behind",
        "text": "While under the effects of On Your Six, if either you or your ally are reduced to 0 hit points, you can end On Your Six to have them drop to 1 hit point instead. When you do so, the effects of On Your Six persist until the start of your next turn."
      }
    ],
    "name": "Fireteam Specialist"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in your choice of the Persuasion or Intimidation skill."
      },
      {
        "level": 3,
        "name": "Improved Combat Superiority",
        "text": "Your tactical skill in combat improves, granting bonuses to your Combat Superiority.\n\nYou know four maneuvers of your choice, instead of two, and you earn more at higher levels, as shown in the Maneuvers Known column of the Fireteam Superiority table.\n\nYou have four superiority dice, instead of two, and you earn more at higher levels, as shown in the Superiority Dice Quantity column of the Fireteam Superiority table."
      },
      {
        "level": 3,
        "name": "Humanoid Companion",
        "text": "You've been assigned a squadmate who is under your command, gaining a humanoid companion.\n\nCreate your humanoid companion as detailed in the Companions section of the Customization Options document for Expanded Content.\n\nIn addition to its traits and features, your companion gains additional benefits while it is bonded to you:\n\n- Your companion gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each trait in excess of your proficiency bonus, your number of Hit Dice that can be spent to restore hitpoints is reduced by 1.\n\nLastly, while your companion is bonded to you and within 10 feet of you, your companion can uses your superiority dice and maneuvers as if it knows them.\n\nThis radius increases to 30 feet at 11th level, and 60 feet at 17th level."
      },
      {
        "level": 7,
        "name": "Rally the Troops",
        "text": "When you use your Second Wind feature while your companion is within 10 feet of you, your companion regains hit points and gains temporary hit points equal to your fighter level.\n\nThis radius increases to 30 feet at 11th level, and 60 feet at 17th level."
      },
      {
        "level": 10,
        "name": "On Your Six",
        "text": "While your companion is within 5 feet of you, you can use your bonus action to begin a coordinated \n\nmaneuver. For the next minute, while you and your companion are within 5 feet of each other and neither of you are wielding a shield, you each gain a bonus to AC equal to half your proficiency bonus.\n\nThis effect ends early if either you or your companion are incapacitated or die. Once you've used this feature, you can't use it again until you complete a long rest."
      },
      {
        "level": 15,
        "name": "Indomitable in Tandem",
        "text": "When you and your companion are both forced to make a saving throw against the same effect, and one�but not both�of you fails, you can expend a use of your Indomitable feature to instead have you both succeed."
      },
      {
        "level": 18,
        "name": "No Soldier Left Behind",
        "text": "While under the effects of On Your Six, if either you or your companion are reduced to 0 hit points, you can end On Your Six to have them drop to 1 hit point instead. When you do so, the effects of On Your Six persist until the start of your next turn."
      }
    ],
    "name": "Fireteam Specialist (Companion)"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Frenzy",
        "text": "You can go into a frenzy when you enter your rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one.\n\nThe first time you use this feature, you suffer no ill effect. If you use this feature again before you finish a long rest, you suffer one level of exhaustion when your rage ends each time you use it.\n\nWhen you finish a long rest, you reduce your exhaustion level by 2, instead of 1. Additionally, any effect that removes exhaustion reduces your exhaustion by 1 additional level."
      },
      {
        "level": 3,
        "name": "Maniacal Rage",
        "text": "While raging, you have advantage on Charisma (Intimidation) checks."
      },
      {
        "level": 6,
        "name": "Mindless Rage",
        "text": "You can't be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage."
      },
      {
        "level": 10,
        "name": "Intimidating Presence",
        "text": "You can use your action to frighten someone with your menacing presence. When you do so, choose one creature that you can see within 30 feet of you. If the creature can see or hear you, it must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Charisma modifier) or be frightened of you until the end of your next turn. On subsequent turns, you can use your action to extend the duration of this effect on the frightened creature until the end of your next turn. This effect ends if the creature ends its turn out of line of sight or more than 60 feet away from you. While raging, you add double your proficiency bonus to the save DC, instead of your normal proficiency bonus.\n\nIf the creature succeeds on its saving throw, it becomes immune to this feature for 24 hours."
      },
      {
        "level": 14,
        "name": "Retaliation",
        "text": "When you take damage from a creature that is within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature."
      }
    ],
    "name": "Frenzied Approach"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Genesplicer's Methods",
        "text": "You gain proficiency with geneticist's implements and your choice of Medicine or Survival skills. Additionally, you can't have disadvantage on checks you make with them."
      },
      {
        "level": 3,
        "name": "Mutagenic Analysis",
        "text": "While you are the target of your Critical Analysis feature, you can add half your Critical Analysis ability modifer (minimum of one) to any saving throw you make that doesn't already include that modifier."
      },
      {
        "level": 6,
        "name": "Mutagenic Transformation",
        "text": "When you target yourself with your Critical Analysis feature, you can choose to undergo a mutagenic transformation. Your form shifts, exaggerating and strengthening your geneticist discoveries for 1 hour. You gain the following benefits:\n- You can attack twice, instead of once, whenever you take the Attack action on your turn.\n- Your Strength score becomes equal to your Critical Analysis score.\n- You gain a bonus to your AC equal to half your Critical Analysis ability modifer (minimum of +1) if it doesn't already include that modifier.\n\nYou can end this effect early on your turn as a bonus action. This effect ends early if you are incapacitated or die. You can use this feature twice. You regain all expended uses of it when you finish a long rest."
      },
      {
        "level": 9,
        "name": "Geneticist's Resilience",
        "text": "Your genetic alterations make you immune to poison and disease. Additionally, you have resistance to poison damage."
      },
      {
        "level": 17,
        "name": "Chimeric Adaptation",
        "text": "Your genetic modifications have reached new heights. When you complete a short or long rest, you can choose one of the following features. When you undergo your mutagenic transformation, you also gain the benefits of the chosen feature for the duration. You can only have one of these features at a time.\n\nYou gain proficiency in Wisdom and Charisma saving throws. Additionally, you have advantage on saving throws against force powers, and when a creature within 30 feet of you casts a force power, you can use your reaction to move up to half your speed towards the creature. You must end this movement closer to the creature than you started. If you end this movement within 5 feet of the creature, you can make one melee attack against the creature (no action required).\n\nYou gain proficiency in Strength and Constitution saving throws. Additionally, you gain immunity to the frightened condition, \nand when you deal damage with a weapon or unarmed strike, you can deal an additional 1d8 damage of the same type as the weapon's damage.\n\nYou gain proficiency in Dexterity and Intelligence saving throws. Additionally, your speed increases by 10 feet, your attack rolls can't suffer from disadvantage, creatures can't have advantage on attack rolls against you, and each slowed level only reduces your speed by 5 feet, unless it would reduce your speed to 0."
      },
      {
        "level": 3,
        "name": "Geneticist Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect the changes you have caused your own body to undergo. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order. \n\nWhen you aren't wearing armor, your AC is 13 + your Dexterity modifier. Additionally, you are adapted to hot or cold climates (your choice), as described in chapter 5 of the Dungeon Master's Guide. When you undergo your mutagenic transformation, you add your full Critical Analysis ability modifer, instead of half, to your AC for the duration.\n\nYou can breathe air and water. When you undergo your mutagenic transformation, you no longer need to breathe, and you can survive up to one hour within the vacuum of space for the duration.\n\nYour carrying capacity and the weight you can push, drag, or lift doubles. If it would already double, it instead triples. Additionally, when you make a long jump, you can cover a number of feet up to twice your Strength score. When you make a high jump, you can leap a number of feet up into the air equal to 3 + twice your Strength modifier. When you undergo your mutagenic transformation, you have advantage on Strength checks and Strength saving throws for the duration.\n\nYou sprout a pair of winged arms. You gain a flying speed equal to half your walking speed. You can only gain the benefit of items held by two of your arms at any given time, and once per round you can switch which arms you are benefiting from (no action required). When you undergo your mutagenic transformation, your flying speed increases to your full walking speed, and you can use your bonus action to take the Dash action for the duration.\n\nYour hit point maximum increases by a number equal to your level, and it increases by 1 every time you gain a level. When you undergo your mutagenic transformation, and at the beginning of each of your turns, you gain temporary hit points equal to your half your scholar level + your Critical Analysis ability modifer for the duration.\n\nYou have darkvision out to 60 feet. If you already have darkvision, its range instead increases by 30 feet. When you undergo your mutagenic transformation, you gain advantage on Wisdom (Perception) checks that rely on smell for the duration. Additionally, you can track creatures that have left a scent in the last 24 hours.\n\nYou gain a burrowing speed equal to your walking speed and you can tunnel through solid rock at a rate of 1 foot per round. In order to use this speed, you must have two free hands. When you undergo your mutagenic transformation, you gain tremorsense out to 30 feet for the duration. You can detect and pinpoint the origin of vibrations within a specific radius, provided that monster and the source of the vibrations are in contact with the same ground or substance. Tremorsense can't be used to detect flying or incorporeal creatures.\n\nYou sprout claws or some other natural weapon. Your unarmed strikes deal 1d4 kinetic damage, and you can use your choice of your Strength, Dexterity, or Critical Analysis ability modifer for the attack and damage rolls. You must use the same modifier for both rolls. When you undergo your mutagenic transformation, your unarmed strikes increase to a d6 and are considered enhanced for the duration. Additionally, you deal an additional 1d4 acid, lightning, or poison damage when you hit with them."
      }
    ],
    "name": "Geneticist Pursuit"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Dive For Cover",
        "text": "You learn to quickly move into cover when under fire. Once per round, when you are the target of a ranged attack, or you are subjected to an effect that allows you to make a Dexterity saving throw, and there is cover within 10 feet of you, you can move up to 10 feet (no action required). You must end this movement in cover.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 3,
        "name": "Trick Shooter",
        "text": "You learn a number of trick shots you can use to debilitate enemies and impress allies. When you deal Sneak Attack damage to a creature, you may choose to forgo two of your Sneak Attack dice to make the attack a trick shot. \n\nSome of your trick shots require your target to make a saving throw to resist the trick shot's effects. The saving throw DC is calculated as follows: \n\nTrick Shot save DC = 8 + your proficiency bonus + your Dexterity modifier\n\nYou attempt to blind the target. The target must make a Constitution saving throw or be blinded until the end of your next turn. \n\nYou attempt to knock the target prone. The target must make a Strength saving throw or be knocked prone.  \n\nYou attempt to hobble the enemy's movement. The target must make a Dexterity saving throw. If it fails, it gains 1 slowed level and it has disadvantage on Dexterity saving throws until the end of its next turn."
      },
      {
        "level": 9,
        "name": "Spinning Flourish",
        "text": "You can flourish your weapon in an intimidating or charming manner. As an action, you can cause one creature within 60 feet to make a Wisdom saving throw (DC = 8 + your proficiency bonus + your Dexterity modifier). On a failed save, the target is charmed or frightened by you (your choice) until the end of your next turn."
      },
      {
        "level": 13,
        "name": "Ricochet Shot",
        "text": "You learn how to work all the angles. Once per turn, when you take the Attack action and miss with a ranged weapon attack, you can repeat the attack against a different target within 10 feet of the original target (no action required)."
      },
      {
        "level": 17,
        "name": "Quickdraw",
        "text": "You learn to perform miracles with just a blaster and some nerve. On your first turn in combat, if you aren't surprised, you can use your action to attack creatures that have not yet acted. Choose up to six such creatures that you can see, making a ranged weapon attack against each. On a hit, you deal normal weapon damage and can apply a single trick shot to each attack made this way. \n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      }
    ],
    "name": "Gunslinger Practice"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Rock Steady",
        "text": "You have learned to use the heft of your weapon to root yourself in place. At the end of each of your turns, if you move less than half your speed while wielding a weapon with the heavy or strength properties, you have advantage on saving throws to avoid being restrained, moved, or knocked prone. This advantage lasts until the end of your next turn."
      },
      {
        "level": 3,
        "name": "My Little Friend Says Hello There",
        "text": "You know how to use the sheer size of your weapon to strike fear in those around you. You can add your Strength modifier to any Charisma (Intimidation) check you make while wielding a weapon with the heavy or strength properties."
      },
      {
        "level": 7,
        "name": "Maximum Output",
        "text": "When you take the Attack action while wielding a weapon with the heavy or strength properties, you can forgo one or more attacks. If you do so, the first time you deal damage with the weapon before the start of your next turn, you deal additional damage of the same type as the weapon's damage. If this instance would deal damage to multiple creatures, you can only apply this additional damage to one of them. For each attack you forgo, you deal additional damage equal to 1d12 + half your fighter level. If you miss with the first attack roll you make before the end of your next turn, or one target succeeds on the saving throw against your weapon's burst or rapid property, you instead deal normal weapon damage."
      },
      {
        "level": 10,
        "name": "Straight Through",
        "text": "When you score a critical hit on your turn while wielding a weapon with the heavy or strength properties, you can make one weapon attack against a creature within 5 feet of the target using your reaction."
      },
      {
        "level": 15,
        "name": "Overwhelm",
        "text": "When you use your Second Wind while wielding a weapon with the heavy or strength properties, if you hit with the first attack roll you make, or if one creatures fails the saving throw against your weapon's burst or rapid property, before the end of your next turn, you treat the hit as a critical hit. If you miss with the first attack roll you make before the end of your next turn, or one target succeeds on the saving throw against your weapon's burst or rapid property, you instead deal normal weapon damage."
      },
      {
        "level": 18,
        "name": "Pure Performance",
        "text": "At 18th level, attack rolls you make while wielding a weapon with the heavy or strength properties can't suffer from disadvantage."
      }
    ],
    "name": "Heavy Weapons Specialist"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Holographic Decoy",
        "text": "As an action, you can create a perfect illusion of yourself that lasts for 10 minutes, or until you lose your concentration (as if you were concentrating on a power). The decoy appears in an unoccupied space that you can see within 30 feet of you. The decoy is purely visual. If anything passes through it, it is revealed to be an illusion. For the duration, you can cast tech powers as though you were in the decoy's space. Both your decoy and the target of your tech power must be within your line of sight.\n\nYou can use your bonus action to cause the decoy to move up to 30 feet. As your decoy changes location, you can alter its appearance so that its movements appear natural for the decoy. If your decoy is ever more than 120 feet away from you, it immediately disappears.\n\nAdditionally, when both you and your decoy are within 5 feet of a creature that can see the decoy, but is not aware it is an illusion, you have advantage on attack rolls against that creature.\n\nA creature that uses its action to examine your decoy can determine that it is an illusion with a successful Intelligence (Investigation) check against your tech save DC. If a creature discerns the illusion for what it is, the creature can see through the image.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you finish a short or long rest."
      },
      {
        "level": 3,
        "name": "Mark of the Illusionist",
        "text": "The target of your Ranger's Quarry feature has disadvantage on all checks made to discern the nature of your illusions. Additionally, when the target of your Ranger's Quarry is reduced to 0 hit points, you can use your reaction to immediately cause an active illusion, or your Holographic Decoy, to take the form of the creature as long as the creature's dimensions fall within the power's capacity restrictions."
      },
      {
        "level": 7,
        "name": "Charged Illusions",
        "text": "When a creature discerns the nature of an illusion you have created using a tech power or class feature while within 5 feet of it, you can dispel the illusion (no action required) to have the creature take energy damage equal to 1d10 + half your scout level."
      },
      {
        "level": 11,
        "name": "Quick Escape",
        "text": "Whenever you take damage, you can use your reaction to swap places with an illusion of yourself that you have created using a tech power or class feature. The illusion must be within 60 feet of you, and you must be able to see it."
      },
      {
        "level": 15,
        "name": "Improved Decoys",
        "text": "You can create up to four duplicates of yourself, instead of one, when you use your Holographic Decoy feature. When you use your bonus action to move a decoy, you can move any number of them with the same bonus action."
      }
    ],
    "name": "Illusionist Technique"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Techcasting",
        "text": "You have derived powers from schematics with the aid of your wristpad. See chapter 10 for the general rules of techcasting and chapter 12 for the tech powers list.\n\nYou learn 3 tech powers of your choice, and you learn more at higher levels, as shown in the Tech Powers Known column of the Industrial Approach Techcasting table. You may not learn a tech power of a level higher than your Max Power Level.\n\nYou have a number of tech points equal to half of your berserker level, as shown in the Tech Points column of the Industrial Approach Techcasting table, + your Intelligence modifier. You use these tech points to cast tech powers. You regain all expended tech points when you finish a short or long rest.\n\nMany tech powers can be overcharged, consuming more tech points to create a greater effect. You can overcharge these powers to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Industrial Approach Techcasting table.\n\nYou may only cast tech powers at 4th-level once. You regain the ability to do so after a long rest.\n\nIntelligence is your techcasting ability for your tech powers. You use your Intelligence whenever a power refers to your techcasting ability. Additionally, you use your Intelligence modifier when setting the saving throw DC for a tech power you cast and when making an attack roll with one.\n\nTech save DC = 8 + your proficiency bonus + your Intelligence modifier\n\nTech attack modifier = your proficiency bonus + your Intelligence modifier\n\nYou use a wristpad (found in chapter 5 of the Player's Handbook) as a tech focus for your tech powers."
      },
      {
        "level": 3,
        "name": "Industrious Tech",
        "text": "You can cast tech powers while raging as long as the power's casting time is no more than 1 action and the power does not require concentration. While raging, you add your rage damage to damage rolls from tech powers you cast that require a tech attack or saving throw. If a tech power damages more than one target, you may only apply your rage damage to one of them. \n\nCasting tech powers during rage counts as attacking for the purposes of maintaining rage, and you can use your Reckless Attack feature to gain advantage when casting a tech power that requires a tech attack."
      },
      {
        "level": 6,
        "name": "Explosive Resilience",
        "text": "Once per round, when you deal damage that includes your rage damage, you can cause a localized explosion around the recipient of that damage. Each creature within 5 feet of the damaged creature other than you takes acid, cold, fire, ion, or lightning damage (your choice) equal to your rage damage bonus, and you gain resistance to the chosen damage type until the end of your next turn.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest."
      },
      {
        "level": 10,
        "name": "Painkiller",
        "text": "Whenever you cast a tech power of 1st-level or higher, or deal damage using your Explosive Resilience feature, you can cause a friendly creature you can see within 30 feet to gain temporary hit points equal to half your berserker level + your Intelligence modifier. Additionally, while they have these temporary hit points, they have advantage on saving throws against effects that would cause them to be frightened."
      },
      {
        "level": 14,
        "name": "Final Countdown",
        "text": "When you are reduced to 0 hit points but not killed outright, and you have at least one tech point remaining, you can expend all your remaining tech points and instead to drop to one hit point (no action required). If you do so, each creature within 30 feet of you must make a Dexterity saving throw against your tech save DC. On a failed save, they take 1d12 acid, cold, fire, ion, or lightning damage (your choice) damage for each tech point spent in this way, or half as much on a successful one."
      }
    ],
    "name": "Industrial Approach"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Forcecasting Secrets",
        "text": "You have learned secrets from a subtle attunement to the force. Choose two force powers of no higher level than your Max Power Level, as shown in the scout table. The chosen powers count as tech powers for you, but are not included in the number in the Powers Known column of the scout table.\n\nYou learn two additional powers at 5th, 9th, 13th, and 17th level. Whenever you gain a level in this class, you can choose one of the force powers you know and replace it with another force power of no higher level than your Max Power Level."
      },
      {
        "level": 3,
        "name": "Mark of the Inquisitor",
        "text": "When the target of your Ranger's Quarry feature is within 15 feet of you, you gain the following benefits:\n- Whenever the creature casts a force power, it must first succeed on a Constitution saving throw against your tech save DC to maintain concentration. On a failed save, the casting is disrupted, the force power fails, and the force points are wasted.\n- Whenever the creature starts its turn while concentrating on a force power, it must make a Constitution saving throw against your tech save DC to maintain concentration. On a failed save, it loses concentration on the power.\n\nThe radius of this feature increases to 30 feet at 11th level and 60 feet at 17th level."
      },
      {
        "level": 7,
        "name": "Sense Force",
        "text": "You can use your action to gain the benefits of the *force sight* force power until the end of your next turn.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 11,
        "name": "Force Resistance",
        "text": "While the target of your Ranger's Quarry feature is within 30 feet of you, you gain the following benefits:\n- You have advantage on saving throws against force powers they cast.\n- You have resistance to damage dealt by force powers they cast. \n\nThe radius of this feature increases to 60 feet at 17th level."
      },
      {
        "level": 15,
        "name": "Inquisitor's Wrath",
        "text": "You can cast the *force suppression* and *sever force* force powers at 3rd level against the target of your Ranger's Quarry without expending tech points. If they are within 30 feet of you, you have advantage on the forcecasting ability check for these powers.\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a long rest.\n\nThe radius of this feature increases to 60 feet at 17th level."
      }
    ],
    "name": "Inquisitor Technique"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Mystical Erudition",
        "text": "You've undergone extensive training in lore from the Jal Shey's collected knowledge. You learn one language of your choice, and you gain proficiency in your choice of Lore, Medicine, Nature, or Technology. You learn an additional language and an additional skill proficiency from the above list at 11th level.\n\nAdditionally, you can strike multiple pressure points to extract crucial details about your foe. Whenever you hit a creature with an unarmed strike, you can learn learn certain information about its capabilities. The GM tells you if the creature has one of the following characteristics of your choice:\n- Condition immunities\n- Damage vulnerabilities\n- Damage resistances\n- Damage immunities"
      },
      {
        "level": 6,
        "name": "Extort Truth",
        "text": "You can hit a series of hidden nerves on a creature with precision, temporarily causing them to be unable to mask their true thoughts and intent. When you hit a creature with a melee weapon attack, you can have the attack deal no damage and spend 1 focus point to force them to make a Charisma saving throw against your focus save DC. On a failed save, the creature is unable to speak a deliberate lie for 1 minute and all Charisma checks directed at the creature are made with advantage for the duration. \n\nOn a success or failure, a creature is aware that you attempted to influence them. They can choose to avoid answering questions to which they would normally respond with a lie."
      },
      {
        "level": 6,
        "name": "Preternatural Counter",
        "text": "Your quick mind and study of your foe allows you to use their failure to your advantage. When a creature within 5 feet of you misses you with a melee attack, you can use your reaction to make an unarmed strike against that creature."
      },
      {
        "level": 11,
        "name": "Mercurial Mind",
        "text": "You've honed your awareness and reflexes through mental aptitude and pattern recognition. Once per turn, if you've already used your reaction, you can spend 1 focus point to take an additional reaction. You can only take one reaction per turn."
      },
      {
        "level": 17,
        "name": "Debilitating Barrage",
        "text": "You've gained the knowledge to temporarily inhibit a creature's fortitude by striking a series of pressure points. Whenever you hit a creature with an unarmed strike, you can spend 3 focus points to cause the creature to become vulnerable to a damage type of your choice. This effect lasts for 1 minute or until they take damage of the chosen type."
      }
    ],
    "name": "Jal Shey Order"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Jar'Kai lightsaber form, detailed in Chapter 6 of the Player's Handbook. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Acklay",
        "text": "As a bonus action, you can enter a destructive stance for one minute. While in this stance, you can add half your Strength or Dexterity modifier (your choice, minimum of one) to any melee weapon damage roll you make that doesn't already include that modifier. Additionally, when you hit a creature with a melee weapon attack, you can move up to 5 feet without provoking opportunity attacks.\n\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain the following Channel the Force option.\n\nOnce per turn, when you miss with a melee weapon attack, you can expend a use of your Channel the Force to immediately make another melee weapon attack against the same target (no action required)."
      },
      {
        "level": 7,
        "name": "Eye of the Storm",
        "text": "When you score a critical hit with a melee weapon attack, you regain an expended use of your Channel the Force."
      },
      {
        "level": 15,
        "name": "Rising Whirlwind",
        "text": "As an action, you can rush forward up to 30 feet to an unoccupied space you can see without provoking opportunity attacks. Each creature within 5 feet of your path must make a Dexterity saving throw (DC = 8 + your bonus to attacks with your weapon). A creature takes normal weapon damage on a failed save, or half as much on a successful one. If you are wielding separate two light- or vibro-weapons in each hand with which you are proficient, or a weapon with the double property, a creature makes this save with disadvantage, and takes additional damage equal to your Strength or Dexterity modifier (your choice, minimum of one) on a failed save if it doesn't already include that modifier.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 20,
        "name": "Master of Domination",
        "text": "You are a whirlwind of strikes, eviscerating all who step within your reach. Your Strength and Dexterity scores increase by 2. Your maximum for these scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to kinetic, energy, and ion damage from weapons.\n- When you hit a creature with a melee weapon attack, you have advantage on the next melee weapon attack roll you make against that creature, and that creature provokes an opportunity attack from you even if they take the Disengage action before leaving your reach until the end of your next turn.\n- Creatures provoke an opportunity attack from you when they enter your reach.\n\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Jar'Kai Form"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in heavy armor."
      },
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain your choice of the Juyo or Vaapad lightsaber form, detailed in Chapter 6 of the Player's Handbook. If you already know the chosen form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Vornskr",
        "text": "As a bonus action, you can take a savage stance, designating one creature you can see within 10 feet of you as your prey for 1 minute. You have advantage on attack rolls against the creature. If the target drops to 0 hit points, you can use a bonus action on a subsequent turn to mark a new creature.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you complete a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain one of the following Channel the Force options. Choose Snap Aggression for Juyo or Assertive Defense for Vaapad.\n\nIf you are surprised at the start of combat and aren't incapacitated, you can expend a use of your Channel the Force to act normally on your first turn.\n\nWhen you reduce the damage dealt by a force power to 0 using the *saber reflect* power, and you're wielding a lightweapon or vibroweapon, you can expend a use of your Channel the Force to reflect the attack at a target within range, regardless of what type the damage is."
      },
      {
        "level": 7,
        "name": "Fury",
        "text": "You gain one of the following features. Choose Relentless for Juyo or Punishing Charge for Vaapad.\n\nYou have advantage on initiative checks, and gain a 10 foot bonus to your speed on your first turn of combat.\n\nWhen a hostile creature you can see or hear within 30 feet of you casts a force power, you can use your reaction to move up to half your speed. You must end this move closer to the enemy than you started. If you end this movement within 5 feet of the creature, and the triggering force power required a ranged attack roll, they have disadvantage on the roll."
      },
      {
        "level": 15,
        "name": "Vengeance",
        "text": "You gain one of the following features. Choose Devastating Critical for Juyo or Their Power, My Strength for Vaapad.\n\nWhen you score a critical hit with a melee weapon attack, you gain a bonus to that weapon's damage roll equal to your guardian level.\n\nWhen you are dealt damage by a force power, you can reduce that damage by an amount equal to your guardian level (no action required).\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you complete a short or long rest."
      },
      {
        "level": 20,
        "name": "Master of Ferocity",
        "text": "You are a paragon of extraordinary martial prowess. Your Strength and Dexterity scores increase by 2. Your maximum for those scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to all damage.\n- When you take the Attack action on your turn, you can make one additional attack as part of that action.\n- Your critical hit range with weapons increases by 1.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you complete a long rest."
      }
    ],
    "name": "Juyo/Vaapad Form"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Darkness Charges",
        "text": "You learn to create a number of small charges that create enhanced darkness. Over the course of a short or long rest, you can create two charges. You can create an additional charge at 5th, 9th, 13th, and 17th level. Your charges can only be used by you, and they lose their potency at the end of your next short or long rest.\n\nOnce per turn, when you would make a weapon attack or unarmed strike, you can instead throw one of your charges. Your charges have a range equal to 30 feet + your Strength modifier x 5. You can throw a device at a point you can see within range. The charges create a pocket of darkness in a 10-foot radius sphere centered on that point. The darkness spreads around corners. It lasts for 1 minute or until an enhanced source of bright light dispells it."
      },
      {
        "level": 6,
        "name": "Disruptive Shock",
        "text": "Once per turn, when you hit a creature with a melee weapon attack when you have advantage, or it fails a saving throw against an effect that you control, you can choose to roll a Martial Arts die and deal additional psychic damage equal to the amount rolled.\n\nYou can use this feature a number of times equal to your proficiency bonus, as shown in the monk table. You regain any expended uses when you finish a short or long rest."
      },
      {
        "level": 11,
        "name": "One With Darkness",
        "text": "You have learned to become one with the shadows. When you are in an area of dim light or darkness, you can use your action to become invisible. You remain invisible until you make an attack, cast a power, otherwise take a hostile action, or are in an area of bright light."
      },
      {
        "level": 17,
        "name": "Opportunist",
        "text": "You can exploit a creature's momentary distraction when it is hit by an attack. Whenever a creature within 5 feet of you is hit by an attack made by a creature other than you, you can use your reaction to make a melee attack against that creature."
      }
    ],
    "name": "Kage Order"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Elemental Attunement",
        "text": "You gain the ability to bend the elements to your will. As an action, you can manipulate these forces to create one of the following effects of your choice at a space within 10 feet of you:\n- Create a harmless, instantaneous sensory effect related to air, earth, fire, or water, such as a shower of sparks, a puff of wind, a spray of light mist, or a gentle rumbling of stone.\n- Instantaneously light or snuff out a candle, a torch, or a small campfire.\n- Chill or warm up to 1 pound of nonliving material for up to 1 hour.\n- Cause earth, fire, water, or mist that can fit within a 1-foot cube to shape itself into a crude form you designate for 1 minute.\n\nThis range increases to 30 feet at 11th level and 60 feet at 17th level.\n\nAdditionally, as a bonus action on your turn, you can spend 1 focus point to conjure a weapon made of one of the four elements�air, earth, fire, or water�which lasts for 1 minute. Your weapon takes an appearance of your choice, it can only be used by you, and you can't be disarmed of it while you are conscious. You are proficient in this weapon, which counts as a monk weapon for you and uses your Martial Arts die for its damage rolls. You can only have one of these weapons at a time, and if you summon a new one the old one immediately disappears.\n\nYour whistling weapon has the returning property, the thrown property with a range of 20/60, and deals sonic damage on a hit. Additionally, when you hit a creature with the weapon, it is deafened until the end of its next turn.\n\nYour earthen weapon takes the form of stone, and deals kinetic damage on a hit. Additionally, when you hit a creature with it, you can force the target to make a Strength saving throw. On a failed save, the target is pushed back 5 feet. Lastly, while active, you can use Strength instead of Dexterity when determining your AC, as long as it doesn't already include that modifier.\n\nYour flaming weapon sheds bright light in a 10-foot radius and dim light for an additional 10 feet, deals fire damage, and when you hit a creature with it, the creature takes additional damage equal to half your focus ability modifier (minimum of one).\n\nYour watery weapon has the reach property, deals cold damage on a hit, and you can use your focus ability modifier instead of Dexterity or Strength for its attack and damage rolls. You must use the same modifier for both rolls. Additionally, when you would make a melee weapon attack, you can instead use your weapon to wet a 5-foot square within your weapon's reach. The affected area is difficult terrain. Each creature who starts its turn in the square or enters it for the first time must make a Dexterity saving throw, falling prone on a failed save."
      },
      {
        "level": 6,
        "name": "Elemental Adept",
        "text": "You gain two of the following features. You gain an additional option at 11th and 17th level. \n\nYou can use these features a combined number of times equal to your proficiency bonus, as shown in the monk table. You regain all expended uses when you complete a long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 2 focus points to use it. When you do so, your maximum focus points are reduced by 2 until you complete a long rest.\n\nYou can use your action to choose an area of flame that you can see and that fits within a 5-foot cube within 60 feet. You can extinguish the fire in that area, and you create either fireworks or smoke when you do so.\n\n*Fireworks.* The target explodes with a dazzling display of colors. Each creature within 10 feet of the target must succeed on a Constitution saving throw or become blinded until the end of your next turn.\n\n*Smoke.* Thick black smoke spreads out from the target in a 20-foot radius, moving around corners. The area of the smoke is heavily obscured. The smoke persists for 1 minute or until a strong wind disperses it.\n\nAs an action, you call up a mighty gale, which swirls around you in a 10-foot radius and moves with you, remaining centered on you. The wind lasts for 10 minutes. The wind deafens both you and other creatures in its area. It extinguishes unprotected flames in its area that are torch-sized or smaller and hedges out vapor, gas, and fog that can be dispersed by strong wind. The area is difficult terrain for creatures other than you and the attack rolls of ranged weapon attacks have disadvantage if the attacks pass in or out of the wind.\n\nAs an action, you can choose a 5-foot-square unoccupied space on the ground that you can see within 30 feet. A Medium hand made from soil and stone, which lasts for 1 minute, rises in that space and reaches for one Large or smaller creature you can see within 5 feet of it. The target must make a Strength saving throw. On a failed save, the target takes 2d6 kinetic damage and is restrained for the duration. As a bonus action on each of your turns, you can cause the hand to crush the restrained target, which must make a Strength saving throw. It takes 2d6 kinetic damage on a failed save, or half as much damage on a successful one. To break out, the restrained creature can use its action to make a Strength check against your focus save DC. On a success, the target escapes and is no longer restrained by the hand. As an action, you can cause the hand to reach for a different creature or to move to a different unoccupied space within range. The hand releases a restrained target if you do either.\n\nAs an action, you focus your energy into a torrent of fire that streaks away from you. A line of roaring flame \n\n30 feet long and 5 feet wide emanates from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 3d8 fire damage on a failed save, or half as much damage on a successful one.\n\nYou reach out to the ground beneath you. You can use your bonus action to gain tremorsense with a range of 30 feet and a burrow speed equal to your walking speed for up to 1 minute. Your movement leaves behind a tunnel that remains for as long as this ability is active, after which it collapses.\n\nAs an action, you form a line of strong wind 60 feet long and 10 feet wide that blasts from you in a direction you choose for one minute or until you lose concentration or dismiss the effect (no action required). Each Large or smaller creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line. Any creature in the line must spend 2 feet of movement for every 1 foot it moves when moving closer to you. The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them. As a bonus action on each of your turns before the effect ends, you can change the direction in which the line blasts from you.\n\nYou can use your action pull water from air, and return it to the atmosphere. In an open container, you can create up to 20 gallons of drinkable water. You may also produce a rain that falls within a 30-foot cube and extinguishes open-air flames. You can destroy the same amount of water in an open container, or destroy a 30-foot cube of fog.\n\nAs an action, you can cause a flurry of ice crystals to erupt from a point you can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a Dexterity saving throw. On a failed save, a creature takes 3d6 cold damage, and gains 1 slowed level until the start of your next turn. On a successful save, a creature takes half as much damage and isn't slowed."
      },
      {
        "level": 11,
        "name": "Elemental Master",
        "text": "At 11th level, you gain one of the following features. You gain an additional option at 17th level.\n\nYou can use these features a combined number of times equal to half your proficiency bonus, as shown in the monk table. You regain all expended uses when you complete a long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 3 focus points to use it. When you do so, your maximum focus points are reduced by 3 until you complete a long rest.\n\n_Prerequisite: Crushing Hand of the Mountain_ or _Patient Bantha Listens_\nAs an action, you can choose a point you can see on the ground within 120 feet. A fountain of churned earth and stone erupts in a 20-foot cube centered on that point. Each creature in that area must make a Dexterity saving throw. A creature takes 3d12 kinetic damage on a failed save, or half as much damage on a successful one. Additionally, the ground in that area becomes difficult terrain until cleared. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand.\n\n_Prerequisite: Curtain of Unyielding Wind_ or _Rush of the Shyrack_\nAs an action, you can gain a flying speed equal to your movement speed for 10 minutes. You can hover while this technique is active, but when it ends, you fall if you are still aloft, unless you can stop the fall.\n\n_Prerequisite: Burning Ember Flourish_ or _Hatchling's Flame_\nAs an action, you can create a wall of fire on a solid surface within 120 feet. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for 1 minute.\n\nWhen the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 fire damage, or half as much damage on a successful save.\n\nOne side of the wall, chosen by you when you use this feature, deals 5d8 fire damage to each creature that ends its turn within 10 feet of that side of the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage.\n\n_Prerequisite: Shape the Rainclud_ or _Swarming Ice Rabbit_\nAs an action, you can control any freestanding water within 300 feet of you inside an area you choose that is a cube up to 100 feet on a side. You can choose from any of the following effects when you use this feature. As an action on your turn, you can repeat the same effect or choose a different one.*Flood.* You cause the water level of all standing water in the area to rise by as much as 20 feet. If the area includes a shore, the flooding water spills over onto dry land. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes down. Any Huge or smaller creatures in the wave's path are carried with it to the other side. Any Huge or smaller creatures struck by the wave have a 25 percent chance of being knocked prone. The water level remains elevated until the feature ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts. \n\n*Part Water.* You cause water in the area to move apart and create a trench. The trench extends across the feature's area, and the separated water forms a wall to either side. The trench remains until the feature ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored.\n\n*Redirect Flow.* You cause flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the feature's area, it resumes its flow based on the terrain conditions. The water continues to move in the direction you chose until the feature ends or you choose a different effect.\n\n*Whirlpool.* This effect requires a body of water at least 50 feet square and 25 feet deep. You cause a whirlpool to form in the center of the area. The whirlpool forms a vortex that is 5 feet wide at the base, up to 50 feet wide at the top, and 25 feet tall. Any creature or object in the water and within 25 feet of the vortex is pulled 10 feet toward it. A creature can swim away from the vortex by making a Strength (Athletics) check against your feature save DC. When a creature enters the vortex for the first time on a turn or starts its turn there, it must make a Strength saving throw. On a failed save, the creature takes 2d8 kinetic damage and is caught in the vortex until the feature ends. On a successful save, the creature takes half damage, and isn't caught in the vortex. A creature caught in the vortex can use its action to try to swim away from the vortex as described above, but has disadvantage on the Strength (Athletics) check to do so. The first time each turn that an object enters the vortex, the object takes 2d8 kinetic damage; this damage occurs each round it remains in the vortex."
      },
      {
        "level": 17,
        "name": "Elemental Paragon",
        "text": "You gain one of the following features. \n\nOnce you've used the chosen feature, you must complete a long rest before you can use it again.\n\nWhile you have no remaining uses of this feature, you can instead expend 4 focus points to use it. When you do so, your maximum focus points are reduced by 4 until you complete a long rest.\n\n_Prerequisite: Ride the Wind_\nAs an action, you conjure a whirlwind around you, granting the following benefits until the start of your next turn:\n- Ranged attacks made against you have disadvantage.\n- You gain a flying speed of 60 feet. If you are still flying when the technique ends, you fall, unless you can somehow prevent it.\n\n- You can use your action to create a 15-foot cube of swirling wind centered on a point you can see within 60 feet of you. Each creature in that area must make a Constitution saving throw. A creature takes 2d10 kinetic damage on a failed save, or half as much damage on a successful one. If a Large or smaller creature fails the save, that creature is also pushed up to 10 feet away from the center of the cube.\n\nAt the start of each of your turns, you can use your bonus action to extend the benefits of this feature until the start of your next turn, to a maximum duration of 1 minute. This effect ends immediately if you are incapacitated or die.\n\n_Prerequisite: River of Hungry Flame_\nAs an action, you cause flames to race across your body, granting the following benefits until the start of your next turn:\n- You have resistance to fire damage.\n- The flames shed bright light in a 30-foot radius and dim light for an additional 30 feet.\n- Any creature that moves within 5 feet of you for the first time on a turn or ends its turn there takes 1d10 fire damage.\n- You can use your action to create a line of fire 15 feet long and 5 feet wide extending from you in a direction you choose. Each creature in the line must make a Dexterity saving throw, taking 4d8 fire damage on a failed save, or half as much on a successful one.\n\nAt the start of each of your turns, you can use your bonus action to extend the benefits of this feature until the start of your next turn, to a maximum duration of 1 minute. This effect ends immediately if you are incapacitated or die.\n\n_Prerequisite: Shape the Flowing River_\nAs an action, you cause frost to chill the area around you, granting the following benefits until the start of your next turn:\n- You have resistance to cold damage.\n- You can move across difficult terrain created by ice or snow without spending extra movement.\n- The ground in a 10-foot radius around you is icy and is difficult terrain for creatures other than you. The radius moves with you.\n- You can use your action to create a 15-foot cone of freezing ice extending from your outstretched hand in a direction you choose. Each creature in the cone must make a Constitution saving throw. A creature takes 4d6 cold damage on a failed save, or half as much damage on a successful one. A creature that fails its save against this effect gains 1 slowed level until the start of your next turn.\n\nAt the start of each of your turns, you can use your bonus action to extend the benefits of this feature until the start of your next turn, to a maximum duration of 1 minute. This effect ends immediately if you are incapacitated or die.\n\n_Prerequisite: Earth Reaches for Sky_\nAs an action, you cause rock to envelop you, granting the following benefits until the start of your next turn:\n- You have resistance to kinetic and energy damage.\n- You can move across difficult terrain made of earth or stone without spending extra movement. You can move through solid earth or stone as if it was air without destabilizing it, but you can't end your movement there. If you do so, you are immediately shunted to the nearest unoccupied space that you can occupy and take force damage equal to twice the number of feet you are moved.\n- You can use your action to create a small earthquake on the ground in a 15-foot radius centered on you. Other creatures on that ground must succeed on a Dexterity saving throw or be knocked prone.\n\nAt the start of each of your turns, you can use your bonus action to extend the benefits of this feature until the start of your next turn, to a maximum duration of 1 minute. This effect ends immediately if you are incapacitated or die."
      },
      {
        "level": 17,
        "name": "Avatar",
        "text": "As an ultimate display of your mastery of the elements, you can spend 5 focus points as an action to have the elements of water, earth, fire, and air form a protective sphere around your body, gaining multiple benefits for 1 minute. While this ability is active, you have resistance to cold, energy, fire, kinetic, lightning, and sonic damage. You also gain a burrow, fly, and swim speed equal to your movement speed. Lastly, you can use any of the following abilities as a bonus action:\n- You create a small earthquake on the ground in a 15-foot radius around you. Each creature in that area must make a Dexterity saving throw. On a failed save, a creature takes 1d6 kinetic damage and is knocked prone.\n- You create a line of fire 15 feet long and 5 feet wide extending from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.\n- You create a 15-foot cube of swirling wind centered on a point you can see within 60 feet of you. Each creature in that area must make a Constitution saving throw. A creature takes 1d10 kinetic damage on a failed save, or half as much damage on a successful one. If a Large or smaller creature fails the save, that creature is also pushed up to 10 feet away from the center of the cube.\n- You create a 15-foot cone of ice shards extending from your outstretched hand in a direction you choose. Each creature in the cone must make a Constitution save throw. A creature takes 2d6 cold damage on a failed save, or half as much damage on a successful one. A creature that fails its save against this effect has its speed halved until the start of your next turn."
      }
    ],
    "name": "Kro Var Order"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Intercept",
        "text": "You gain proficiency in vibroweapons with the thrown property and they become monk weapons for you. Additionally, when you throw an improvised weapon, you are considered proficient in it, and it uses your Martial Arts die instead of its 1d4. \n\nAdditionally, you've learned to use thrown weapons to intercept projectiles traveling towards your allies. When you are wielding a weapon with which you are proficient, and a creature within your weapon's normal thrown range is hit by a ranged attack, you can use your reaction to throw your weapon to intercept the projectile. When you do so, the damage the creature takes from the attack is reduced by 1d10 + your Dexterity modifier + your monk level. If the weapon has the returning property, it then returns to your hand."
      },
      {
        "level": 6,
        "name": "Scattering Stance",
        "text": "When you take the Dodge action, until the start of your next turn you gain a number of special reactions equal to your proficiency bonus that you can only use for your Intercept feature. You can only take one reaction per turn."
      },
      {
        "level": 11,
        "name": "Curved Throw",
        "text": "You can curve your throws behind cover. When you make an attack roll with a weapon with the thrown property, you can spend 1 focus point to cause the target to gain no benefit from shields or cover, unless that cover is full cover."
      },
      {
        "level": 17,
        "name": "Relentless Assault",
        "text": "When you make multiple weapon attacks with thrown weapons against the same target on your turn, each attack after the first gains a +1 bonus to its attack roll, cumulatively, to a maximum bonus of +6."
      }
    ],
    "name": "Kyuzo Order"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Instinctive Combatant",
        "text": "You have learned to use your wits to help you survive. While you are wearing light or medium armor, you can use your Intelligence modifier instead of your Dexterity modifier when determining your AC."
      },
      {
        "level": 3,
        "name": "Mark of the Meticulous",
        "text": "You can use Intelligence instead of Dexterity for the attack and damage rolls made with weapons with the finesse property or blaster weapons against the target of your Ranger's Quarry.\n\nAdditionally, once per round, when you hit the target of your Ranger's Quarry with a tech attack, or it fails a saving throw against a tech power you cast that deals damage, you can deal additional damage equal to your Ranger's Quarry damage die of the same type as the tech power's damage."
      },
      {
        "level": 7,
        "name": "Adaptive Techie",
        "text": "When you complete a long rest, you can choose up to a number of tech powers you know equal to half your Intelligence modifier and replace them with another tech power, as long as that power is not of a higher level than your Max Power Level."
      },
      {
        "level": 11,
        "name": "Emergency Planning",
        "text": "You've learned to formulate and execute a plan. As an action, you can choose up to six creatures (including yourself) that you can see within 60 feet of you. For each creature, choose one of the following: ability check, attack roll, or saving throw. Each creature gains an Emergency Planning die, which is a d8.\n\nOnce within the next 10 minutes, each creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw, as determined when you use this feature. The creature can wait until after it rolls the d20 before deciding to use the Emergency Planning die, but must decide before the GM says whether the roll succeeds or fails. Once the Emergency Planning die is rolled, it is lost.\n\nA creature can have only one Emergency Planning die at a time.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\nYour Emergency Planning die changes when you reach certain levels in this class. to 1d10 at 13th level, and to 1d12 at 17th level."
      },
      {
        "level": 15,
        "name": "Exploit Weakness",
        "text": "Your training has taught you to find and exploit weaknesses in your prey. As a bonus action, you can impose disadvantage on the next saving throw the target of your Ranger's Quarry makes against an effect you control before the end of your next turn. Once you've done so, you must complete a short or long rest before you can do so again."
      }
    ],
    "name": "Mastermind Technique"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Maverick Superiority",
        "text": "You learn maneuvers that are fueled by special dice called superiority dice. See chapter 13 for the maneuvers list.\n\nYou learn two maneuvers of your choice, and you earn more at higher levels, as shown in the Maneuvers Known column of the Maverick Superiority table. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack, and you may only use each maneuver once per turn.\n\nEach time you learn new maneuvers, you can also replace one maneuver you know with a different one.\n\nYou have two superiority dice, which are d4s, and you earn more at higher levels, as shown in the Superiority Dice Quantity column of the Maverick Superiority table. This die changes as you gain operative levels, as shown in the Superiority Dice Size column of the Maverick Superiority table. A superiority die is expended when you use it. \n\nYou regain all of your expended superiority dice when you finish a short or long rest.\n\nYour maneuver ability varies based on the type of the maneuver you use. You use Strength, Dexterity, or Constitution for physical maneuvers (your choice), Intelligence, Wisdom, or Charisma for mental maneuvers (your choice), and an ability of your choice for general maneuvers. You use this ability whenever a maneuver refers to your maneuver ability. Additionally, you use this ability modifier when setting the saving throw DC for a maneuver you use.\n\nManeuver save DC = 8 + your proficiency bonus + your maneuver ability modifier"
      },
      {
        "level": 3,
        "name": "Know a Bit",
        "text": "You can add half your proficiency bonus to any ability check you make that doesn't already include your proficiency bonus."
      },
      {
        "level": 9,
        "name": "Outplayed",
        "text": "When a creature fails a saving throw or ability check against you or an effect you control, you don't need advantage on your attack roll to use Sneak Attack, you can't have disadvantage on attack rolls against that creature, and that creature can't have advantage on ability checks and saving throws against effects you control. These effects last until the end of your next turn."
      },
      {
        "level": 13,
        "name": "Practice Makes Perfect",
        "text": "When you make an ability check as part of or that is affected by a maneuver you use, you can choose to increase your level of proficiency in that check by one step (from trained to proficient, from proficient to expertise, from expertise to mastery, from mastery to high mastery, or from high mastery to grand mastery).\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 17,
        "name": "Flow State",
        "text": "As an action, you can choose to intensely focus for one minute, gaining the following benefits:\n- Once on each of your turns, when you use a maneuver, you can use a d4 instead of expending a superiority die.\n- You can't have disadvantage on ability checks or saving throws.\n- Creatures can't have advantage on attack rolls against you.\n\nOnce you've used this feature, you must complete a long rest before you can use it again."
      }
    ],
    "name": "Maverick Practice"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Improved Techcasting",
        "text": "Your command of techcasting improves.\n\nYou know 7 tech powers of your choice, instead of 5, and you learn more at higher levels, as shown in the Tech Powers Known column of the Mechanist Technique Techcasting table. You may not learn a tech power of a level higher than your Max Power Level.\n\nYou have a number of tech points equal to one and a half times your scout level, instead of your scout level, as shown in the Tech Points column of the Mechanist Technique Techcasting table, + your Intelligence modifier. You use these tech points to cast tech powers. You regain all expended tech points when you finish a short or long rest.\n\nYour Max Power Level becomes 2nd, instead of 1st, and it increases at higher levels, as shown in the Mechanist Technique Techcasting table.\n\nYou may only cast tech powers at 5th, 6th, and 7th-level once, instead of 4th and 5th. You regain the ability to do so after a long rest."
      },
      {
        "level": 3,
        "name": "Mark of the Mechanist",
        "text": "As a bonus action, you can cause the target of your Ranger's Quarry to emit an ion pulse, as long as the target is within 60 feet of you. The target, and any creatures within 5 feet of it, must make a Constitution saving throw against your tech save DC. On a failed save, roll your Ranger's Quarry die; each creature takes ion damage equal to the amount rolled."
      },
      {
        "level": 7,
        "name": "Potent Tech",
        "text": "You can use your ingenuity to bolster yourself or an ally. As an action, you can touch one creature (which can be yourself) and confer one of the following benefits of your choice to that creature:\n- For 10 minutes, the creature can roll a d3 whenever making an attack roll or an ability check and add the number rolled to the d20 roll. Once a creature receives this benefit, that creature can't receive it again until it finishes a short or long rest.\n- Roll a d4. The creature regains a number of tech points equal to the result. Once a creature receives this benefit, that creature can't receive it again until it finishes a long rest.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 11,
        "name": "High Voltage",
        "text": "You are used to working with electronics and have learned to increase their potency, while becoming inured to their dangers. You gain resistance to ion and lightning damage.\n\nAdditionally, whenever you deal ion damage to a creature, you can spend a tech point to force the creature to make a Constitution saving throw. On a failed save, it is stunned until the end of your next turn."
      },
      {
        "level": 15,
        "name": "Command Droid",
        "text": "You can reprogram a droid and bring it under your control. As an action, you can touch one droid that you can see that is the target of your Ranger's Quarry. That creature must make a Intelligence saving throw against your tech save DC. If it succeeds, you can't use this feature on it again for 24 hours. If it fails, it becomes friendly to you and obeys your commands until you use this feature again.\n\nIntelligent droids are harder to control in this way. If the target has an Intelligence of 8 or higher, it has advantage on the saving throw. If it fails the saving throw and has an Intelligence of 12 or higher, it can repeat the saving throw at the end of every hour until it succeeds and breaks free."
      }
    ],
    "name": "Mechanist Technique"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in astrotech�s implements."
      },
      {
        "level": 3,
        "name": "Improved Techcasting",
        "text": "Your command of techcasting improves.\n\nYou know 7 tech powers of your choice, instead of 5, and you learn more at higher levels, as shown in the Tech Powers Known column of the Mechanist Technique Techcasting table. You may not learn a tech power of a level higher than your Max Power Level.\n\nYou have a number of tech points equal to one and a half times your scout level, instead of your scout level, as shown in the Tech Points column of the Mechanist Technique Techcasting table, + your Intelligence modifier. You use these tech points to cast tech powers. You regain all expended tech points when you finish a short or long rest.\n\nYour Max Power Level becomes 2nd, instead of 1st, and it increases at higher levels, as shown in the Mechanist Technique Techcasting table.\n\nYou may only cast tech powers at 5th, 6th, and 7th-level once, instead of 4th and 5th. You regain the ability to do so after a long rest."
      },
      {
        "level": 3,
        "name": "Tracker Droid Companion",
        "text": "You learn to employ all the knowledge you've accumulated to create and customize your own tracker droid companion.\n\nCreate your tracker droid companion as detailed in the Companions section of the Customization Options document for Expanded Content. You must have astrotech's implements in order to create your droid.\n\nIn addition to its traits and features, your tracker droid companion gains an additional benefit while it is bonded to you:\n- Your tracker droid gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each droid trait in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of droid traits equal to half your Intelligence modifier (minimum of one).\n\nLastly, while your tracker droid companion is bonded and within 10 feet of you, you can use your action to learn the location of any droid or construct, tech focus, tech power or enhanced item within 60 feet of you or your tracker droid that isn't behind total cover. When you sense a tech power in this way, you learn what the power is. At 11th level, your tracker droid companion must be within 30 feet of you or your target to benefit from this feature. At 17th level, your tracker droid companion must be within 60 feet. You can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 7,
        "name": "Mark of the Mechanist",
        "text": "As a bonus action, you can cause the target of your Ranger's Quarry to emit an ion pulse, as long as the target is within 60 feet of you. The target, and any creatures within 5 feet of it, must make a Constitution saving throw against your tech save DC. On a failed save, roll your Ranger's Quarry die; each creature takes ion damage equal to the amount rolled."
      },
      {
        "level": 11,
        "name": "High Voltage",
        "text": "You are used to working with electronics and have learned to increase their potency, while becoming inured to their dangers. You gain resistance to ion and lightning damage.\n\nAdditionally, whenever you deal ion damage to a creature, you can spend a tech point to force the creature to make a Constitution saving throw. On a failed save, it is stunned until the end of your next turn."
      },
      {
        "level": 15,
        "name": "Command Droid",
        "text": "You can reprogram a droid and bring it under your control. As an action, you can touch one droid that you can see that is the target of your Ranger's Quarry. That creature must make a Intelligence saving throw against your tech save DC. If it succeeds, you can't use this feature on it again for 24 hours. If it fails, it becomes friendly to you and obeys your commands until you use this feature again.\n\nIntelligent droids are harder to control in this way. If the target has an Intelligence of 8 or higher, it has advantage on the saving throw. If it fails the saving throw and has an Intelligence of 12 or higher, it can repeat the saving throw at the end of every hour until it succeeds and breaks free."
      }
    ],
    "name": "Mechanist Technique (Companion)"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in Animal Handling or Piloting."
      },
      {
        "level": 3,
        "name": "Born to the Saddle",
        "text": "Your mastery as a rider becomes apparent. You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you're not incapacitated.\n\nFinally, mounting or dismounting a creature or vehicle costs you only 5 feet of movement, rather than half your speed."
      },
      {
        "level": 3,
        "name": "Unwavering Mark",
        "text": "You can menace your foes, foiling their attacks and punishing them for harming others. When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. This effect ends early if you are incapacitated or you die, or if someone else marks the creature. While it is within 5 feet of you, a creature marked by you has disadvantage on any attack roll that doesn't target you.\n\nAdditionally, if a creature marked by you deals damage to anyone other than you, you can make a special melee weapon attack against the marked creature as a bonus action on your next turn. You have advantage on the attack roll, and if it hits, the attacks weapon deals extra damage to the target equal to half your fighter level.\n\nRegardless of the number of creatures you mark, you can make this special attack a number of times equal to your Strength modifier (minimum of once), and you regain all expended uses when you finish a long rest."
      },
      {
        "level": 7,
        "name": "Warding Maneuver",
        "text": "You learn to fend off strikes directed at you, your mount, or other creatures nearby. If you or a creature you can see within 5 feet of you is dealt damage by an attack, you can roll 1d8 as a reaction if you're wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target's AC against that attack. If the attack still hits, the target has resistance against the attack's damage.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses of it when you finish a long rest."
      },
      {
        "level": 10,
        "name": "Hold the Line",
        "text": "You become a master of locking down your enemies. Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target gains 4 slowed levels until the end of the current turn."
      },
      {
        "level": 15,
        "name": "Ferocious Charger",
        "text": "You can run down your foes, whether you're mounted or not. If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Strength modifier) or be knocked prone. You can use this feature only once on each of your turns."
      },
      {
        "level": 18,
        "name": "Vigilant Defender",
        "text": "You respond to danger with extraordinary vigilance. In combat, you get a special reaction that you can take once on every creature's turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can't use it on the same turn that you take your normal reaction."
      }
    ],
    "name": "Mounted Specialist"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Theurgic Research",
        "text": "You gain proficiency in the Lore and Nature skills. Additionally, you can't have disadvantage on checks you make with them."
      },
      {
        "level": 3,
        "name": "Curse of Objurgation",
        "text": "When you target a creature with your Critical Analysis, you can choose one ability. While it can see you, the target has disadvantage on ability checks made with the chosen ability.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 6,
        "name": "Heightened Hex",
        "text": "When you use your Curse of Objurgation feature, each time the cursed creature deals damage to you or an allied creature you can see within 5 feet of you, the creature takes psychic damage equal to twice your Critical Analysis ability modifer (minimum of 2)."
      },
      {
        "level": 9,
        "name": "Voodoo Doll",
        "text": "Over the course of an hour, which can be done during a short rest, you can perform a ritual to construct an effigy of a creature. In order to do so, you must have at least heard of or seen the creature before, and the target must be in the same system as you. At the end of the hour, the creature must make a Wisdom saving throw against your maneuver save DC. This saving throw is modified by how well you know the target and the sort of physical connection you have to it, as shown in the Knowledge Save Modifier and Connection Save Modifier tables below. \n\n|||\n|:--|--:|\n|Secondhand (you have heard of the target) |+5|\n|Firsthand (you have met the target) |+0|\n|Familiar (you know the target well) |-5|\n\n|||\n|:--|--:|\n|Likeness or picture |-2|\n|Curse of Objurgation |-3|\n|Possession or garment |-4|\n|Body part, lock of hair, bit of nail, or the like |-10|\n\nOn a successful save, the target isn't affected, and you can't use this ritual against it again for 24 hours. On a failed save, the ritual creates a Tiny doll that is linked to the target. The doll remains linked for 24 hours, or for 10 minutes after you first use it. It disintegrates at the end of this duration. For the duration, you can see and hear the target through the doll as if you were within 5 feet of the creature.\n\nAdditionally, as action while the doll is in your possession, you can expend a Hit Die to torment the target, choosing an effect from the following options:\n- Burn: The target must succeed on a Wisdom saving throw. On a failed save, the target believes it is burning. While burning in this way, the target has has disadvantage on attack rolls made with Strength or Dexterity. This effect lasts for 1 hour.\n- Pain: The target must succeed on a Constitution saving throw or be wracked with pain for 1 hour. While in pain in this way, the target takes an additional 1d4 psychic damage whenever it takes damage.\n- Stab: The target must succeed on a Dexterity saving throw or gain 2 slowed levels and fall prone. The slowed levels effect lasts for 1 hour.\n\nThe target can only be under 1 effect at a time. When you use a new effect, any existing effects end. Placing an effect on a target requires maintaining your concentration, as if concentrating on a power.\n\nYou can use this feature twice. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 17,
        "name": "Toil and Trouble",
        "text": "You perfect your control of your curses, granting them unmatched potency. When the target of your Curse of \n\nObjurgation fails a saving throw against one of your maneuvers, you can choose to amplify that maneuver by expending a number of Hit Dice of your choice. The target immediately takes 1d8 psychic damage for every Hit Die spent in this way.\n\nAdditionally, when a creature attempts to use a power like *remove curse* or other similar abilities to remove a curse you set, they must roll a Wisdom or Charisma check (their choice) against your maneuver save DC. On a failed save, their attempt fails, and any force or tech points spent in this way are wasted."
      },
      {
        "level": 3,
        "name": "Occultist Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect your research on the occult. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order.\n\nYou have advantage on Intelligence (Lore) or Intelligence (Nature) checks.\n\n_Prerequisite: 5th level_\nYou can cast the *bestow curse* and *remove curse* force powers without spending force points. Wisdom or Charisma (your choice) is your forcecasting modifier for these powers.\n\nOnce you've cast a power using this feature, you must complete a long rest before you can cast it again.\n\n_Prerequisite: 9th level_\nWhen a creature marked by your Curse of Objurgation is reduced to 0 hit points, you can use a reaction and expend a Hit Die to immediately regain a use of your Curse of Objurgation.\n\nWhen you roll a 13 on an ability check, you treat it as if you rolled a 20.\n\nBefore you use a maneuver or power to set a curse on a target you can see, you can make a contested Dexterity (Sleight of Hand) check against the target's Wisdom (Insight) check. On a success, the target is unaware you set the curse on them.\n\n_Prerequisite: 13th level_\nYou ignore resistance to psychic damage, and you have resistance to psychic damage.\n\nAt the end of a long rest, you can choose one creature you can see within 30 feet (this includes you) to imbue with unnatural power. The creature's hit point maximum and current hit points increase by an amount equal to your scholar level, and it has advantage on Constitution saving throws made to avoid exhaustion. Both effects end after 8 hours."
      }
    ],
    "name": "Occultist Pursuit"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Voltaic Slash",
        "text": "Starting when you choose this calling at 3rd level, you learn the *lightning charge* force power, which does not count against your total powers known. Additionally, you can use Wisdom or Charisma as your forcecasting ability for it, and when you deal lightning damage with the *lightning charge* force power, you deal additional lightning damage equal to half your Wisdom or Charisma modifier (your choice, minimum of one) if it doesn't already include that modifier."
      },
      {
        "level": 3,
        "name": "Thunderous Momentum",
        "text": "Your stride becomes nigh unbreakable. You are immune to the shocked condition, and each slowed level only reduces your speed by 5 feet, unless it would reduce your speed to 0."
      },
      {
        "level": 7,
        "name": "Entropic Rush",
        "text": "You've learned to move with speed and precision, discharging your lightning in a massive burst. When you move at least half your speed before casting *lightning charge*, you make the attack roll with advantage. Additionally, on a hit, the lightning can leap a second time, to a third creature within range or back to the first creature."
      },
      {
        "level": 13,
        "name": "Living Current",
        "text": "You've learned to channel the damage done to you to enhance your strikes. The first time you deal damage on your turn, if you took damage since the start of your last turn, you can deal additional lightning damage equal to your Kinetic Combat die + half the amount of damage taken.\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a short or long rest."
      },
      {
        "level": 18,
        "name": "Retaliatory Strike",
        "text": "When a creature hits you with an attack while within 5 feet of you, you can use your reaction to cast the *lightning charge* force power, targeting them."
      }
    ],
    "name": "Path of Aggression"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Mystical Connection",
        "text": "You learn the *feedback* force power, which does not count against your total powers known. Additionally, you can use Wisdom or Charisma as your forcecasting ability for it, and you can use the Double Strike Force-Empowered Self option when you cast it as your action and the target fails its saving throw. Finally, when you deal psychic damage with the *feedback* force power, you deal additional psychic damage equal to your Wisdom or Charisma modifier (your choice, minimum of one) if it doesn't already include that modifier."
      },
      {
        "level": 3,
        "name": "Symbiot Spirit",
        "text": "You attract the attention of the spirit of a Force ghost. Over the course of one hour, you can attune to the spirit, forging a lasting connection. While attuned to a spirit, you gain the following benefits:\n- Your spirit is always audible and visible to you. Your spirit can choose to make itself audible and visible or inaudible and invisible to other creatures (no action required), but it is always visible to beings with truesight.\n- Your spirit can not interact with the corporeal world, but it is also not impeded by unenhanced walls or barriers.\n- Your spirit acts independently of you, and it only obeys your commands if it chooses to. In combat, it rolls its own initiative and acts on its own turn. Your spirit can't attack, but it can take other actions as normal.\n- While your spirit is within 100 feet of you, you can telepathically communicate with it. Additionally, as an action, you can see through your spirit's vision and hear what it hears until the start of your next turn. During this time, you are deaf and blind with regard to your own senses.\n- When you cast a force power with a range of touch, your spirit can deliver the power as if it had cast it. Your spirit must be within 100 feet of you, and it must use its reaction to deliver the power when you cast it. If the power requires an attack roll, you use your attack modifier for the roll.\n\nYou can only attune to one spirit at a time. If you attempt to attune to another spirit, you immediately break the bond with your current spirit.\n\n> #### Generating Your Spirit\n> Your spirit might be the ghost of a benevolent Jedi, discovered in the ruins of a Jedi temple, or a powerful Sith spirit lingering in an ancient artifact. It might be the spirit of a Nightsister sorceress, or a paragon of a long-forgotten monastic order. Work with your GM to determine the nature of your spirit.\n\nAdditionally, your spirit can briefly interact with the physical world. When you would make a melee attack, your spirit can deliver the attack as if it had made it. Your spirit must be within 100 feet of you, and it must use its reaction to deliver the attack. It uses your modifiers for the attack and damage rolls. You can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest."
      },
      {
        "level": 7,
        "name": "Invasive Presence",
        "text": "Your spirit can invade another creature's being. As an action, your spirit can touch a creature within 5 feet of it, forcing it to make a Wisdom saving throw against your universal force save DC. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw. \n\nOn a failed save, your spirit moves into that creatures space, inhabiting its body, for 1 minute. The affected creature has disadvantage on the first attack roll, ability check, or saving throw it makes each turn. At the end of each its turns, the creature repeats this save. On a success, it repels the spirit from its body, and it becomes immune to this feature for 24 hours.\n\nOnce you've used this feature, you must complete a long rest before you can use it again."
      },
      {
        "level": 13,
        "name": "Ethereal Vision",
        "text": "You and your guiding spirit both gain truesight out to 60 feet as long as your spirit is within 100 feet of you.\n\nAdditionally, when you use your action to see through your spirit's senses, you are no longer deaf and blind with regard to your own senses, able to comprehend what happens in both perspectives simultaneously."
      },
      {
        "level": 18,
        "name": "Assuming Direct Control",
        "text": "When a creature fails its saving throw against your Invasive Presence feature, the target becomes charmed by you for as long as Invasive Presence is active.\n\nWhile the target is charmed, you and your spirit have a telepathic link with it as long as you are within 100 feet of it. You and your spirit can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as \"Attack that creature,\" \"Run over there,\" or \"Fetch that object.\" If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.\n\nYou can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time you can also cause the creature to use a reaction, but this requires you to use your own reaction as well."
      }
    ],
    "name": "Path of Communion"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Aberrant Resilience",
        "text": "You learn the *resistance* force power, which does not count against your total powers known. Additionally, this power no longer requires concentration for you when you target yourself with it."
      },
      {
        "level": 3,
        "name": "Force-Empowered Kinesis",
        "text": "Your connection to the Force allows you to briefly become incorporeal. When you use a Force-Empowered Self option, until the end of your turn, you can move through other creatures and objects as if they are difficult terrain. If you end this movement inside a solid object or creature, you are immediately shunted to the nearest unoccupied space that you can occupy and take true damage equal to twice the number of feet you are moved."
      },
      {
        "level": 7,
        "name": "Out of Touch",
        "text": "As an action, you can step out of sync with the rest of the universe for 1 minute. At the start of each of your turns, roll a d20. If you roll 11 or higher, you and everything your are wearing or carrying are completely invisible to all beings, except for those with truesight. On a roll of 10 or lower, you instead appear as an indistinguishably blurred form roughly your normal height and weight, though a being with truesight sees you normally. Regardless of your appearance, for the duration, your speed doubles, you gain a flying speed equal to your walking speed, and you can move through creatures and objects willingly though you can not affect them and they can not affect you. You can end this feature early on your turn (no action required). When this effect ends, if you are inside a solid object or creature, you are immediately shunted to the nearest unoccupied space that you can occupy and take force damage equal to twice the number of feet you are moved. \n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 13,
        "name": "Event Cascade",
        "text": "You have advantage on attack rolls you make against creatures if you haven't dealt damage to them or affected them with a force power since the start of your previous turn."
      },
      {
        "level": 18,
        "name": "Aberrant Self",
        "text": "You no longer suffer the frailty of old age, and you can't be aged abnormally. You can still die of old age, however. Additionally, you no longer need food or water, and you no longer need to sleep. Lastly, the first time you take damage on each of your turns, you can roll your Kinetic Combat die and reduce the damage by that amount."
      }
    ],
    "name": "Path of Ethereality"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Form Combat Training",
        "text": "You learn one lightsaber form, as detailed in the Customization Options document for Expanded Content. \n\nAdditionally, you gain proficiency in all martial light- and vibro- weapons."
      },
      {
        "level": 3,
        "name": "Physical Conditioning",
        "text": "You've undergone special training, increasing your physical capabilities. You gain the following benefits: \n- You gain proficiency in medium armor. If you are already proficient in medium armor, you then gain proficiency in heavy armor. While you are wearing light or medium armor, you can use your Wisdom or Charisma modifier (your choice) instead of your Dexterity modifier when determining your AC.\n- Your hit point maximum increases by 3, and it increases by 1 again whenever you gain a level in this class."
      },
      {
        "level": 7,
        "name": "Enhanced Force-Empowered Self",
        "text": "Through intense physical training, you've improved your body's ability to access and channel the force flowing within you. \n\nWhen you would use a Force-Empowered Self option, you can choose to bolster the option, gaining an additional effect as listed below. You can only bolster a Force-Empowered Self option once per turn. \n\nYou can use these features a combined three times. You gain an additional use at 9th, 13th, and 17th level. You regain any expended uses when you finish a short or long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 1 force point to use it.\n\nWhen you bolster Deflection, when an attack would hit you before the start of your next turn, you subtract the same value rolled for Deflection from the damage taken.\n\nWhen you bolster Double Strike, you choose another creature within 5 feet of your target. They take damage of the same type equal to the result of the die rolled for Double Strike.\n\nWhen you bolster Slow Time, until the end of your turn you ignore difficult terrain, and can move along vertical surfaces and across liquids without falling during the move."
      },
      {
        "level": 13,
        "name": "Follow Through",
        "text": "When you take the Attack action on your turn, you can spend 2 force points and forgo one of your attacks to cast an at-will force power which requires you to make a melee weapon attack."
      },
      {
        "level": 18,
        "name": "Kinetic Mastery",
        "text": "Choose a lightsaber form you know. Once on each of your turns, you can use the chosen form without using your bonus action. \n\nYou can do so six times. You regain all expended uses when you complete a long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 1 force point to use it."
      }
    ],
    "name": "Path of Iron"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Sage Counsel",
        "text": "You learn the *guidance* force power, which does not count against your total powers known. Additionally, this power's die increases by one step (from d4 to d6, d6 to d8, d8 to d10, or d10 to d12)."
      },
      {
        "level": 3,
        "name": "Force-Empowered Allies",
        "text": "While you are concentrating on a power that benefits a friendly creature other than you, you gain new ways to utilize your Force-Empowered Self features. Each option costs 1 force point, and you can only target a creature that is benefiting from a power you cast.\n\nWhen an ally is hit with an attack roll, you can use your reaction and roll a Kinetic Combat die to add it to your ally's AC, potentially causing the attack to miss.\n\nWhen an ally hits with an attack roll, you can use your reaction and roll a Kinetic Combat die to deal additional damage of the same type as the attack.\n\nWhen an ally moves on their turn, you can use your reaction and roll a Kinetic Combat die to increase their speed by 5 x the amount rolled until the end of the turn."
      },
      {
        "level": 7,
        "name": "Unbreakable Focus",
        "text": "Once per long rest, you can cast the *battle meditation* force power at its base level without expending force points. While concentrating on *battle meditation*, at the start of each of your turns, the power's die increases by one step (from d4 to d6, d6 to d8, d8 to d10, or d10 to d12).\n\nAdditionally, whenever you make a Constitution saving throw to maintain concentration on a force power, you can treat a d20 roll of 9 or lower as a 10."
      },
      {
        "level": 13,
        "name": "Turbulent Presence",
        "text": "Once per long rest, you can cast the *improved battle meditation* force power at its base level without expending force points. While concentrating on *improved battle meditation*, at the start of each of your turns, the power's die increases by one step (from d6 to d8, d8 to d10, or d10 to d12).\n\nAdditionally, once per round, when a creature rolls a bonus or penalty die from an effect you control, you can have them roll the die with advantage or disadvantage (your choice)."
      },
      {
        "level": 18,
        "name": "Legendary Battle Meditation",
        "text": "Once per long rest, you can cast the *master battle meditation* force power without expending force points. While concentrating on *master battle meditation*, at the start of each of your turns, the power's die increases by one step (from d8 to d10, or d10 to d12).\n\nAdditionally, you gain a second reaction each round that you can only use for your Force-Empowered Allies feature. You can only take one reaction per turn."
      }
    ],
    "name": "Path of Meditation"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Techcasting Secrets",
        "text": "You have learned to intersperse your training with an aptitude for technology. Choose two tech powers of 1st level or lower. The chosen powers count as universal force powers for you, but are not included in the number in the Powers Known column of the sentinel table. \n\nAt 7th level, you learn two tech powers of 2nd level or lower. At 13th level, you learn two tech powers of 3rd level or lower. At 17th level, you learn two tech powers of 4th level or lower. Whenever you gain a level in this class, you can choose one of the tech powers you know and replace it with another tech power of no higher than the level determined by this feature."
      },
      {
        "level": 3,
        "name": "Synthetic Understanding",
        "text": "You've applied your newfound knowledge to broader pursuits. You gain proficiency in Technology or one tool of your choice.\n\nAdditionally, when you make an Intelligence (Technology) check, or a check with a tool, you may use your Wisdom or Charisma modifier (your choice) instead of your Intelligence modifier.\n\nFinally, when you deal damage with a tech power or your Double Strike Force Empowered Self option, you can choose to substitute the damage dealt as ion."
      },
      {
        "level": 7,
        "name": "Force-Empowered Tech",
        "text": "You learn to fully blend your technological aptitude with your use of the Force. You have three such effects: Disruption Pulse, Force Override, and Techcasting Insight. When you use your Force-Empowered Tech, you choose which effect to create.\n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you finish a short or long rest.\n\nAs an action, you can send out a 30 foot cone of electromagnetically-charged energy to overload enemy weapons. Each creature within the cone that is wearing or carrying a weapon with electric components must make an Intelligence saving throw. If the weapon is being worn, this save is made with disadvantage. On a failed save, the first attack they attempt to make with that weapon has disadvantage. A creature with multiple weapons must make a separate save for each weapon.\n\nWhen you cast a tech power that requires a saving throw, you can impose disadvantage on the save (no action required).\n\nAs an action, you can attempt to determine another creature's experience with techcasting. When you do so, you make an Intelligence (Technology) check contested by the target's Intelligence (Technology) check. If you succeed, you immediately learn the target's techcasting Max Power Level, as well as any tech powers currently affecting the target."
      },
      {
        "level": 13,
        "name": "Improved Force-Empowered Tech",
        "text": "You've gained access to two additional Force-Empowered Tech effects: Harmonic Synthesis and Conservation of Energy.\n\nWhen you use your action to cast a force power, you can use your bonus action to gain resistance to damage dealt by tech powers until the start of your next turn. If you use your action to cast a tech power, you can instead gain resistance to damage dealt by force powers.\n\nWhen you reduce a hostile creature to 0 hit points with a tech power, you can reduce the force point cost of the tech power to 0 (no action required)."
      },
      {
        "level": 18,
        "name": "Reflective Shield",
        "text": "When you use your Force-Empowered Tech features, a barrier for energy shimmers into existence, surrounding you until the end of your next turn. When you take damage, you can mitigate the incoming energy and potentially reflect it back at your attacker. You use your reaction to have resistance against the triggering damage, and if the source of the damage is within 5 feet of you, they take half of the total damage dealt as ion."
      }
    ],
    "name": "Path of Synthesis"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Protector",
        "text": "You learn the *saber ward* force power, which does not count against your total powers known. Additionally, when you cast it, you can spend 2 force points to extend the benefits to creatures of your choice within 5 feet of you while the power is active. The creatures immediately lose this benefit if they move more than 5 feet away from you."
      },
      {
        "level": 3,
        "name": "Kinetic Ward",
        "text": "You can use your reaction to deflect a strike when you are dealt damage by a melee weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your sentinel level. If you reduce the damage to 0, you can redirect it at another target if you have a weapon capable of doing so. You can spend 1 force point to make a melee weapon attack at a target within 5 feet of you with the weapon, as part of the same reaction. You make this attack with proficiency, regardless of your weapon proficiencies, and if the attack hits it uses your Kinetic Combat die for its damage roll. If *saber ward* is active, you have advantage on the attack roll."
      },
      {
        "level": 7,
        "name": "Kinetic Bulwark",
        "text": "You can extend your Kinetic Ward to a creature within 5 feet of you when they are hit by a melee weapon attack. If this damage is not reduced to 0, the warded creature takes any remaining damage."
      },
      {
        "level": 13,
        "name": "Indomitable",
        "text": "The Force flowing through you makes it harder for movement to be forced upon you. You have advantage on ability checks and saving throws to avoid being grappled or moved. If you fail the saving throw or ability check, you can spend 1 force point to reroll one of the dice once. You must use the new roll.\n\nAdditionally, if allies within 5 feet of you are gaining the benefit of your *saber ward* force power, they also gain the benefit of this feature."
      },
      {
        "level": 18,
        "name": "Kinetic Bastion",
        "text": "You can protect allies even further from you. When a creature within 30 feet of you is hit by a melee weapon attack, you can use your reaction to teleport to them and extend your Kinetic Ward. If this damage is not reduced to 0, the warded creature takes any remaining damage. \n\nYou can use this feature six times. You regain all expended uses when you finish a long rest."
      }
    ],
    "name": "Path of Tenacity"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Wild Power",
        "text": "You learn the *enfeeble* force power, which does not count against your total powers known. Additionally, you can use Wisdom or Charisma as your forcecasting ability for it, and you can use the Double Strike Force-Empowered Self option when you cast it as your action and the target fails its save. Finally, you add your Wisdom or Charisma modifier (your choice, minimum of one) to damage rolls with it."
      },
      {
        "level": 3,
        "name": "Ichor Conjuring",
        "text": "You learn to call on the spirits of beasts and grant them ichorous form. Once on each of your turns, when you cast a force power and deal necrotic damage to a creature, you can conjure a familiar within 5 feet of it (no action required). The familiar takes the form of a humanoid or beast made of green, glowing smoke, and it lasts for 1 minute, until you dismiss it as a bonus action, until you manifest another spirit, or until you're incapacitated or die.\n\nYour familiar has an AC equal to your universal force save DC, 1 hit point, and immunity to all conditions. If it has to make a saving throw, it uses your saving throw bonus for the roll. It is the same size as you regardless of its appearance, and it occupies its own space. On your turn, you can mentally command the familiar to move up to 30 feet in any direction (no action required). If your familiar is ever more than 30 feet from you at the end of your turn, it is destroyed. While you have a familiar, you gain the following benefits:\n- As a bonus action, you can use your magicks to teleport, swapping places with your familiar at a cost of 15 feet of your movement, regardless of the distance between the two of you.\n- When you take the Attack action on your turn, any attack you make with that action can originate from your space or the familiar's space. You make this choice for each attack.\n- When a creature that you can see within 5 feet of your familiar moves at least 5 feet away from it, you can use your reaction to make an opportunity attack against that creature as if you were in the familiar's space.\n\nStarting at 11th level, you can summon your familiar when you deal damage with any force power, instead of just necrotic. Additionally, you can summon your familiar when you use a Force-Empowered Self option on your turn."
      },
      {
        "level": 7,
        "name": "Nature's Vigor",
        "text": "You've learned to attune your senses with nature. If you spend at least 1 minute meditating while in nature, you gain the following benefits for 1 hour:\n- You ignore difficult terrain caused by nature.\n- You can understand plants within 30 feet of you. They can telepathically communicate simple ideas to you, including memories from within the past day.\n- You can command plants within 30 feet of you to create difficult terrain, or other tasks at the GM's discretion (no action required).\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 13,
        "name": "Waters of Life",
        "text": "You've learned to absorb the fleeting magicks of your familiar. When your familiar is destroyed by taking damage, you can choose to grant temporary hit points equal to 2d8 + your Wisdom or Charisma modifier (your choice) to one friendly creature of your choice you can see within 30 feet.\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 18,
        "name": "Stormcaller",
        "text": "You've learned to command the elements to summon a fierce storm in a 30-foot radius around you. As an action, you can gain the following benefits for 1 minute:\n- You gain a flying speed equal to your walking speed.\n- You have resistance to energy, lightning, and necrotic damage.\n- Whenever a hostile creature enters this radius for the first time on a turn or starts its turn there, it takes 10 lightning damage.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Path of Witchcraft"
  },
  {
    "className": "Sentinel",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in Animal Handling."
      },
      {
        "level": 3,
        "name": "Wild Power",
        "text": "You learn the *enfeeble* force power, which does not count against your total powers known. Additionally, you can use Wisdom or Charisma as your forcecasting ability for it, and you can use the Double Strike Force-Empowered Self option when you cast it as your action and the target fails its save. Finally, you add your Wisdom or Charisma modifier (your choice, minimum of one) to damage rolls with it."
      },
      {
        "level": 3,
        "name": "Beast Companion",
        "text": "You learn to create a powerful bond through the Force with your own  beast companion.\n\nCreate your beast companion as detailed in the Companions section of the Customization Options document for Expanded Content.\n\nIn addition to its traits and features, your beast companion gains an additional benefit while it is bonded to you:\n- Your beast gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each beast trait in excess of your proficiency bonus, your force point maximum is reduced by 2. \n\nLastly, while bonded and within 10 feet of you, your beast companion gains the following benefits:\n- When you use a Force-Empowered Self option to increase your speed or armor class, you can instead grant this bonus to your beast companion. \n\n- You and your beast companion can communicate telepathically, though your beast companion can only communicate in and understand simple concepts.\n\nThis radius increases to 30 feet at 11th level, and 60 feet at 17th level."
      },
      {
        "level": 7,
        "name": "Nature's Vigor",
        "text": "You've learned to attune your senses with nature. If you spend at least 1 minute meditating while in nature, you gain the following benefits for 1 hour:\n- You ignore difficult terrain caused by nature.\n- You can understand plants within 30 feet of you. They can telepathically communicate simple ideas to you, including memories from within the past day.\n- You can command plants within 30 feet of you to create difficult terrain, or other tasks at the GM's discretion (no action required).\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 13,
        "name": "Beastwarden",
        "text": "Your bond with your beast companion strengthens, granting the following benefits while your beast companion is within 30 feet of you:\n- When you cast a force power that targets only yourself, and your beast companion is within range, you can also target your beast companion with that power. \n- If you or your beast have darkvision and the other doesn't, the other gains it with the same radius. If you both have darkvision, you both use the larger radius of the two, which then increases by 30 feet.\n- If you or your beast have advantage on Perception checks and the other doesn't, the other gains advantage on Perception checks. If you both have advantage on Perception checks, when either of you makes a Perception check with advantage, you can reroll one of the dice once.\n\nThis radius increases to 60 feet at 17th level."
      },
      {
        "level": 18,
        "name": "Stormcaller",
        "text": "You've learned to command the elements to summon a fierce storm in a 30-foot radius around you. As an action, you can gain the following benefits for 1 minute:\n- You gain a flying speed equal to your walking speed.\n- You have resistance to energy, lightning, and necrotic damage.\n- Whenever a hostile creature enters this radius for the first time on a turn or starts its turn there, it takes 10 lightning damage.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Path of Witchcraft (Companion)"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Artful Dancer",
        "text": "Your training with music and dancing grants you certain benefits. You gain proficiency in the Performance skill and one musical instrument of your choice.\n\nAdditionally, while you are not wearing armor or wielding a medium or heavy shield, you can add half your Charisma modifier to your AC as long as it doesn't already include that modifier."
      },
      {
        "level": 3,
        "name": "Dazzling Steps",
        "text": "You learn to conduct impressive displays of grace and speed in combat. While you aren't wearing medium or heavy armor or wielding a medium or heavy shield, and you take the Attack action on your turn and attack with a weapon with either the light or finesse properties, your walking speed increases by 10 feet until the end of the turn, and if you deal Sneak Attack damage, you may choose to forgo two of your Sneak Attack dice to make the attack a dazzling step.\n\nSome of your dazzling steps require your target to make a saving throw to resist the dazzling step's effects. The saving throw DC is calculated as follows:\n\nDazzling Step save DC = 8 + your proficiency bonus + your Charisma modifier\n\nYou defend yourself from further attack. Roll two Sneak Attack dice. You gain temporary hit points that last until the start of your next turn equal to the amount rolled.\n\nYou twist and twirl around the target. The target must make a Strength saving throw. A Huge or larger creature automatically succeeds. On a failed save, it is pushed back 5 feet, and you can immediately move into the space it just vacated without provoking opportunity attacks.\n\nChoose another creature that you can see within your reach. The creature must make a Dexterity saving throw. On a failed save, roll two Sneak Attack dice. The creature takes damage equal to the amount rolled. This damage is of the same as your weapon's damage."
      },
      {
        "level": 9,
        "name": "Flexible Body",
        "text": "You are able to use your acrobatic talent to gain the upper hand in combat. You can use the bonus action granted by your Cunning Action to shove or trip a creature. When you do so, you can make a Dexterity (Acrobatics) check instead of a Strength (Athletics) check. \n\nAdditionally, you now ignore difficult terrain, you can move through space occupied by hostile creatures, and you can squeeze through smaller spaces without expending extra movement."
      },
      {
        "level": 13,
        "name": "Dance of Death",
        "text": "You can use your action to make a weapon attack against any number of creatures within 5 feet of you, with a separate attack roll for each target. You can choose to deal Sneak Attack damage to each creature you hit, but you can only roll half your number of Sneak Attack dice per creature.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 17,
        "name": "Master of Dance",
        "text": "Your confidence when putting on a show has extended into combat. You add your Charisma modifier to initiative checks. Additionally, any creature who fails a saving throw against your Dazzling Step save DC has disadvantage on the first attack roll they make against you each turn until the end of your next turn."
      }
    ],
    "name": "Performance Practice"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiency",
        "text": "You gain proficiency in one of the following skills of your choice: Insight, Lore, Performance, or Persuasion. Alternatively, you learn one language of your choice."
      },
      {
        "level": 3,
        "name": "Fighting Spirit",
        "text": "Your intensity in battle can shield you and help you strike true. As a bonus action on your turn, you can give yourself advantage on all weapon attack rolls until the end of the current turn. When you do so, you also gain 5 temporary hit points. The number of hit points increases when you reach certain levels in this class, increasing to 10 at 10th level and 15 at 15th level.\n\nYou can use this feature three times. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 7,
        "name": "Resilient Retainer",
        "text": "Your discipline and attention to detail allow you to excel in social situations. You gain proficiency in Persuasion.\n\nAdditionally, your self-control also causes you to gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice)."
      },
      {
        "level": 10,
        "name": "Tireless Spirit",
        "text": "When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use."
      },
      {
        "level": 15,
        "name": "Rapid Strike",
        "text": "You learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action. You can do so no more than once per turn."
      },
      {
        "level": 18,
        "name": "Strength Before Weakness",
        "text": "Your fighting spirit can delay the grasp of death. If you take damage that reduces you to 0 hit points, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn. While you have 0 hit points during that extra turn, taking damage causes death saving throw failures as normal, and three death saving throw failures can still kill you. When the extra turn ends, you fall unconscious if you still have 0 hit points.\n\nOnce you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Praetorian Specialist"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Careful Steps",
        "text": "You gain skills that represent your precise movement. You gain proficiency in your choice of Acrobatics or Stealth. While raging, you have advantage on checks you make with the chosen skill."
      },
      {
        "level": 3,
        "name": "Focused Rage",
        "text": "You hone your rage to a razor sharp focus. While raging, when you make a melee weapon attack using Dexterity, you add your rage damage to the damage roll. Additionally, you can use your Reckless Attack feature to give you advantage on melee weapon attacks using Dexterity during your turn."
      },
      {
        "level": 6,
        "name": "Battle Anticipation",
        "text": "While raging, your critical hit range with melee weapon attacks using Dexterity increases by 1."
      },
      {
        "level": 10,
        "name": "Improved Danger Sense",
        "text": "While raging, when you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage against effects that you can see, such as traps and powers, you are treated as proficient in the save, and you instead take no damage if you succeed on a saving throw, and only half damage if you fail."
      },
      {
        "level": 14,
        "name": "Calm Within the Storm",
        "text": "The precision with which you act during your rage causes you to become a storm of reactive lethality. When you use your Reckless Attack feature, you can make a number of opportunity attacks equal to your proficiency bonus without using your reaction, and when a creature within 5 feet of you misses you with an attack, you can use your reaction to make a melee weapon attack using Dexterity against that creature."
      }
    ],
    "name": "Precision Approach"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in heavy armor."
      },
      {
        "level": 3,
        "name": "Hunting Party",
        "text": "When you take the Attack action on your turn, you can use a bonus action to direct one of your companions to strike. When you do so, choose a friendly creature who can see or hear you. That creature can immediately use its reaction to make one weapon attack.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses of it when you finish a long rest."
      },
      {
        "level": 3,
        "name": "Mark of the Predator",
        "text": "If the target of your Ranger's Quarry feature can see you, a number of friendly creatures you choose up to your Intelligence modifier have advantage on Dexterity (Stealth) checks made to hide from it."
      },
      {
        "level": 7,
        "name": "Predator's Resolve",
        "text": "You can use your action to gain the following benefits for 1 minute:\n- You have advantage on Constitution saving throws.\n- At the start of each of your turns, you gain temporary hit points equal to your Constitution modifier (minimum of one).\n- When you use your Hunting Party feature and the target of the attack is your Ranger's Quarry, your ally gains a bonus to damage on the attack equal to your Ranger's Quarry Damage Die.\n\nOnce you've used this feature, you can't use it again until you finish a short or long rest."
      },
      {
        "level": 11,
        "name": "Prey on the Weak",
        "text": "When you hit a creature with a weapon attack, and the creature is below its hit point maximum, the next attack roll made against that creature before the end of your next turn by someone other than you has advantage."
      },
      {
        "level": 15,
        "name": "On the Hunt",
        "text": "When you use your Predator's Resolve feature, a number of friendly creatures you choose up to your Intelligence modifier that you can see within 30 feet of you also gain the benefits of the feature."
      }
    ],
    "name": "Predator Technique"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Tools of the Trade",
        "text": "You've learned to move swiftly while wielding larger armaments. You gain proficiency with medium armor and martial vibroweapons. If you are already proficient in medium armor, you instead gain proficiency in heavy armor. Additionally, you can deal Sneak Attack damage with any weapon, as long as it does not have the heavy or special properties.\n\nLastly, you don't need advantage on your attack roll to use your Sneak Attack if no creature other than your target is within 5 feet of you, as long as the target of the attack is below its hit point maximum. All the other rules for the Sneak Attack class feature still apply to you."
      },
      {
        "level": 3,
        "name": "Blitz Attack",
        "text": "You've learned ways to use your martial ability to boost your combat performance. When you deal Sneak Attack damage, you may choose to forgo two of your Sneak Attack dice to make the attack a blitz attack.\n\nSome of your blitz attacks require your target to make a saving throw to resist the attack's effects. The saving throw DC is as follows:\n\nBlitz Attack save DC = 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice)\n\nThe target must make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turn.\n\nRoll two of your Sneak Attack dice. The first time the target would deal damage before the start of your next turn, that damage is reduced by an amount equal to the resulting roll.\n\nIf the target makes an attack against you or an allied creature within 5 feet of you before the start of your next turn, you can use your reaction to make a melee weapon attack against it."
      },
      {
        "level": 9,
        "name": "Extra Attack",
        "text": "When you take the Attack action on your turn, you can choose to attack twice, instead of once. Additionally, you can deal Sneak Attack damage any number of times on your turn. Each time you deal Sneak Attack damage, you can choose how many Sneak Attack dice you apply. You can't apply more than your total Sneak Attack dice each turn."
      },
      {
        "level": 13,
        "name": "Unrelenting Advance",
        "text": "You have advantage on ability checks and saving throws against effects that would grapple or restrain you. Additionally, if you are grappled or restrained, and you could use your action to attempt to end the effect, you can instead use your bonus action."
      },
      {
        "level": 17,
        "name": "Razor Focus",
        "text": "You can enter a hyper-focused state of mind for 1 minute as a bonus action. You must maintain concentration, as if concentrating on a power. For the duration, each time you successfully deal Sneak Attack damage against a creature, you gain two additional Sneak Attack dice, cumulatively, as your attacks become increasingly precise. These additional dice are lost when your focus ends, whether through failing to maintain concentration or after 1 minute.\n\nThe first time you use this feature, you suffer no ill effect. If you use this feature again before you finish a long rest, you suffer one level of exhaustion each time you use it."
      }
    ],
    "name": "Pugnacity Practice"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Techcasting",
        "text": "You have derived powers from schematics with the aid of your wristpad. See chapter 10 for the general rules of techcasting and chapter 12 for the tech powers list.\n\nYou learn 3 tech powers of your choice, and you learn more at higher levels, as shown in the Tech Powers Known column of the Rakatan Order Techcasting table. You may not learn a tech power of a level higher than your Max Power Level.\n\nYou have a number of tech points equal to half of your monk level (rounded up), as shown in the Tech Points column of the Rakatan Order Techcasting table, + your Intelligence, Wisdom, or Charisma modifier (your choice). You use these tech points to cast tech powers. You regain all expended tech points when you finish a short or long rest.\n\nMany tech powers can be overcharged, consuming more tech points to create a greater effect. You can overcharge these powers to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Rakatan Order Techcasting table.\n\nYou may only cast tech powers at 4th-level once. You regain the ability to do so after a long rest.\n\nIntelligence, Wisdom, or Charisma is your techcasting ability for your tech powers (your choice). You use this ability whenever a power refers to your techcasting ability. Additionally, you use this ability modifier when setting the saving throw DC for a tech power you cast and when making an attack roll with one.\n\nTech save DC = 8 + your proficiency bonus + your techcasting ability modifer\n\nTech attack modifier = your proficiency bonus + your techcasting ability modifer\n\nYou use a wristpad (found in chapter 5) as a techcasting focus for your tech powers."
      },
      {
        "level": 6,
        "name": "Focused Tech",
        "text": "You can cast your tech powers using your focus points. When you do so, your maximum focus points are reduced by 1 until you complete a long rest.\n\nAdditionally, when you use a Focus feature, you gain the following tech enhancements. Each effect costs 1 tech point.\n\n*Flurry of Blows.* When you hit with an attack with Flurry of Blows, you can deal an additional 1d8 damage of the same type.\n\n*Patient Defense.* While under the effects of your Patient Defense, when you are hit by an attack, you can use your reaction and roll your Martial Arts die to increase your AC against the attack.\n\n*Step of the Wind.* While under the effects of your Step of the Wind, you can become immune to the shocked condition, and have each slowed level only reduce your speed by 5 feet, unless it would reduce your speed to 0."
      },
      {
        "level": 11,
        "name": "Harmonious Rakatan",
        "text": "You can use your Focus features using your tech points. When you do so, your maximum tech points are reduced by 1 until you complete a long rest.\n\nAdditionally, you are constantly under the effects of the *detect enhancement* tech power. As an action, you can cast the *analyze* tech power without expending tech points. When you do so, *detect enhancement* is suppressed and you can't do so again until you complete a short or long rest."
      },
      {
        "level": 17,
        "name": "Tech Mastery",
        "text": "You learn and can cast one 5th-level tech power once per long rest without expending tech points."
      }
    ],
    "name": "Rakatan Order"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Rakish Audacity",
        "text": "Your unmistakable confidence propels you into battle. You can add your Charisma modifier to your initiative rolls.\n\nAdditionally, you don't need advantage on your attack roll to use your Sneak Attack if no creature other than your target is within 5 feet of you, as long as the target of the attack is within 5 feet of you. All the other rules for the Sneak Attack class feature still apply to you.\n\nFinally, during your turn, if you make a melee attack against a creature, that creature can't make opportunity attacks against you for the rest of your turn."
      },
      {
        "level": 3,
        "name": "Nimble Step",
        "text": "You learn to fluidly strike and maneuver through combat. When you deal Sneak Attack damage to a creature, you may choose to forgo two of your Sneak Attack Dice in order to maneuver across the battlefield.\n\nSome of your fancy footworks require your target to make a saving throw to resist the debilitating strike's effects. The saving throw DC is calculated as follows: \n\nNimble Step save DC = 8 + your proficiency bonus + your Dexterity modifier.\n\nYou attempt to determine your target's next strike. Roll two Sneak Attack dice, and the target must make a Charisma saving throw. On a failed save, your AC increases by the higher amount rolled on the dice against the first attack it makes against you before the start of your next turn. On a successful save, your AC instead increases by the lower amount.\n\nYou attempt to disarm a creature with your attack. The target must succeed on a Strength saving throw or be forced to drop one item of your choice that it's holding. If you have a free hand, you can catch the item. Otherwise, it lands at your feet.\n\nRoll two Sneak Attack dice. Your speed increases by 5 x the greater result of the two dice, and you ignore difficult terrain until the end of your current turn."
      },
      {
        "level": 9,
        "name": "Panache",
        "text": "Your charm becomes extraordinarily beguiling. As an action, you can make a Charisma (Persuasion) check contested by a creature's Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language.\n\nIf you succeed on the check and the creature is hostile to you, it has disadvantage on attack rolls against targets other than you and can't make opportunity attacks against targets other than you. This effect lasts for 1 minute, until one of your companions attacks the target or affects it with a power, or until you and the target are more than 60 feet apart.\n\nIf you succeed on the check and the creature isn't hostile to you, it is charmed by you for 1 minute. While charmed, it regards you as a friendly acquaintance. This effect ends immediately if you or your companions do anything harmful to it."
      },
      {
        "level": 13,
        "name": "Elegant Maneuver",
        "text": "You can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn."
      },
      {
        "level": 17,
        "name": "Master Duelist",
        "text": "Your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can't use this feature again until you finish a short or long rest."
      }
    ],
    "name": "Ruffian Practice"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in astrotech's implements."
      },
      {
        "level": 3,
        "name": "Techcasting",
        "text": "You have derived powers from schematics with the aid of your wristpad. See chapter 10 for the general rules of techcasting and chapter 12 for the tech powers list.\n\nYou learn 3 tech powers of your choice, and you learn more at higher levels, as shown in the Tech Powers Known column of the Saboteur Practice Techcasting table. You may not learn a tech power of a level higher than your Max Power Level.\n\nYou have a number of tech points equal to half of your operative level, as shown in the Tech Points column of the Saboteur Practice Techcasting table, + your Intelligence modifier. You use these tech points to cast tech powers. You regain all expended tech points when you finish a short or long rest.\n\nMany tech powers can be overcharged, consuming more tech points to create a greater effect. You can overcharge these powers to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Saboteur Practice Techcasting table.\n\nYou may only cast tech powers at 4th-level once. You regain the ability to do so after a long rest.\n\nIntelligence is your techcasting ability for your tech powers. You use your Intelligence whenever a power refers to your techcasting ability. Additionally, you use your Intelligence modifier when setting the saving throw DC for a tech power you cast and when making an attack roll with one.\n\nTech save DC = 8 + your proficiency bonus + your Intelligence modifier\n\nTech attack modifier = your proficiency bonus + your Intelligence modifier\n\nYou use a wristpad (found in chapter 5) as a techcasting focus for your tech powers."
      },
      {
        "level": 3,
        "name": "Tracker Droid Companion",
        "text": "You learn to employ all the knowledge you've accumulated to create and customize your own tracker droid companion.\n\nCreate your tracker droid companion as detailed in the Companions section of the Customization Options document for Expanded Content. You must have astrotech's implements in order to create your droid.\n\nIn addition to its traits and features, your tracker droid companion gains an additional benefit while it is bonded to you:\n- Your tracker droid gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each droid trait in excess of your proficiency bonus, your tech point maximum is reduced by 1. Over the course of a long rest, you can install, replace, or remove a number of tracker droid traits equal to half your Intelligence modifier (minimum of one).\n\nLastly, when you cast a tech power of 1st-level or higher that would affect only one target, and your tracker droid companion is bonded and within 10 feet of you or your target, your tracker droid companion can use its reaction to increase the level at which you are casting your power by 1. This feature can increase a power's level above your Max Power Level, and using this feature does not cost additional tech points.\n\nAt 11th level, your tracker droid companion must be within 30 feet of you or your target to benefit from this feature. At 17th level, your tracker droid companion must be within 60 feet.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 9,
        "name": "Powered Ambush",
        "text": "If you are hidden from a creature when you cast a power on it, the creature has disadvantage on any saving throw it makes against the power this turn."
      },
      {
        "level": 13,
        "name": "Ion Pulse",
        "text": "As a bonus action on your turn, you can expend one or more of your tracker droid's Hit Dice to have it emit an pulse of ion energy. Each creature within 5 feet of your tracker droid must make a Constitution saving throw against your tech save DC. A creature takes ion damage for each Hit Die expended in this way on a failed save, or half as much as on a successful one. The size of the damage die equals the size of your tracker droid's Hit Die. Any electronics not being worn or carried within the blast radius are disabled until rebooted."
      },
      {
        "level": 17,
        "name": "Sabotage",
        "text": "You gain the ability to sabotage a tech power in the process of being cast. When a hostile creature casts a tech power, and you are the target of the tech power or within its area of effect, you can use your reaction to force that creature to make an Intelligence saving throw against your tech save DC. On a successful save, the power is cast as normal.\n\nOn a failed save, you negate the power's effects, and the caster takes 1d6 lightning damage per level of the power it was casting. Additionally, on a failed save, the caster's tech focus used to cast the tech power is overloaded and can't be used to cast tech powers for 1 minute. \n\nAt the end of each of the caster's turns, it can repeat the Intelligence saving throw. On a success, it can use the tech focus to cast tech powers again.\n\nOnce you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Saboteur Practice"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "General Practice",
        "text": "You gain proficiency in Medicine, and you can use your Intelligence modifier instead of your Wisdom modifier for checks made with it.\n\nAdditionally, you can expend one use of a traumakit to help revitalize your wounded allies during a short rest. If you or any friendly creatures within 30 feet of you regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points.\n\nThe extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level."
      },
      {
        "level": 3,
        "name": "Debilitating Strike",
        "text": "You learn to apply your anatomical knowledge in direct combat, in order to hinder your targets. When you deal Sneak Attack damage to a creature, you may choose to forgo two of your Sneak Attack Dice in order to hinder the creature, provided they have the appropiate physiology.\n\nSome of your debilitating strikes require your target to make a saving throw to resist the debilitating strike's effects. The saving throw DC is calculated as follows: \n\nDebilitating Strike save DC = 8 + your proficiency bonus + your Intelligence modifier.\n\nYou attempt to create a lingering wound in the target for one minute. The target must make a Constitution saving throw. On a failed save, at the start of each of the target's turns, it takes true damage equal to one Sneak Attack die and repeats this saving throw, ending the effect on a success. \n\nYou attempt to cause distracting pain in the target. The target must make a Constitution saving throw. On a failed save, it has disadvantage on attack rolls until the end of your next turn. \n\nYou attempt to hamper the target's movement. The target must make a Constitution saving throw. On a failed save, it gains 1 slowed level and it makes Dexterity saving throws with disadvantage until the end of its next turn."
      },
      {
        "level": 9,
        "name": "Swift Surgery",
        "text": "You know how to quickly patch up wounds, given the right tools. You are able to use a traumakit or administer a medpac as a bonus action, and when you use a traumakit to stabilize a dying creature, that creature also regains a number of hit points equal to your Intelligence modifier."
      },
      {
        "level": 13,
        "name": "Dosage Control",
        "text": "Your knowledge of medicine allows you to partition and ration healing supplies very effectively, without impacting its potency. Over the course of 1 hour, which can be done during a rest, you can carefully measure and mark out dosages of a medpac within reach. The medpac can now be used twice before it is consumed.\n\nAt your DM's discretion, you may be able to use this feature on other pacs, stims, or adrenals, most likely involving an ability check to succeed."
      },
      {
        "level": 17,
        "name": "Self-Sustain",
        "text": "You have advantage on death saving throws.\n\nAdditionally, when you are stabilized, you regain 1 hit point. Once you've used this feature, you can't use it again until you finish a short or long rest."
      }
    ],
    "name": "Sawbones Practice"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Back Blast",
        "text": "You gain proficiency in all blasters with the burst or rapid property that lack the two-handed property. Additionally, when a creature fails a saving throw against the burst or rapid property of a weapon you control and with which you are proficient, you can apply your Sneak Attack damage to one creature dealt damage in this way as long as that creature didn't have advantage on the save.\n\nWhen you reach 9th level in this class, when multiple creatures fail a saving throw against the burst property of a weapon you control and with which you are proficient, you can divide your Sneak Attack dice amongst the targets as you see fit."
      },
      {
        "level": 3,
        "name": "Upper Hand",
        "text": "You learn to use underhanded tactics to gain the upper hand. When you deal Sneak Attack damage to a creature, you may choose to forgo two of your Sneak Attack Dice in order to perform an upper hand technique.\n\nSome of your upper hand techniques require your target to make a saving throw to resist the technique's effects. The saving throw DC is calculated as follows: \n\nUpper Hand save DC = 8 + your proficiency bonus + your Charisma modifier\n\nYou attempt to knock the target prone while within 15 feet of it. The target must make a Strength saving throw or be knocked prone.\n\nYou attempt to stun the target while within 15 feet of it. The target must make a Constitution saving throw or be stunned until the start of its next turn.\n\nYou attempt to hamper the target while within 15 feet of it. The target must make a Dexterity saving throw. If it fails, it gains 1 slowed level and makes Dexterity saving throws with disadvantage until the end of its next turn."
      },
      {
        "level": 9,
        "name": "Sleight of Foot",
        "text": "When a creature moves to within 5 feet of you, you can use your reaction to move up to half your speed away from the creature without provoking opportunity attacks. You must end this movement further from the creature than you started."
      },
      {
        "level": 13,
        "name": "Hostile Negotiations",
        "text": "You gain proficiency in Intimidation or Persuasion. Additionally, while you are wielding a weapon with which you are proficient, you can't have disadvantage on Charisma (Intimidation) and Charisma (Persuasion) checks, and if the target would make a contested check, they can't have advantage on it."
      },
      {
        "level": 17,
        "name": "Double Tap",
        "text": "You can deal Sneak Attack damage twice per turn, but you can't deal more than your total Sneak Attack dice to a single target per turn."
      }
    ],
    "name": "Scrapper Practice"
  },
  {
    "className": "Operative",
    "features": [
      {
        "level": 3,
        "name": "Venomous",
        "text": "You gain proficiency with the poisoner's kit, and you can apply a poison as a bonus action.\n\nAdditionally, you learn to create a number of special poison vials. Over the course of a short or long rest, you can create two doses of poison. You must have a poisoner's kit in order to create these doses. Your doses can only be used by you, and they lose their potency at the end of your next short or long rest.\n\nAs an action, you can use one of your doses to coat one vibroweapon, one slug cartridge, or one wrist launcher dart. A creature hit by the coated weapon must make a Constitution saving throw (DC = 8 + your proficiency bonus + your Intelligence modifier), taking 1d4 + your Intelligence modifier poison damage on a failed save or half as much on a successful one. Once applied, the poison retains potency for 1 minute before drying.\n\nThe quantity and damage of your doses increases at higher levels, to three and 2d4 at 5th level, four and 3d4 at 9th level, five and 4d4 at 13th level, and six and 5d4 at 17th level."
      },
      {
        "level": 3,
        "name": "Dark Arts",
        "text": "You learn to combine poison and stealth to perform assassination techniques. When you deal Sneak Attack damage to a creature you may choose to forgo two of your Sneak Attack dice to make the attack a dark art.\n\nDark Arts save DC = 8 + your proficiency bonus + your Intelligence modifier\n\nYou attempt to poison the target. The target must make a Constitution saving throw or be poisoned until the end of your next turn.\n\nYou attempt to blind the target. The target must make a Wisdom saving throw or be blinded until the end of your next turn.\n\nYou feint to momentarily disappear from your target's purview. The target must make a Dexterity saving throw. On a failure, you can move up to 10 feet without provoking opportunity attacks from the target."
      },
      {
        "level": 9,
        "name": "Poisoner",
        "text": "You are a master of poisons. Targets of your poisons cannot have advantage on the saving throw made to resist your poison, and you have advantage on Dexterity (Sleight of Hand) checks made to conceal the application of poisons.\n\nAdditionally, when you apply poison to a weapon or its ammunition, that poison can affect an additional hit or an additional piece of ammunition, and when you deal Sneak Attack damage with an attack that would include poison damage, you can change your Sneak Attack damage to poison damage."
      },
      {
        "level": 13,
        "name": "One With the Dark",
        "text": "You learn to partially enter the spirit realm. As an action, you can become invisible as an enhanced effect, along with anything you are wearing or carrying, for 1 hour or until you dismiss this effect (no action required). This invisibility ends early immediately after you deal damage to a creature or you force a creature to make a saving throw.\n\nOnce you use this feature, you can't do so again until you finish a long rest. While you have no remaining uses of this feature, you can expend one of your poison doses from your Venomous feature to use this feature again. When you do so, your maximum doses decreases by 1 until the end of your next long rest."
      },
      {
        "level": 17,
        "name": "Shades of Night",
        "text": "Your familiarity with poisons and the spirit realm has opened up new paths of life and death for you. Your Evasion feature now applies to Constitution saving throws as well as Dexterity saving throws.\n\nAdditionally, whenever you create poison using your Venomous feature, you can change the damage type to acid, cold, fire, lightning or necrotic. When you do so, and you deal Sneak Attack damage with a weapon coated with your poison, you can also change your Sneak Attack damage to the chosen type."
      }
    ],
    "name": "Shadow Killer Practice"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Shii-Cho lightsaber form, detailed in Chapter 6 of the Player's Handbook. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Sarlaac",
        "text": "As a bonus action, you can enter a frenetic stance for one minute. While in this stance, the first time you hit a creature with a melee weapon attack on your turn, it has disadvantage on the next melee attack roll it makes against you before the start of your next turn. Additionally, if that creature is within 5 feet of you, it must make a Strength saving throw (DC = 8 + your proficiency bonus + your Strength or Dexterity modifier). On a failed save, it is pushed back 5 feet, and you can immediately move into the space it just vacated without provoking opportunity attacks.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain the following Channel the Force option.\n\nWhen you hit a creature with a melee weapon attack, you can expend a use of your Channel the Force (no action required)  to attempt to disarm the target, forcing it to drop one item of your choice that it's holding. The creature must make a Strength saving throw against your universal force save DC. On a failed save, it drops the object you choose. If you are within 5 feet of the target, and you have a free hand, you can catch the item. Otherwise, the object lands at its feet."
      },
      {
        "level": 7,
        "name": "Unpredictable Motion",
        "text": "While you are wielding a light- or vibro-weapon, opportunity attacks against you are made at disadvantage."
      },
      {
        "level": 15,
        "name": "Sarlaac Sweep",
        "text": "When a creature moves to within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature. If the attack hits, you can attempt to damage another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to your Strength or Dexterity modifier (your choice). The damage is of the same type dealt by the original attack."
      },
      {
        "level": 20,
        "name": "Master of Determination",
        "text": "The erratic fluidity of your movement confounds even the most determined of foes. Your Strength or Dexterity and Wisdom or Charisma scores (your choice) increase by 2. Your maximum for these scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to kinetic, energy, and ion damage from weapons.\n- Attack rolls made against you can't have advantage.\n- When more than one creature is within 5 feet of you, you gain a bonus to your Armor Class equal to the number of creatures within 5 feet of you, up to your Wisdom or Charisma modifier (your choice, minimum of one).\n- When you use your Sarlaac Sweep feature, you have advantage on the attack roll, and you can apply the bonus damage to every creature within 5 feet of you.\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Shii-Cho Form"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Hacker's Disposition",
        "text": "You gain proficiency with slicer's kits and in the Technology skill. Additionally, you can't have disadvantage on checks you make with them."
      },
      {
        "level": 3,
        "name": "Techcasting",
        "text": "You have derived powers from schematics with the aid of your wristpad. See chapter 10 for the general rules of techcasting and chapter 12 for the tech powers list.\n\nYou learn 3 tech powers of your choice, and you learn more at higher levels, as shown in the Tech Powers Known column of the Slicer Pursuit Techcasting table. You may not learn a tech power of a level higher than your Max Power Level.\n\nYou have a number of tech points equal to half of your scholar level, as shown in the Tech Points column of the Slicer Pursuit Techcasting table, + your Intelligence modifier. You use these tech points to cast tech powers. You regain all expended tech points when you finish a short or long rest.\n\nMany tech powers can be overcharged, consuming more tech points to create a greater effect. You can overcharge these powers to a maximum level, which increases at higher levels, as shown in the Max Power Level column of the Slicer Pursuit Techcasting table.\n\nYou may only cast tech powers at 4th-level once. You regain the ability to do so after a long rest.\n\nIntelligence is your techcasting ability for your tech powers. You use your Intelligence whenever a power refers to your techcasting ability. Additionally, you use your Intelligence modifier when setting the saving throw DC for a tech power you cast and when making an attack roll with one.\n\nTech save DC = 8 + your proficiency bonus + your Intelligence modifier\n\nTech attack modifier = your proficiency bonus + your Intelligence modifier\n\nYou use a wristpad (found in chapter 5 of the Player's Handbook) as a tech focus for your tech powers."
      },
      {
        "level": 3,
        "name": "Systems Hijack",
        "text": "Also at 3rd level, when the target of your Critical Analysis is a droid or construct, or wearing or holding a techcasting focus, that creature is a viable target for any tech powers with you cast with a range of touch.\n\nAdditionally, when the target of your Critical Analysis casts a tech power, you can use your reaction to identify the tech power being cast, and at what level."
      },
      {
        "level": 6,
        "name": "Potent Programming",
        "text": "When a creature succeeds on a saving throw against an at-will tech power you cast that deals damage, the creature takes half the power's damage, but suffers no additional effects of the power."
      },
      {
        "level": 9,
        "name": "Redirect Error",
        "text": "When the target of your Critical Analysis feature casts a tech power that affects an area, you can use your reaction to cause that power to instead affect an area in a 10-foot-radius sphere centered on the caster. \n\nOnce you've used this feature, you must complete a long rest before you can use it again."
      },
      {
        "level": 17,
        "name": "System Override",
        "text": "You know how to quickly activate anti-tech subroutines you have encoded into your wristpad. You can cast the *diminish tech* and *tech override* powers at 3rd level without expending tech points. If the target is the target of your Critical Analysis, you have advantage on the techcasting ability check for these powers.\n\nYou can use this feature three times. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 3,
        "name": "Slicer Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect your understanding of tech casting. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order.\n\nIf you spend at least 10 minutes working on a computer or terminal, you can get a full list of users who have accessed the machine within the past 24 hours. Over the course of a long rest, you may then form a facsimile of identification that would allow you to pass yourself off as that person when accessing machines.\n\nWhen you cast a tech power that affects an area and requires a saving throw, and you are inside that power's area, you can use your reaction to move up to half your speed without provoking opportunity attacks. If you end this movement outside the area affected by the tech power, you do not have to make a saving throw to avoid its effects. \n\n_Prerequisite: 9th level_\nYou can cast the *override interface* tech power at 5th level without spending tech points. \n\nOnce you've used this feature, you must complete a long rest before you can use it again.\n\n_Prerequisite: 11th level_\nIf you reduce the target of your Critical Analysis feature to 0 hit points, and it has tech point remaining, you may choose to gain any tech points it had remaining. Your current tech points cannot exceed your tech point maximum.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again.\n\nWhen you hit a creature with an at-will tech power that requires an attack roll, you may treat that attack roll as a weapon attack for the purpose of using maneuvers.\n\nWhenever you cast a tech power with a casting time of 1 action, you can choose to delay the power's activation up to a minute. When you do so, you cast the power as normal, but holds its energy for the duration of the delay. Holding onto the power's effect requires concentration. If your concentration is broken before the delay ends, the power dissipates without taking effect. You can use your reaction to activate the power at any time.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses  when you finish a long rest."
      }
    ],
    "name": "Slicer Pursuit"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in heavy armor."
      },
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Sokan lightsaber form, detailed in Chapter 6 of the Player's Handbook. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Varactyl",
        "text": "As a bonus action, you can enter an unyielding stance for one minute. While in this stance, you have advantage on ability checks and saving throws to shove, trip, and avoid being moved, and you ignore difficult terrain. Additionally, once per turn, when you hit with a melee weapon attack, you can attempt to shove the target up to 10 feet away from you (no action required).\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you complete a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain the following Channel the Force option.\n\nWhen an opponent within 5 feet of you makes a melee attack against you, you can use your reaction and expend a use of your Channel the Force to move to another space within 5 feet of that creature without provoking opportunity attacks, imposing disadvantage on the roll. If the attack misses, you can attempt to shove the creature up to 10 feet away from you as a part of that same reaction."
      },
      {
        "level": 7,
        "name": "Unwavering Self",
        "text": "If you fail a Strength, Dexterity, or Constitution saving throw, you can reroll the die. You must use the new roll.\n\nOnce you've used this feature, you must complete a long rest before you can use it again. At 15th level you can use this feature twice between long rests."
      },
      {
        "level": 15,
        "name": "Unhindered Charge",
        "text": "Wen you move at least 10 feet before making a melee weapon attack, you deal additional damage equal to your Strength modifier."
      },
      {
        "level": 20,
        "name": "Master of Persistence",
        "text": "You are an unrelenting force on the field of battle. Your Strength and Wisdom or Charisma scores (your choice) increase by 2. Your maximum for these scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to kinetic, energy, and ion damage from weapons.\n- You ignore effects that would reduce your speed.\n- Once per turn, when you push a creature, you can move up to 10 feet as a part of this push without provoking opportunity attacks. If you end this movement within 5 feet of that creature, you can make one melee weapon attack (no action required).\n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you complete a long rest."
      }
    ],
    "name": "Sokan Form"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in tinker's implements."
      },
      {
        "level": 3,
        "name": "Personal Teleporter",
        "text": "You can use portable teleporters as a bonus action, instead of an action. \n\nAdditionally, while you are wielding a tech focus, you can use your bonus action to create a pair of linked portals: one portal appears in a space within 5 feet of you, and the other portal appears in an unoccupied space you can see up to 30 feet away. These portals last until the start of your next turn, and they are large enough to accommodate Medium and smaller creatures and objects. Portals take the appearance of an elongated, shimmering mirror, and looking through a portal, a creature can see through the linked portal as if looking through a window. A creature or object who passes through a portal immediately appears in a space within 5 feet of the linked portal. You can use your reaction to end your portals early. If a creature is partially within your portals, it is shunted back to the space it previously occupied and it must make a Dexterity saving throw against your a tech save DC. On a failed save, it takes energy damage equal to your scout level + your Intelligence modifier. You can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest. At the beginning of each of your turns while you have a pair of portals active, you can expend a use of this feature to extend the duration of the portals until the start of your next turn (no action required). The distance at which you can create portals increases at higher levels. It increases to 60 feet at 5th level, 90 feet at 9th level, 150 feet at 13th level, 300 feet at 17th level, and 1,000 feet at 20th level."
      },
      {
        "level": 3,
        "name": "Mark of the Teleporter",
        "text": "On your turn, when you deal damage to the target of your Ranger's Quarry, and either you, your weapon, or the source of your damage have passed through your portals on this turn, when you roll below half the maximum on a damage die, you can treat the roll as if you'd rolled half the maximum on the damage die. You can only affect a number of dice up to half your Intelligence modifier (minimum of one) in this way."
      },
      {
        "level": 7,
        "name": "Residual Warp",
        "text": "When you use your Personal Teleporter feature, you can place your portal in a place you've visited in the last 10 minutes, provided you can remember it, as opposed to a place you can see. That place must still be within range of your teleporter."
      },
      {
        "level": 11,
        "name": "Quantum Entanglement",
        "text": "When you use your Personal Teleporter feature, you can place the portal that you would normally place within 5 feet of you in a place you can see within your Personal Teleporter's range. If that space is occupied by a Huge or smaller creature or a Medium or smaller unsecured object, it must make a Dexterity saving throw against your tech save DC. An object automatically fails this saving throw, and a creature can choose to fail. On a failed save, a Medium or smaller creature or object falls through the portal, immediately appearing in a space within 5 feet of the linked portal and falling prone. A Large or Huge creature instead falls prone without moving."
      },
      {
        "level": 15,
        "name": "Reprisal",
        "text": "When you would be affected by a weapon or tech power that requires a Dexterity saving throw or attack roll and would affect only you, you can use your reaction to instantaneously create a pair of portals to redirect that power to another target within 30 feet. If the weapon or power required a melee or ranged attack roll, make a melee or ranged tech attack roll against the new target, as appropriate. If it required a Dexterity saving throw, the new target must make a Dexterity saving throw against your tech save DC.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      }
    ],
    "name": "Teleportation Technique"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Forredari Stance",
        "text": "Your honed focus allows you to enter a stance of mental fortification and power. You can use your bonus action to enter this stance. When you do so, you unleash a flurry of blows on creatures of your choice that you can see within 10 feet of you. Each creature in the area must make a Dexterity saving throw (DC = 8 + your bonus to attacks with the weapon) or take the weapon's normal damage.\n\nThis stance lasts for 1 minute. While you are in this stance, you gain the following benefits:\n- Death Weave. When you reduce a creature to 0 hit points, you gain temporary hit points equal to your focus ability modifier + half your monk level.\n- Gundark Slap. Once on each of your turns, when you hit a creature with an unarmed strike or a monk weapon, you can choose to make it unable to take reactions until the end of your next turn.\n- Sleeping Krayt. You can use your focus ability modifier instead of Strength whenever you would make a Strength check or a Strength saving throw. Additionally, you have advantage on saving throws against being charmed or frightened.\n\nThese effects end early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 1 focus point to use it. When you do so, your maximum focus points are reduced by 1 until you complete a long rest."
      },
      {
        "level": 6,
        "name": "Steel Hands Form",
        "text": "You can draw upon your focus to utilize an array of practiced techniques to strike your opponents with precision and power. You can use your bonus action to enter this stance, and when you do so, you can also enter your Forredari Stance as a part of this same bonus action. This form lasts for 1 minute. While you are in this stance, you gain the following benefits:\n\n- Charging Wampa. Once per round, when you are forced to make a saving throw against a force power, your movement speed increases by 10 feet until the end of your next turn.\n- Nexu Grin. When a creature you can see within 10 feet of you casts a force power that requires a force attack roll against you or an an allied creature, you can use your reaction and expend 1 focus point to impose disadvantage on the attack roll. If the attack misses, and the higher of the two d20 rolls would also miss, the creature cannot cast that force power again until it completes a short or long rest.\n- Screaming Squill. Once per turn, when you hit a creature that is concentrating on a force power and it makes a Constitution saving throw to maintain concentration, the DC for the check equals your focus save DC, unless the DC for the Constitution saving throw would be higher.\n\nThese effects end early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest.\n\nWhile you have no remaining uses of this feature, you can instead expend 1 focus point to use it. When you do so, your maximum focus points are reduced by 1 until you complete a long rest."
      },
      {
        "level": 11,
        "name": "Matter Over Mind",
        "text": "You tap into the greater power of your focus. While both your Forredari Stance and your Steel Hands Form are active, you gain the following benefits:\n- Dancing Dragonsnake. When you take force, lightning, or necrotic damage, you can use your reaction to deflect it. When you do so, the damage you take is reduced by 1d10 + your focus ability modifier + your monk level.\n- Aryx Slash. Once on each of your turns, when you hit a target with an unarmed strike or monk weapon, you can roll a Martial Arts die and deal additional psychic damage equal to the amount rolled.\n- Piercing Gaze. When you would make an Insight check against a creature you know to wield the Force, you can use your focus ability modifier for the roll, and you are considered to have expertise in the Insight skill. If you would already have expertise in the check, you instead have advantage on the roll."
      },
      {
        "level": 17,
        "name": "Spitting Rawl",
        "text": "You have learned to harness your strikes in a blistering fury. On your turn, when a creature takes damage from you three times, you can make up to three additional unarmed strikes against the creature (no action required). The first additional unarmed strike costs 1 focus point and deals 1d12 additional psychic damage on a hit, and each unarmed strike after the first costs 1 additional focus point and deals 1d12 additional psychic damage on a hit, cumulatively."
      }
    ],
    "name": "Teras Kasi Order"
  },
  {
    "className": "Fighter",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency with your choice of artist's implements or jeweler's implements."
      },
      {
        "level": 3,
        "name": "Totem Creation",
        "text": "You've learned to create powerful talismans infused with the Force. Your totems can take the form of sigils painted directly onto your equipment, or adornments attached to it, as you see fit. Regardless of the form they take, only you can benefit from them. You learn two totems of your choice, which are detailed under \"Totems\" below. When you complete a long rest, you can replace one totem you know with a different one.\n\nWhen you finish a long rest, you can touch a number of weapons, armor, or shields equal to the number of totems you know, affixing a different totem to each object. Your totem remains affixed until you finish a long rest, and an object can only bear one totem at a time. You must be wielding or wearing the object to benefit from a totem affixed to it.\n\nEach totem can be invoked to grant an effect. Once you've invoked a totem in this way, you can't do so again until you complete a short or long rest."
      },
      {
        "level": 3,
        "name": "Totem Options",
        "text": "The totems are listed in alphabetical order. If a totem requires a saving throw, the DC = 8 + your proficiency bonus + your Wisdom or Charisma modifier (your choice). \n\nThis totem evokes the ferocity of an acklay, granting you advantage on Intelligence (Nature) checks and Charisma (Intimidation) checks.\n\nAdditionally, you can invoke the totem as a bonus action. For 10 minutes, your carrying capacity and the weight you can push, drag, or lift doubles, and your Strength score increases by 2. This increase can cause your score to exceed 20. \n\nThis totem is inspired by the visage of a hawk, granting you advantage on Intelligence (Investigation) checks, and darkvision out to a range of 60 feet. If you already have darkvision, its range increases by 30 feet.\n\nAdditionally, when a creature you can see ends its turn within 30 feet of you, you can use your reaction to invoke the totem and force the creature to make a Constitution saving throw by emitting a powerful sound. Unless the save succeeds, the creature is dazed, suffering from the charmed condition, for 1 minute. While charmed in this way, the creature has a speed of 0 and is incapacitated. The effect ends if the charmed creature takes any damage or if someone else uses an action to shake the creature out of its haze. Once you invoke the totem, you can't do so again until you finish a short or long rest. A deaf creature automatically succeeds on its saving throw.\n\nThis totem emulates the near etherealness of a loth-wolf, granting you advantage on Dexterity (Sleight of Hand) checks and Charisma (Deception) checks.\n\nAdditionally, when you or a creature you can see within 30 feet of you is hit by an attack roll, you can use your reaction to invoke the totem and cause that attack to target a different creature within 30 feet of you (other than the attacker) that you can see, using the same roll. This ability can transfer the attack regardless of the attack's range. \n\nThis totem bestows a resilience reminiscent of a mighty rancor, granting you advantage on saving throws against being poisoned and resistance to poison damage.\n\nAdditionally, you can invoke the totem as a bonus action, gaining resistance to energy and kinetic damage for 1 minute. \n\nThis totem channels the experience of an ancient sarlacc, granting you expertise in any one tool in which you are proficient.\n\nAdditionally, when you hit a creature with a weapon attack, you can invoke the totem to summon the tentacles of the creature: The target must succeed on a Strength saving throw or be restrained for 1 minute. While restrained by the tentacles, the target takes 2d6 acid damage at the start of each of its turns. The target can repeat the saving throw at the end of each of its turns, tearing free on a success.\n\nWith this totem you are able to access the Force-enhanced senses of the vornskr, granting you advantage on Wisdom (Survival) checks, and you can't be surprised as long as you are not incapacitated.\n\nAdditionally, you can invoke the totem as a bonus action to enter a state of hyper awareness for 1 minute or until you're incapacitated. Until the state ends, when you or another creature you can see within 60 feet of you makes an attack roll, a saving throw, or an ability check, you can use your reaction to cause the roll to have advantage or disadvantage."
      },
      {
        "level": 3,
        "name": "Totemic Might",
        "text": "You can channel the power of your Force awareness temporarily. As a bonus action, you can gain the following benefits for 1 minute. You can invoke a totem as a part of this same bonus action.\n- Your carrying capacity and the weight you can push, drag, or lift doubles. If it would already double, it instead triples.\n- You have advantage on Strength checks and Strength saving throws.\n- Your weapon attacks deal an extra 1d6 damage.\n\nThis effect ends early if you are incapacitated or die. You can use this feature twice. You regain all expended uses of it when you finish a long rest."
      },
      {
        "level": 7,
        "name": "Guardian Spirit",
        "text": "You learn to invoke your totems to protect your allies. When another creature you can see within 60 feet of you is hit by an attack roll, you can use your reaction to grant a bonus to the creature's AC against that attack. The bonus equals 1 + your Wisdom or Charisma modifier (your choice, minimum of +2)."
      },
      {
        "level": 10,
        "name": "Primal Avatar",
        "text": "You learn a third totem. Additionally, the bonus damage of your Totemic Might feature increases to 1d8. Lastly, you have advantage on Lore checks you make about tribal cultures."
      },
      {
        "level": 15,
        "name": "Spirit Guide",
        "text": "You can invoke each of your totems twice, instead of once. You regain all expended uses when you finish a short or long rest."
      },
      {
        "level": 18,
        "name": "Blessing of the Tree of Light",
        "text": "You learn how to share your totem's power with your allies. When you use your Totemic Might feature, you can choose one willing creature you can see within 60 feet of you. The chosen creature also gains the benefits of your Totemic Might feature. If you are incapacitated or killed, this effect immediately ends for both of you."
      }
    ],
    "name": "Totem Specialist"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Trakata lightsaber form, detailed in Chapter 6 of the Player's Handbook. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Monkey-Lizard",
        "text": "As a bonus action, you can enter a confusing stance for one minute. As a part of this bonus action, and as a bonus action on each of your turns, when you take the Dodge action, you can make one melee weapon attack against a creature within range. Additionally, when you make this melee weapon attack, you can flourish your weapon to attempt to distract your target. Make a Dexterity (Sleight of Hand) check contested by a Wisdom (Perception) check of the target of your attack. On a success, you make this attack roll with advantage.\n\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain the following Channel the Force option.\n\nWhen you are hit with a melee weapon attack, and you are wielding a lightweapon with which you are proficient, you can use your reaction and expend a use of your Channel the Force to add your Wisdom or Charisma modifier (your choice, minimum of +1) to your AC for that attack, potentially causing the attack to miss you."
      },
      {
        "level": 7,
        "name": "Duplicitous Force",
        "text": "When you make a Dexterity (Sleight of Hand) check, you gain a bonus to that check equal to your Wisdom or Charisma modifier (your choice, minimum of one)."
      },
      {
        "level": 15,
        "name": "Pass the Blade",
        "text": "When a creature misses you with an attack, you gain temporary hit points equal to your Wisdom or Charisma modifier (your choice, minimum of one), and you add your Wisdom or Charisma modifier (your choice, minimum of one) to the first melee weapon attack and damage rolls you make against that creature before the end of your next turn."
      },
      {
        "level": 20,
        "name": "Master of Deception",
        "text": "Your skill with a lightweapon is both mesmerizing and confounding. Your Dexterity and Wisdom or Charisma scores (your choice) increase by 2. Your maximum for these scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to kinetic, energy, and ion damage from weapons.\n- Your attack rolls can't suffer from disadvantage.\n- Whenever a creature misses you with a melee attack, it takes 5 energy damage.\n- Whenever a creature hits you with a melee attack, it takes damage equal to half of the damage you take from the attack.\n\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Trakata Form"
  },
  {
    "className": "Scout",
    "features": [
      {
        "level": 3,
        "name": "Triage Training",
        "text": "You gain proficiency in the Medicine skill. \n\nAdditionally, when you would use your action to make an ability check to stabilize a creature, expend a use of a traumakit, or use a medpac, you can instead use your bonus action."
      },
      {
        "level": 3,
        "name": "Mark of Triage",
        "text": "You learn new ways to use your Ranger's Quarry. \n- While a hostile creature is the target of your Ranger's Quarry, you always know any conditions it is suffering from, and you know at roughly what percentage its current hit points is relative to its maximum. Additionally, if the target is within 60 feet of you, when it is forced to make a Constitution saving throw, you can use your reaction to force it to make the roll with disadvantage. Once you've used this feature, you must complete a short or long rest before you can use it again.\n- While a friendly creature is the target of your Ranger's Quarry, you have advantage on Wisdom (Medicine) checks made to stabilize it. Additionally, if the target is within 60 feet of you, you can use your bonus action and roll your Ranger's Quarry and either restore hit points equal to the amount rolled, or grant temporary hit points equal to the amount rolled. Once a friendly creature has benefited from this ability, they can not do so again until they complete a short or long rest."
      },
      {
        "level": 7,
        "name": "Double Dose",
        "text": "Your application of medicine does not interfere with your own ability to recover from injuries. When you restore hit points or grant temporary hit points to another creature with a tech power or class feature, you recover the same amount of hit points or gain the same number of temporary hit points. \n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 11,
        "name": "Experimental Infusion",
        "text": "When you target a creature with your Ranger's Quarry, you can grant one of the following additional effects of your choice:\n- *Adrenaline/Tranquilizer.* The creature's movement speed is doubled until the end of its next turn. Alternatively, it gains a level of slowed until the end of its next turn.\n\n- *Focus/Dizziness.* The creature has either advantage or disadvantage (your choice) on the first ability check, attack roll, or saving throw it makes within the next minute.\n- *Toughen/Weaken.* The creature gains temporary hit points equal to your scout level, which last for 1 minute. Alternatively, the creature must make a Constitution saving throw against your tech save DC. On a failure, it takes psychic damage equal to your scout level and it can't regain hit points until the start of your next turn.\n\nYou can use each feature once. You regain any expended uses when you complete a short or long rest."
      },
      {
        "level": 15,
        "name": "Cure-All",
        "text": "Your healing becomes even more potent. When you restore hit points or grant temporary hit points to a creature as a bonus action using your Mark of Triage feature, you can also end one of the following conditions afflicting it: blinded, deafened, diseased, paralyzed, or poisoned."
      }
    ],
    "name": "Triage Technique"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Bumbling Technique",
        "text": "Your martial arts technique mixes combat training with the precision of a dancer and the antics of a jester. You gain proficiency in Performance.\n\nAdditionally, you learn how to twist and turn quickly. Whenever you use your bonus action to make an unarmed strike, creatures you hit can't make opportunity attacks against you, and your speed increases by 10 feet until the end of your turn."
      },
      {
        "level": 6,
        "name": "Clumsy Sway",
        "text": "You can move in sudden, swaying ways. You gain the following benefits.\n\n*Leap to Your Feet.* When you're prone, you can stand up by spending 5 feet of movement, rather than half your speed.\n\n*Redirect Attack.* When a creature misses you with a melee attack roll, you can spend 1 focus point as a reaction to cause that attack to hit one creature of your choice, other than the attacker, that you can see within 5 feet of you."
      },
      {
        "level": 11,
        "name": "Luck of the Fool",
        "text": "You always seem to get a lucky bounce at the right moment. When you make an ability check, an attack roll, or a saving throw and have disadvantage, you can spend 2 focus points to instead have advantage for that roll."
      },
      {
        "level": 17,
        "name": "Comic Frenzy",
        "text": "You gain the ability to make an overwhelming number of attacks against a group of enemies. When you use your Flurry of Blows, you can make up to three additional attacks with it (up to a total of five Flurry of Blows attacks), provided that each Flurry of Blows attack targets a different creature this turn."
      }
    ],
    "name": "Trickster Order"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain your choice of the Vonil or Ishu lightsaber form, detailed in the Lightsaber Forms section of the Customization Options document for Expanded Content. If you already know the chosen form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Hydra",
        "text": "As a bonus action, you can enter a synchronized stance with one ally of your choice within 10 feet of you for 1 minute. While in this stance, once per turn, when you hit a creature with an attack, the chosen ally has advantage on the next attack it makes against the same target before the end of your next turn. Additionally, once per turn, when the chosen ally hits a creature with an attack, you have advantage on the next attack you make against the same target before the end of your next turn.\n\nThis effect ends early if either you or the chosen ally are incapacitated or die, or if the chosen ally is ever more than 10 feet away from you. Once you've used this feature, you can't use it again until you complete a long rest.\n\nAt 11th level, the chosen ally must be within 30 feet of you to benefit from this feature. At 17th level, the chosen ally must be within 60 feet."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain one of the following Channel the Force options. Choose Smite for Vonil or Shield for Ishu.\n\nOnce per turn, when an ally is within 10 feet of you and it hits a creature with a melee weapon attack, you can expend a use of your Channel the Force and expend force points to have the chosen ally deal additional damage to the target, which is the same type as the weapon's damage. The additional damage is 1d8 for each point spent in this way. You can't deal more additional damage than the amount shown in the Focused Strikes column of the guardian table.\n\nAt 11th level, the chosen ally must be within 30 feet of you to benefit from this feature. At 17th level, the chosen ally must be within 60 feet.\n\nWhen an ally is hit by a weapon attack while within 10 feet of you, you can use your reaction and expend a use of your Channel the Force to attempt to divert the attack. When you do so, the damage the chosen ally takes from the attack is reduced by 1d10 + your Wisdom or Charisma modifier (your choice) + your guardian level.\n\nAt 11th level, the chosen ally must be within 30 feet of you to benefit from this feature. At 17th level, the chosen ally must be within 60 feet."
      },
      {
        "level": 7,
        "name": "Amplified Auras",
        "text": "Once on each of your turns, you can choose an ally within 10 feet of you. While the chosen ally is within 10 feet of you, your auras emit from that ally as if you were standing in that ally's space. A creature in the area of more than one instance of your auras is affected only once.\n\nAt 11th level, the chosen ally must be within 30 feet of you to benefit from this feature. At 17th level, the chosen ally must be within 60 feet."
      },
      {
        "level": 15,
        "name": "Teamwork",
        "text": "You gain one of the following features. Choose Takedown for Vonil or Rebuttal for Ishu.\n\nWhen an ally within 30 feet of you takes the Help action and helps you, you have advantage on the next two ability checks or attack rolls you make before the start of their next turn, instead of only one. When you take the Help action and help an ally within 30 feet of you, the chosen ally has advantage on the next two ability checks or attack rolls it makes before the start of your next turn, instead of only one.\n\nWhen an ally within 30 feet of you takes the Help action and helps you, you gain temporary hit points equal to your guardian level that last until the start of their next turn. When you take the Help action and help an ally within 30 feet of you, it gains temporary hit points equal to your guardian level that last until the start of your next turn."
      },
      {
        "level": 20,
        "name": "Master of Unity",
        "text": "You and your allies are a paragon of harmony. Your Strength or Dexterity (your choice) and Constitution scores increase by 2. Your maximum for those scores increases by 2. Additionally, you can use your action and choose an ally within 60 feet of you to gain the following benefits for 1 minute:\n- You and the chosen ally have resistance to kinetic and energy damage.\n- Neither you nor the chosen ally can have disadvantage on attack rolls.\n- Both you and the chosen ally's critical hit ranges increase by 1.\n\nThis effect ends early if either you or the chosen ally are incapacitated or die, or if the chosen ally is ever more than 60 feet away from you. Once you've used this feature, you can't use it again until you complete a long rest."
      }
    ],
    "name": "Vonil/Ishu Form"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in your choice of Intimidation or Persuasion."
      },
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain your choice of the Vonil or Ishu lightsaber form, detailed in the Lightsaber Forms section of the Customization Options document for Expanded Content. If you already know the chosen form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "Humanoid Companion",
        "text": "You've adopted a partner, gaining the services of your own humanoid companion.\n\nCreate your humanoid companion as detailed in the Companions section of the Customization Options document for Expanded Content. \n\nIn addition to its traits and features, your companion gains additional benefits while it is bonded to you:\n- Your companion gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each trait in excess of your proficiency bonus, your force point maximum is reduced by 2.\n\nLastly, while bonded and within 10 feet of you, when you or your companion are dealt damage by an external effect, you can choose to have you or your companion gain resistance to that damage. If you do so, the other of the two takes the same damage as true damage.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet."
      },
      {
        "level": 3,
        "name": "The Way of the Hydra",
        "text": "As a bonus action, you can enter a synchronized stance with your companion for 1 minute, as long as your companion is within 10 feet of you. While in this stance, once per turn, when you hit a creature with an attack, your companion has advantage on the next attack it makes against the same target before the end of your next turn. Additionally, once per turn, when your companion hits a creature with an attack, you have advantage on the next attack you make against the same target before the end of your next turn.\n\nThis effect ends early if either you or your companion are incapacitated or die, or if your companion is ever more than 10 feet away from you. Once you've used this feature, you can't use it again until you complete a long rest.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet."
      },
      {
        "level": 7,
        "name": "Channel the Force",
        "text": "You gain one of the following Channel the Force options. Choose Smite for Vonil or Shield for Ishu.\n\nOnce per turn, when your companion is within 10 feet of you and it hits a creature with a melee weapon attack, you can expend a use of your Channel the Force and expend force points to have your companion deal additional damage to the target, which is the same type as the weapon's damage. The additional damage is 1d8 for each point spent in this way. You can't deal more additional damage than the amount shown in the Focused Strikes column of the guardian table.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet.\n\nWhen your companion is hit by a weapon attack while within 10 feet of you, you can use your reaction and expend a use of your Channel the Force to attempt to divert the attack. When you do so, the damage your companion takes from the attack is reduced by 1d10 + your Wisdom or Charisma modifier (your choice) + your guardian level.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet."
      },
      {
        "level": 15,
        "name": "Teamwork",
        "text": "You gain one of the following features. Choose Takedown for Vonil or Rebuttal for Ishu.\n\nWhen your companion takes the Help action and helps you, you have advantage on the next two ability checks or attack rolls you make before the start of your next turn, instead of only one. When you take the Help action and help your companion, your companion has advantage on the next two ability checks or attack rolls it makes before the start of its next turn, instead of only one.\n\nWhen your companion takes the Help action and helps you, you gain temporary hit points equal to your guardian level that last until the start of your next turn. When you take the Help action and help your companion, it gains temporary hit points equal to your guardian level that last until the start of its next turn."
      },
      {
        "level": 20,
        "name": "Master of Unity",
        "text": "You and your companion are a paragon of harmony. Your Strength or Dexterity (your choice) and Constitution scores increase by 2. Your maximum for those scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute, as long as your companion is within 60 feet of you:\n- You and your companion have resistance to kinetic and energy damage.\n- Neither you nor your companion can have disadvantage on attack rolls.\n- Both you and your companion's critical hit ranges increase by 1.\n\nThis effect ends early if either you or your companion are incapacitated or die, or if your companion is ever more than 60 feet away from you. Once you've used this feature, you can't use it again until you complete a long rest."
      }
    ],
    "name": "Vonil/Ishu Form (Companion)"
  },
  {
    "className": "Berserker",
    "features": [
      {
        "level": 3,
        "name": "Savage Diplomat",
        "text": "Your path necessitates that you build relationships with others, for the betterment of your tribe or yourself. You gain proficiency in one of the following skills of your choice: Persuasion or Intimidation. You can choose to learn one language in place of the skill proficiency."
      },
      {
        "level": 3,
        "name": "Commanding Rage",
        "text": "You become more aware of your allies, and their intent when fighting at your side. While you are raging, when an ally within 10 feet of you makes an attack roll against an enemy, you can use your reaction to grant advantage to that attack and add your rage damage bonus to the damage roll, if the attack hits.\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a short or long rest."
      },
      {
        "level": 6,
        "name": "Inspiring Presence",
        "text": "Your mere presence on the battlefield rallies your allies. When you rage, choose up to 3 allies that you can see within 30 feet of you. Each creature gains temporary hit points equal to half your berserker level + your Charisma modifier (minimum of +1)."
      },
      {
        "level": 10,
        "name": "Raid Planning",
        "text": "You learn to flare up your allies' drive for combat, urging them to follow you into the fray. During a long rest, you tell sagas, sing battle songs, and give inspiring speeches. At the end of the long rest choose up to 5 creatures that can hear and understand you (which can include yourself) to add your Charisma modifier (minimum of +1) to their next Initiative check, and a 10 foot bonus to their speed on their first turn of combat."
      },
      {
        "level": 14,
        "name": "War Chant",
        "text": "You have memorized the litanies, songs, and chants of your people and their dedication to war. When you enter a rage on your turn, you can enter a commanding rage for one minute. When you do so, during this turn and at the start of each of your turns, you have a number of special reactions equal to your proficiency bonus you can only use for your Commanding Rage feature. When you use Commanding Rage with these special reactions, they do not count against your uses of that feature. You can only use one reaction per turn. Additionally, during this rage, when an enemy within 10 feet of you makes an attack roll against an ally, you can use your reaction to reduce the attack by an amount equal to your Charisma modifier.\n\nOnce you've used this feature, you must complete a long rest before you can use it again."
      }
    ],
    "name": "Warchief Approach"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Manipulate Life Force",
        "text": "When you reduce a hostile creature to 0 hit points with a force power, or restore hit points to a creature with 0 hit points with a force power, you gain temporary hit points equal to half your consular level + your Wisdom or Charisma modifier (your choice, minimum of one)."
      },
      {
        "level": 6,
        "name": "Empowered Connection",
        "text": "While you have temporary hit points, you can add half your Wisdom or Charisma modifier (your choice, minimum of one) to any damage or healing you do with force powers that doesn't already include that modifier."
      },
      {
        "level": 10,
        "name": "Life Eternal",
        "text": "You can use your powerful connection to the Force to keep fighting when others would fall. When you are reduced to 0 hit points but not killed outright, you can spend 5 force points to drop to 1 hit point instead."
      },
      {
        "level": 14,
        "name": "Interconnectedness",
        "text": "When you cast a 5th level or lower force power that deals damage or restores hit points and targets only one creature, the power can instead target two creatures within range and within 5 feet of each other. \n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 18,
        "name": "Dynamic Attachment",
        "text": "While you have temporary hit points, you have resistance against the damage of force powers, and your force powers ignore resistances."
      }
    ],
    "name": "Way of Confluence"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Upheld by the Force",
        "text": "The Force flowing through your body strengthens you, granting the following benefits:\n- Your hit point maximum increases by 3, and it increases by 1 again whenever you gain a level in this class.\n- Your base AC becomes 13 + your Constitution modifier. \n- When you make a melee weapon attack as a part of a force power you cast, you can use Wisdom or Charisma (your choice) instead of Strength for the attack and damage rolls.\n\nAdditionally, as an action, you can gain resistance to kinetic and energy damage for 1 minute. This effect lasts until you end it as a bonus action, you are incapacitated, or you don armor other than a shield. You can use this feature twice. You regain all expended uses of it when you finish a short or long rest."
      },
      {
        "level": 6,
        "name": "Retaliation Strike",
        "text": "You learn to turn an opponent's aggression back on them. When you deal damage with a force power or a melee weapon attack, if you took damage since the start of your last turn, you deal an extra 1d6 damage. The damage is the same type as the power or weapon's damage.\n\nThis die increases when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level."
      },
      {
        "level": 10,
        "name": "Boundless Vitality",
        "text": "When you take damage, you can use your reaction and expend a force point to regain health equal to 1d8 + your Wisdom or Charisma modifier (your choice, minimum of one) as long as the damage would not reduce your hit points to 0. \n\nThis die increases when you reach certain levels in this class: to 1d10 at 13th level, and to 1d12 at 17th level."
      },
      {
        "level": 14,
        "name": "Unrelenting Resilience",
        "text": "When you use your Boundless Vitality feature while concentrating on a force power, you can add the result of the roll to the Constitution saving throw made to maintain concentration.\n\nAdditionally, when you are reduced to 0 hit points but not killed outright while Upheld by the Force is active, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest."
      },
      {
        "level": 18,
        "name": "The Force Unleashed",
        "text": "As an action, you can choose a point within 60 feet. Each creature of your choice within 30 feet of that point must make a Constitution saving throw against your universal force save DC. On a failed save, a creature takes 5d10 force damage and suffers 1 level of exhaustion. On a successful save, a creature takes half damage and does not suffer exhaustion.\n\nFor each creature that fails this saving throw, a friendly creature within 30 feet of them can regain hit points equal to the amount of damage dealt. A friendly creature can only gain this benefit once per turn.\n\nYou can use this feature six times. You regain all expended uses when you finish a long rest."
      }
    ],
    "name": "Way of Endurance"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Saber Storm",
        "text": "You learn to deftly control your weapons utilizing the Force. As an action, you can initiate your Saber Storm. When you do so, select a light- or vibro-weapon within 5 feet that is not worn or carried by a conscious creature other than you, and use the Force to cause it to levitate, acting as an extension of your will for 1 minute. When you activate this feature, you can cause the weapon to move up to 10 feet and make a melee force attack against a creature within 5 feet of it. On a hit, the target takes 1d8 + your forcecasting ability modifier damage. The type is of the normal damage dealt by the weapon. The weapon then returns to your side.\n\nYour weapon moves with you, and while Saber Storm is active and you have a weapon animated, on each of your turns you can use an action to move a weapon up to 10 feet and repeat the attack against a creature within 5 feet of it. The weapon then returns to your side. Your Saber Storm ends early if you are incapacitated. At any time, you can end this feature and return the animated weapon to your hand.\n\nAdditionally, while your Saber Storm is active, and at least one animated weapon is within 5 feet of you, you gain the following benefits:\n- You gain a bonus to your AC equal to your Wisdom or Charisma modifier (your choice, minimum of +1) if it doesn't already include that modifier.\n- You gain a bonus to any Constitution saving throw you make to maintain your concentration on a power. The bonus equals your Wisdom or Charisma modifier (your choice, minimum of +1).\n\nThis feature can animate more than one weapon when you reach higher levels: two weapons at 5th level, three weapons at 11th level, and four weapons at 17th level. When you use your action to attack with your weapons, you can direct them at the same target or at different ones. Make a separate attack roll for each weapon.\n\nAt 5th level, the distance your weapon can travel increases to 20 feet. This distance increases to 30 feet at 11th level, and 40 feet at 17th level.\n\nYou can use this feature twice. You regain all expended uses of it when you finish a short or long rest."
      },
      {
        "level": 6,
        "name": "Deceptive Strike",
        "text": "When you cast a force power with a range of touch while Saber Storm is active, your animated weapon can move up to its range and deliver the power as if it had cast it."
      },
      {
        "level": 10,
        "name": "Guarding Weapon",
        "text": "You can direct your animated weapons to absorb damage while your Saber Storm is activate. When you take damage, you can use your reaction to expend a number of force points up to your proficiency bonus to have your animated weapon intercept it, and reduce that damage to you by an amount equal to five times the number of points spent."
      },
      {
        "level": 14,
        "name": "Isolate",
        "text": "When you deal damage to a creature while Saber Storm is active, and that creature fails a Constitution saving throw to maintain concentration on a force power, you can steal and redirect the power. Until the end of your next turn, either you or the creature who failed the Constitution saving throw gain the effects of the power (your choice)."
      },
      {
        "level": 18,
        "name": "Sapping Storm",
        "text": "When you reduce a hostile creature to 0 hit points while Saber Storm is active, you gain temporary force points equal to your Wisdom or Charisma modifier (your choice, minimum of one). These temporary force points can not exceed your Wisdom or Charisma modifier (your choice), and when you would spend a force point while you have temporary force points, the temporary force points are spent first. When Saber Storm ends, you lose any remaining temporary force points."
      }
    ],
    "name": "Way of Manipulation"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Force Deflection",
        "text": "When you fail a saving throw, you can use your reaction to gain a bonus to that saving throw equal to your Wisdom or Charisma modifier (your choice, minimum of +1).\n\nYou can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 6,
        "name": "Power Surge",
        "text": "You learn to simultaneously limit a creature's force powers and store that power within yourself to later strengthen your damaging force powers.\n\nYou can store a maximum number of power surges equal to your Wisdom or Charisma modifier (your choice, minimum of one). Whenever you successfully end a force power with a power such as *force suppression* or *sever force*, or use your Force Shield or Force Deflection features to successfully avoid an attack or succeed on a saving throw, you gain one power surge, as you redirect the flow of the Force into yourself. \n\nOnce per turn, when you deal damage to a creature or object with a force power, you can spend one power surge to deal extra damage to that target. The extra damage is of the same type as the power's damage, and it equals half your consular level.\n\nWhenever you finish a long rest, your number of power surges resets to one. If you end a short rest with no power surges, you gain one power surge."
      },
      {
        "level": 10,
        "name": "Enduring Focus",
        "text": "You can casually deflect attacks while channeling your power. While you are concentrating on a Force power, you have a +2 bonus to your AC and all saving throws.\n\nAdditionally, you can extend your Force Deflection to a creature within 5 feet of you when they fail a saving throw."
      },
      {
        "level": 14,
        "name": "Conflux",
        "text": "When you use your Force Deflection feature, you can cause a ripple in the Force to expand from you. Up to three creatures of your choice that you can see within 60 feet of you each take force damage equal to half your consular level."
      },
      {
        "level": 18,
        "name": "Tutaminis Mastery",
        "text": "When you use a Force-Empowered Casting option, you can spend a power surge to use it without spending additional force points."
      }
    ],
    "name": "Way of Negation"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Fundamentals of Mechu-deru",
        "text": "You've dabbled in adapting your use of the Force, melding it with technology. You gain proficiency in the Technology skill, as well as simple blasters. When you cast a force power that calls for a melee weapon attack, and you are wielding a blaster with which you are proficient, you can instead make a ranged weapon attack.\n\nAdditionally, you've learned to manipulate the Force to be able to manipulate technology when it couldn't previously. When you cast a force power that could not affect droids or constructs, you can choose to have it affect droids or constructs. If it would affect multiple targets, you must expend additional uses of this feature for each additional target. You can use this feature twice. You gain an additional use at 5th, 9th, 13th, and 17th level. You regain all expended uses when you complete a long rest."
      },
      {
        "level": 6,
        "name": "Techcasting Secrets",
        "text": "You've learned to mimic technological effects. Choose two tech powers of 1st level. The chosen powers count as universal force powers for you, but are not included in the number in the Powers Known column of the consular table.\n\nAt 7th level, you learn two additional tech powers of 1st or 2nd level. At 13th level, you learn two tech powers of 1st-3rd level, and at 17th level, you learn two tech powers of 1st-4th level. Whenever you gain a level in this class, you can choose one of the tech powers you know and replace it with another tech power of the same level."
      },
      {
        "level": 10,
        "name": "Ionized Weave",
        "text": "When you cast a damage-dealing force power that requires a force attack or saving throw, you can spend force points to cause that power to instead deal ion damage. The number of force points equals half the power's level (round down, minimum of one). If the power would call for a saving throw other than Dexterity, it instead calls for a Dexterity saving throw."
      },
      {
        "level": 14,
        "name": "Force Circuitry",
        "text": "When you use your action to cast a force power, and you use your Fundamentals of Mechu-deru feature as a part of that casting, you can use your bonus action to cast one of the tech powers you know, as long as that power has a casting time of 1 action or bonus action."
      },
      {
        "level": 18,
        "name": "Mechu-deru Mastery",
        "text": "You can cast one 5th-level tech power of your choice at its base level. The power counts as a universal force power for you, and you do not require force points to cast this power. Once you've done so, you can't do so again until you complete a long rest."
      }
    ],
    "name": "Way of Technology"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Staggering Stratagem",
        "text": "Your potency with the telekinetic power of the Force heightens. You can manipulate creatures of Large size or smaller with your force powers and Way of Telekinetics features. Additionally, once per turn, when you deal force or kinetic damage to a Large or smaller creature with a force power or class feature, you can choose to either push it up to 10 feet away from you or pull it up to 10 feet closer to you."
      },
      {
        "level": 6,
        "name": "Mighty Blast",
        "text": "Your force powers batter and blast your enemies with the strength of a hurricane. When you cast a force power of 1st level or higher that deals force or kinetic damage, one creature of your choice damaged by that power must make a Strength saving throw against your universal force save DC or be knocked prone. \n\nThis feature can affect additional creatures when you reach higher levels: two creatures at 11th level and three creatures at 17th level."
      },
      {
        "level": 10,
        "name": "Size Matters Not",
        "text": "You can manipulate creatures of Huge size or smaller with your force powers and Way of Telekinetics features.\n\nAdditionally, when you use your action to cast a force power, you can use a bonus action to fly up to 10 feet without provoking opportunity attacks."
      },
      {
        "level": 14,
        "name": "Repulsing Wave",
        "text": "When you are dealt damage by a creature within 5 feet of you, you can use your reaction to deal force damage to the creature equal to your consular level + your Wisdom or Charisma modifier (your choice, minimum of +1). If the attacker is Huge or smaller, it must also make a Strength saving throw against your universal force save DC. On a failed save, the attacker is pushed in a straight line up to 20 feet away from you.\n\nYou can use this feature five times. You gain an additional use at 17th level. You regain all expended uses when you finish a short or long rest."
      },
      {
        "level": 18,
        "name": "My Ally is the Force",
        "text": "You can manipulate creatures of Gargantuan size or smaller with your force powers and Way of Telekinetics features.\n\nAdditionally, whenever a force power you cast pushes or pulls a creature, you can increase the distance of that push or pull by an additional 20 feet."
      }
    ],
    "name": "Way of Telekinetics"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in your choice of Intimidation or Persuasion."
      },
      {
        "level": 3,
        "name": "Humanoid Companion",
        "text": "You've taken an apprentice, gaining the services of your own humanoid companion.\n\nCreate your humanoid companion as detailed in the Companions section of the Customization Options document for Expanded Content. \n\nIn addition to its traits and features, your companion gains additional benefits while it is bonded to you:\n- Your companion gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each trait in excess of your proficiency bonus, your force point maximum is reduced by 2.\n\nLastly, while bonded and within 10 feet of you, when your companion is hit by an attack, you can use your reaction and expend a use of your Force Shield feature to shroud it in Force energy. If you do so, until the start of your next turn, both you and your companion gain the benefits of your Force Shield. This includes the triggering attack.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet."
      },
      {
        "level": 6,
        "name": "Strength Flows from the Force",
        "text": "When you cast a power that affects only your companion, you can choose to treat the power as if cast at your Max Power Level.\n\nYou can use this feature a number of times equal to your proficiency bonus, as shown in the consular table. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 10,
        "name": "You Have That Power Too",
        "text": "The bond between you and your companion has strengthened. When your companion is within 10 feet of you, and either you or your companion casts a force power that would affect only one of you, you can instead have it affect both.\n\nAt 11th level, your companion must be within 30 feet of you to benefit from this feature. At 17th level, your companion must be within 60 feet."
      },
      {
        "level": 14,
        "name": "Got Your Back",
        "text": "Once per turn, when your companion is within 10 feet of you, and both you and your companion have to make a saving throw to resist the same effect, either you or your companion can choose to have disadvantage on the save. If either of you do so, the other of the two of you gains advantage on the save. You can use this feature before or after you both make the saving throw, but you must do so before the GM says whether the save succeeds or fails.\n\nAt 17th level, your companion must be within 60 feet of you to benefit from this feature."
      },
      {
        "level": 18,
        "name": "Now I Am The Master",
        "text": "Your companion has learned almost all that it can from you. As an action on its turn, your companion can take the lead, gaining the following benefits for 1 minute:\n- It gains temporary hit points equal to twice its level.\n- Once per turn, when it deals damage or restores hit points, it can roll an additional die.\n- It gains resistance to kinetic and energy damage.\n\nThis effect ends early if your companion is incapacitated or dies. Once your companion has used this feature, it can't use it again until it finishes a long rest."
      }
    ],
    "name": "Way of Tutelage"
  },
  {
    "className": "Consular",
    "features": [
      {
        "level": 3,
        "name": "Force Visions",
        "text": "Glimpses of the future begin to press in on your awareness. When you finish a long rest, roll two d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn. Each foretelling roll can be used only once. When you finish a long rest, you lose any unused foretelling rolls."
      },
      {
        "level": 6,
        "name": "Powerful Mind",
        "text": "You can use your force abilities to read a creature's thoughts. You can then use your access to the creature's mind to command it.\n\nAs an action, choose one creature that you can see within 60 feet of you. That creature must make a Wisdom saving throw against your universal force save DC. If the creature succeeds on the saving throw, you can't use this feature on it again until you finish a long rest. If the creature fails its save, you can read its surface thoughts (those foremost in its mind, reflecting its current emotions and what it is actively thinking about) when it is within 60 feet of you. This effect lasts for 1 minute. During that time, you can use your action to end this effect and cast the *coerce mind* force power at its base level on the creature without expending force points. The target automatically fails its saving throw against the power. \n\nYou can use this feature three times. You gain an additional use at 9th, 13th, and 17th level. You regain all expended uses when you finish a long rest."
      },
      {
        "level": 10,
        "name": "Visions of the Past",
        "text": "You can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation, then receive dreamlike, shadowy glimpses of recent events. You can meditate in this way for a number of minutes equal to your Wisdom score and must maintain concentration during that time, as if you were casting a force power. Once you've used this feature, you can't use it again until you finish a short or long rest.\n\n*Object Reading.* Holding an object as you meditate, you can see visions of the object's previous owner. After meditating for 1 minute, you learn how the owner acquired and lost the object, as well as the most recent significant event involving the object and that owner. If the object was owned by another creature in the recent past (within a number of days equal to your Wisdom score), you can spend 1 additional minute for each owner to learn the same information about that creature.\n\n*Area Reading.* As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score. For each minute you meditate, you learn about one significant event, beginning with the most recent. Significant events typically involve powerful emotions, such as battles and betrayals, marriages and murders, births and funerals. However, they might also include more mundane events that are nevertheless important in your current situation."
      },
      {
        "level": 14,
        "name": "Shielded Thoughts",
        "text": "Your thoughts can't be read by telepathy or other means unless you allow it. You also have resistance to psychic damage, and whenever a creature deals psychic damage to you, that creature takes the same amount of damage that you do."
      },
      {
        "level": 18,
        "name": "Clarity of Vision",
        "text": "The visions in your dreams intensify and paint a more accurate picture in your mind of what is to come. You roll three d20s for your Force Visions feature, rather than two."
      }
    ],
    "name": "Way of the Seer"
  },
  {
    "className": "Monk",
    "features": [
      {
        "level": 3,
        "name": "Flurry of Light",
        "text": "You gain proficiency in blaster pistols, blaster rifles, ion pistols, ion rifles, and the lightbow, which are your Whills weapons and are monk weapons for you. When you are wielding a Whills weapon, you gain the following benefits:\n- Your Whills weapons count as melee weapons for you, and when you make a melee weapon attack with them, you deal kinetic damage equal to your Martial Arts Damage Die.\n- When you would make an unarmed strike using your Martial Arts bonus action or as a part of your Flurry of Blows, you can instead attack with a Whills weapon you are wielding. You roll a d4 in place of the normal damage of your Whills weapon when attacking in this way. This die changes as you gain monk levels, as shown in the Martial Arts column of the monk table.\n- When you would make a ranged weapon attack with a Whills weapon, you can instead reload the weapon."
      },
      {
        "level": 6,
        "name": "The Force is With You",
        "text": "As you channel the Force through you, you gain the following benefits:\n- You can use your Stunning Strike feature when you hit with a ranged weapon attack while you are wielding a Whills weapon. \n- You can spend up to 3 focus points to reduce partial cover by one step (from three-quarters to half or half to one-quarter). If you reduce the target below one-quarter cover, you ignore cover bonuses entirely. At 17th level, you can spend 3 focus points to ignore total cover, as long as your target is not hidden from you. \n- When you hit a creature with a Whills weapon, that creature has disadvantage on opportunity attacks against you until the start of your next turn."
      },
      {
        "level": 11,
        "name": "One With the Force",
        "text": "You learn how to enter a trance, preparing to unleash yourself upon your enemy. While in this trance, you can still talk and move. If you stay in the trance for at least one minute, when you roll initiative, you can make a ranged weapon attack on a number of creatures up to your focus ability modifier (a minimum of one) within 30 feet of you when you were in this trance.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 17,
        "name": "Guided Strikes",
        "text": "Your first ranged weapon attack and your first melee weapon attack each turn deal additional damage equal to your focus ability modifier (a minimum of +1)."
      }
    ],
    "name": "Whills Order"
  },
  {
    "className": "Guardian",
    "features": [
      {
        "level": 3,
        "name": "Bonus Proficiencies",
        "text": "You gain proficiency in simple blasters and martial blasters that lack the two-handed property."
      },
      {
        "level": 3,
        "name": "Form Basics",
        "text": "You gain the Ysannanite lightsaber form, detailed in the Lightsaber Forms section of the Customization Options document for Expanded Content. If you already know this form, you can instead choose another lightsaber form."
      },
      {
        "level": 3,
        "name": "The Way of the Yerdua",
        "text": "As a bonus action, you can take a meditative stance for 1 minute, granting you supreme accuracy as you guide your shots to their target through the Force. While in this stance, you add your Wisdom or Charisma modifier (your choice, minimum of +1) to one ranged weapon attack and damage roll you make each turn. Additionally, when making a ranged weapon attack while you are within 5 feet of a hostile creature, you do not have disadvantage on the attack roll. \n\nThis effect ends early if you are incapacitated or die. Once you've used this feature, you can't use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Channel the Force",
        "text": "You gain the following Channel the Force option.\n\nOnce per turn, when you hit a creature with a ranged weapon attack, you can expend a use of your Channel the Force and expend force points to deal additional damage to the target, which is the same type as the weapon's damage. The additional damage is 1d8 for each point spent in this way. You can't deal more additional damage than the amount shown in the Focused Strikes column of the guardian table."
      },
      {
        "level": 7,
        "name": "Improved Force-Empowered Shots",
        "text": "Your familiarity with blaster weapons has granted you greater insight into their function and usage. Once on each of your turns, drawing or stowing a blaster no longer requires your object interaction. Additionally, you no longer require a free hand to reload.\n\nAt 11th level, once per turn, when you hit a creature with a ranged weapon attack, the creature takes an extra 1d8 damage. If you also use your Force-Empowered Shots with an attack, you add this damage to the extra damage of your Force-Empowered Shots. The damage is the same type as the weapon's damage."
      },
      {
        "level": 15,
        "name": "Phasestorm",
        "text": "You can use your action to dart across the battlefield, striking up to six such creatures that you can see within 30 feet. You immediately move to each creature in succession without provoking opportunity attacks, after which you return to the space in which you started. Each creature must make a Dexterity saving throw (DC = 8 + your bonus to attacks with your weapon). A creature takes normal weapon damage on a failed save, or half as much on a successful one. If you are wielding separate weapons in each hand with which you are proficient, a creature makes this save with disadvantage, and takes additional damage equal to your Wisdom or Charisma modifier (your choice, minimum of one) on a failed save if the damage doesn't already include that modifier.\n\nOnce you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "level": 20,
        "name": "Master of the Unorthodox",
        "text": "You've mastered the unity between blaster and blade. Your Dexterity and Wisdom or Charisma scores (your choice) increase by 2. Your maximum for these scores increases by 2. Additionally, you can use your action to gain the following benefits for 1 minute:\n- You have resistance to kinetic, energy, and ion damage from weapons.\n- When you hit a creature with a ranged weapon attack, you have advantage on the next melee weapon attack you make against that creature. When you hit a creature with a melee weapon attack, you have advantage on the next ranged weapon attack you make against that creature.\n- When you roll below half the maximum on a damage die, you can treat the roll as if you'd rolled half the maximum on the damage die. You can only affect a number of dice up to half your Wisdom or Charisma modifier (your choice, minimum of one) in this way.\n\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
      }
    ],
    "name": "Ysannanite Form"
  },
  {
    "className": "Scholar",
    "features": [
      {
        "level": 3,
        "name": "Wilderness Expert",
        "text": "You gain proficiency in Animal Handling, and you have advantage on Wisdom (Animal Handling) checks. Additionally, you can't have disadvantage on Wisdom (Animal Handling) checks."
      },
      {
        "level": 3,
        "name": "Beast Companion",
        "text": "You learn to employ all the knowledge you've accumulated to forge a powerful bond with your own beast companion.\n\nCreate your beast companion as detailed in the Companions section of the Customization Options document for Expanded Content. \n\nIn addition to its traits and features, your beast companion gains additional benefits while it is bonded to you:\n- Your beast gains two additional traits. It gains one more additional trait when you reach 11th level in this class. For each beast trait in excess of your proficiency bonus, your number of available Hit Dice that can be spend to restore hit points is reduced by 1.\n\nLastly, while bonded and within 10 feet of you, your beast companion gains a bonus to ability checks, armor class, attack rolls, damage rolls, and saving throws equal to half your Critical Analysis ability modifer (minimum of +1).\n\nThis radius increases to 30 feet at 11th level, and 60 feet at 17th level."
      },
      {
        "level": 6,
        "name": "Vicious Hunting",
        "text": "Your beast companion's strikes count as enhanced for the purpose of overcoming resistance and immunity to unenhanced attacks and damage. Additionally, when your beast makes an attack roll, ability check, or saving throw, you may expend a superiority die and apply the benefits of a maneuver you know from this class, as if you had taken the action yourself."
      },
      {
        "level": 9,
        "name": "Bestial Agility",
        "text": "Your beast's reflexes and agility allow it to move with a burst of speed. When your beast moves on its turn in combat, it can double its speed until the end of the turn. Once its used this feature, it can't use it again until it moves 0 feet on one of its turns."
      },
      {
        "level": 17,
        "name": "Feral Ferocity",
        "text": "You have learned how to push your beast beyond its limits. If your beast is within 30 feet of you and can see or hear you, you can command it to enter a furious state. While raging, your beast gains the following benefits:\n- Your beast has advantage on Strength checks and Strength saving throws if it is size Medium or larger.\n- Your beast has advantage on Dexterity checks and Dexterity saving throws if it is size Small or smaller.\n- When your beast hits with an attack, it deals bonus damage equal to your Critical Analysis ability modifer.\n- Your beast has resistance to kinetic and energy damage.\n\nYour beast's furious state lasts for 1 minute. It ends early if your beast is knocked unconscious. You can end your beast's furious state as a bonus action.\n\nOnce you've used this feature, you can't use it again until you finish a long rest."
      },
      {
        "level": 3,
        "name": "Zoologist Discoveries",
        "text": "When you select this pursuit, you gain access to new discoveries which reflect your studies in biology and behaviour of alien lifeforms. Whenever you learn a new discovery, you can choose from any of the following as well. The discoveries are listed in alphabetical order.\n\nWhen you make a Charisma (Intimidation) check against a creature that can see your beast companion, and your companion is size Medium or larger, you make the check with advantage.\n\nWhen you make a Charisma (Persuasion) check against a creature that can see your beast companion, and your companion is size Small or Tiny, you make the check with advantage.\n\nYou have learned how to safely attach a holocam on the head of the companion. You learn the *tracker droid interface* tech power, your beast becomes a valid target of this power, and when you cast this power targeting your beast, you do so without spending tech points. You require use of a wristpad for this power.\n\n_Prerequisite: 5th level_\nYour beast gains proficiency in one Strength or Dexterity skill of your choice. If your beast's size is Medium or larger and the chosen skill uses Strength, it has expertise in the chosen skill. If your beast's size is Small or smaller and the chosen skill uses Dexterity, it has expertise in the chosen skill.\n\n_Prerequisite: Size Medium or larger beast_\nYour beast companion gains the following benefits:\n- It deals double damage against structures.\n- It can take the Guard action as a bonus action, but it can only guard you in this way.\n- It can spend a bonus action to spend one of its Hit Dice to recover hit points.\n- When it rolls a Hit Die to regain hit points, the minimum number of hit points it can regain from the roll equals twice its Constitution modifier (minimum of 2).\n\nIf a creature makes a melee attack against you or your companion, and your companion is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll.\n\n_Prerequisite: Size Small or smaller beast_\nRather than a single beast companion, you instead control multiple beasts that function as a swarm. Your beast companion gains the following benefits:\n- Its effective size increases by two categories (from Tiny to Medium or Small to Large).\n- Its hit points increase by an amount equal to twice its level + 2.\n- It can only be mounted by creatures at least three size categories smaller than it, instead of one.\n- It can occupy another creature's space and vice versa, and it can move through any opening large enough for a creature two size categories smaller than it.\n- While it is above half its hit point maximum, when it takes the Attack action, it can make an additional attack. If the creature has the Extra Attack feature, this attack is in addition to the attack granted by that feature."
      }
    ],
    "name": "Zoologist Pursuit"
  }
];
