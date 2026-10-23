// Companion class features (a companion picks a class at 3rd level), from the "Companion Classes" part of the
// Expanded Content "Customization Options" chapter on sw5e.com. Generated from
// sw5eapi.azurewebsites.net/api/ExpandedContent, not hand-typed. A feature's level is the first
// "Nth level" in its text (3rd when it names none).
import type { CompanionClassDef } from "../types";

export const COMPANION_CLASSES: CompanionClassDef[] = [
  {
    "name": "Berserker",
    "prerequisite": "In order to become a berserker, your companion must have a Strength score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor, medium armor",
      "• Weapons: All vibroweapons, simple blasters",
      "• Tools: None",
      "• Saving Throws: Strength, Constitution",
      "• Skills: Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, Survival"
    ],
    "features": [
      {
        "name": "Rage",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, in battle, it fights with primal ferocity. On your companion's turn, it can enter a rage as a bonus action if it isn't wearing heavy armor.\nWhile raging, your companion gains the following benefits:\n• It has advantage on Strength checks and Strength saving throws.\n• When it makes a melee weapon attack using Strength, it gains a +2 bonus to the damage roll. This bonus increases to +3 at 11th level.\n• It has resistance to kinetic and energy damage.\n• If it is able to cast powers, it can't cast them or concentrate on them while raging.\nYour companion's rage lasts for 1 minute. It ends early if your companion is knocked unconscious, it dons heavy armor, or if its turn ends and it hasn't attacked a hostile creature or taken damage since its last turn. It can also end its rage on your turn as a bonus action.\nYour companion can use this feature twice. It gains an additional use at 11th level. Your companion regains all expended uses when it finishes a long rest."
      },
      {
        "name": "Reckless Attack",
        "level": 3,
        "text": "Also at 3rd level, your companion can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
      },
      {
        "name": "Danger Sense",
        "level": 7,
        "text": "At 7th level, your companion gains an uncanny sense of when things nearby aren't as they should be, giving it an edge when it dodges away from danger.\nYour companion has advantage on Dexterity saving throws against effects that it can see, such as traps and powers. To gain this benefit, it can't be blinded, deafened, or incapacitated."
      },
      {
        "name": "Extra Attack",
        "level": 11,
        "text": "By 11th level, your companion can attack twice, instead of once, whenever it takes the Attack action on its turn."
      },
      {
        "name": "Brutal Critical",
        "level": 15,
        "text": "At 15th level, your companion can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack."
      },
      {
        "name": "Relentless Rage",
        "level": 18,
        "text": "As of 18th level, your companion's rage can keep it fighting despite grievous wounds. If your companion drops to 0 hit points while it's raging and it doesn't die outright, it can make a DC 10 Constitution saving throw. If it succeeds, it drops to 1 hit point instead.\nEach time it uses this feature after the first, the DC increases by 5. When it finishes a short or long rest, the DC resets to 10."
      }
    ]
  },
  {
    "name": "Consular",
    "prerequisite": "In order to become a consular, your companion must have a Wisdom or Charisma score of 13 or higher.",
    "proficiencies": [
      "• Armor: None",
      "• Weapons: Simple lightweapons, simple vibroweapons",
      "• Tools: None",
      "• Saving Throws: Wisdom, Charisma",
      "• Skills: Choose two from Deception, Insight, Intimidation, Investigation, Lore, Medicine, and Persuasion"
    ],
    "features": [
      {
        "name": "Forcecasting",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, it has learned powers, fragments of knowledge that imbue it with an abiding force ability. See chapter 10 of the Player's Handbook for the general rules of forcecasting and chapter 11 of the Player's Handbook for the force powers list.\nForce Powers Known:\nYour companion learns three force powers of its choice of no higher level than its Max Power Level. It may learn a force power at the same time it learns its prerequisite.\nAt-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level.\nForce Points:\nYour companion does not require force points. Instead, it can only cast powers at 1st-level twice. It regains all expended uses after completing a long rest.\nMax Power Level:\nYour companion's Max Power Level is 1st.\nForcecasting Ability:\nYour companion's forcecasting ability varies based on the alignment of the powers you cast. It uses Wisdom for light side powers, Charisma for dark side powers, and Wisdom or Charisma for universal powers (its choice). It uses this ability score modifier whenever a power refers to its forcecasting ability. Additionally, it uses this ability score modifier when setting the saving throw DC for a force power it casts and when making an attack roll with one.\nForce save DC = 8 + its proficiency bonus + its forcecasting ability modifier\nForce attack modifier = its proficiency bonus + its forcecasting ability modifier"
      },
      {
        "name": "Force Shield",
        "level": 3,
        "text": "Also at 3rd level, your companion learns how to defend itself purely through its strength with the Force. When your companion is hit by an attack, it can use its reaction to shroud itself in Force energy. Until the start of its next turn, it has a bonus to AC equal to its Wisdom or Charisma modifier (your companion's choice, a minimum of +1). This includes the triggering attack.\nYour companion can use this feature twice. It gains an additional use at 11th level. Your companion regains all expended uses when it finishes a long rest."
      },
      {
        "name": "Apprentice Forcecasting",
        "level": 7,
        "text": "At 7th level, your companion's Max Power Level increases to 2nd, and it learns three additional powers.\nAdditionally, your companion can cast powers at 2nd-level twice. It regains all expended uses after completing a long rest."
      },
      {
        "name": "Journeyman Forcecasting",
        "level": 11,
        "text": "By 11th level, your companion's Max Power Level increases to 3rd, and it learns three additional powers.\nAdditionally, your companion can cast powers at 3rd-level twice. It regains all expended uses after completing a long rest."
      },
      {
        "name": "Adept Forcecasting",
        "level": 15,
        "text": "At 15th level, your companion's Max Power Level increases to 4th, and it learns three additional powers.\nAdditionally, your companion can cast powers at 4th-level twice. It regains all expended uses after completing a long rest."
      },
      {
        "name": "Master Forcecasting",
        "level": 18,
        "text": "As of 18th level, your companion's Max Power Level increases to 5th, and it learns three additional powers.\nAdditionally, your companion can cast powers at 5th-level once. It regains the ability to do so after completing a long rest."
      }
    ]
  },
  {
    "name": "Engineer",
    "prerequisite": "In order to become an engineer, your companion must have an Intelligence score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor",
      "• Weapons: Simple blasters, simple vibroweapons",
      "• Tools: Tinker's implements and one of your choice",
      "• Saving Throws: Constitution, Intelligence",
      "• Skills: Choose three from Investigation, Lore, Medicine, Nature, Piloting, and Technology"
    ],
    "features": [
      {
        "name": "Techcasting",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, during its training it has derived powers from schematics with the aid of a wristpad. See chapter 10 of the Player's Handbook for the general rules of techcasting and chapter 12 of the Player's Handbook for the tech powers list.\nTech Powers Known:\nYour companion learns two tech powers of its choice of no higher level than its Max Power Level.\nAt-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level.\nTech Points:\nYour companion does not require tech points. Instead, it can only cast powers at 1st-level once. It regains the ability to do so after completing a short or long rest.\nMax Power Level:\nYour companion's Max Power Level is 1st.\nTechcasting Ability:\nIntelligence is your companion's techcasting ability for its tech powers. It uses Intelligence whenever a power refers to its techcasting ability. Additionally, it use its Intelligence modifier when setting the saving throw DC for a tech power it casts and when making an attack roll with one.\nTech save DC = 8 + its proficiency bonus + its Intelligence modifier\nTech attack modifier = its proficiency bonus + its Intelligence modifier\nTechcasting Focus:\nYour companion uses a wristpad (found in chapter 5 of the Player's Handbook) as a techcasting focus for its tech powers."
      },
      {
        "name": "Potent Aptitude",
        "level": 3,
        "text": "Also at 3rd level, your companion's technological experience lends it an uncommon insight that it can use to bolster its allies. To do so, it uses a bonus action on its turn to choose one creature other than itself within 60 feet of it who can hear it. That creature gains one Potent Aptitude die, a d4. This die increases to a d6 at 7th level and a d8 at 15th level.\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Potent Aptitude die, but must decide before the GM says whether the roll succeeds or fails. Once the Potent Aptitude die is rolled, it is lost.\nA creature can have only one Potent Aptitude die at a time.\nYour companion can use this feature once. It gains an additional use at 5th and 13th level. It regains any expended uses when it finishes a short or long rest."
      },
      {
        "name": "Techcasting, Mark II",
        "level": 7,
        "text": "At 7th level, your companion's Max Power Level increases to 2nd, and it learns two additional powers.\nAdditionally, your companion can cast powers at 2nd-level once. It regains the ability to do so after completing a short or long rest."
      },
      {
        "name": "Techcasting, Mark III",
        "level": 11,
        "text": "By 11th level, your companion's Max Power Level increases to 3rd, and it learns two additional powers.\nAdditionally, your companion can cast powers at 3rd-level once. It regains the ability to do so after completing a short or long rest."
      },
      {
        "name": "Techcasting, Mark IV",
        "level": 15,
        "text": "At 15th level, your companion's Max Power Level increases to 4th, and it learns two additional powers.\nAdditionally, your companion can cast powers at 4th-level once. It regains the ability to do so after completing a short or long rest."
      },
      {
        "name": "Techcasting, Mark V",
        "level": 18,
        "text": "As of 18th level, your companion's Max Power Level increases to 5th, and it learns two additional powers.\nAdditionally, your companion can cast powers at 5th-level once. It regains all expended uses after completing a long rest."
      }
    ]
  },
  {
    "name": "Fighter",
    "prerequisite": "In order to become a warrior, your companion must have a Strength, Dexterity, or Constitution score of 13 or higher.",
    "proficiencies": [
      "• Armor: All armor",
      "• Weapons: All blasters, all vibroweapons",
      "• Tools: None",
      "• Saving Throws: Strength, Constitution",
      "• Skills: Choose two skills from Acrobatics, Animal Handling, Athletics, Lore, Insight, Intimidation, Perception, and Survival"
    ],
    "features": [
      {
        "name": "Second Wind",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, it has a limited well of stamina that it can draw on to protect itself from harm. On its turn, your companion can use a bonus action to regain hit points. It rolls a Hit Die without expending it, regaining a number of hit points equal to the result of the Hit Die + its level.\nOnce your companion has used this feature, it must finish a short or long rest before it can use it again."
      },
      {
        "name": "Action Surge",
        "level": 3,
        "text": "Also at 3rd level, your companion can push itself beyond its normal limits for a moment. On its turn, it can take one additional action on top of its regular action and possible bonus actions.\nOnce your companion has used this feature, it must finish a short or long rest before it can use it again."
      },
      {
        "name": "Martial Superiority",
        "level": 7,
        "text": "At 7th level, your companion has learned maneuvers that are fueled by special dice called superiority dice. See chapter 13 of the Player's Handbook for the maneuvers list.\nManeuvers:\nYour companion learns one maneuver of its choice. Many maneuvers enhance an attack in some way. Your companion can use only one maneuver per attack, and it may only use each maneuver once per turn.\nYour companion learns an additional maneuver at 5th, 9th, 13th, 15th, and 17th level. Each time your companion gains a level, it can also replace one maneuver it knows with a different one.\nSuperiority Dice:\nYour companion has one superiority dice, which is d4. This die increases to a d6 at 9th level and a d8 at 17th level. A superiority die is expended when your companion uses it. Your companion regains all of its expended superiority dice when it finishes a short or long rest.\nYour companion gains an additional superiority die at 9th and 17th level.\nManeuver Ability:\nYour companion's maneuver ability varies based on the type of the maneuver it uses. It uses Strength, Dexterity, or Constitution for physical maneuvers (its choice), Intelligence, Wisdom, or Charisma for mental maneuvers (its choice), and an ability of its choice for general maneuvers. It uses this ability whenever a maneuver refers to its maneuver ability. Additionally, it uses this ability modifier when setting the saving throw DC for a maneuver it uses.\nManeuver save DC = 8 + your proficiency bonus + your maneuver ability modifier"
      },
      {
        "name": "Extra Attack",
        "level": 11,
        "text": "By 11th level, your companion can attack twice, instead of once, whenever it takes the Attack action on its turn."
      },
      {
        "name": "Indomitable",
        "level": 15,
        "text": "At 15th level, your companion can reroll a saving throw that it fails. If it does so, it must use the new roll.\nYour companion can use this feature twice. It regains all expended uses when it completes a long rest."
      },
      {
        "name": "Greater Extra Attack",
        "level": 18,
        "text": "As of 18th level, your companion can attack three times, instead of once, whenever it takes the Attack action on its turn.\nAdditionally, when your companion uses a bonus action to engage in Double- or Two-Weapon Fighting, it can make two attacks, instead of one."
      }
    ]
  },
  {
    "name": "Guardian",
    "prerequisite": "In order to become a guardian, your companion must have a Constitution, Wisdom, or Charisma score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor, medium armor",
      "• Weapons: All lightweapons, all vibroweapons",
      "• Tools: None",
      "• Saving Throws: Constitution, Charisma",
      "• Skills: Choose two from Acrobatics, Athletics, Deception, Insight, Intimidation, Lore, Perception, Persuasion, and Piloting"
    ],
    "features": [
      {
        "name": "Forcecasting",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, it has learned powers, fragments of knowledge that imbue it with an abiding force ability. See chapter 10 of the Player's Handbook for the general rules of forcecasting and chapter 11 of the Player's Handbook for the force powers list.\nForce Powers Known:\nYour companion learns three force powers of its choice of no higher level than its Max Power Level. It may learn a force power at the same time it learns its prerequisite.\nAt-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level.\nForce Points:\nYour companion does not require force points. Instead, it can only cast powers at 1st-level twice. It regains all expended uses after completing a long rest.\nMax Power Level:\nYour companion's Max Power Level is 1st.\nForcecasting Ability:\nYour companion's forcecasting ability varies based on the alignment of the powers you cast. It uses Wisdom for light side powers, Charisma for dark side powers, and Wisdom or Charisma for universal powers (its choice). It uses this ability score modifier whenever a power refers to its forcecasting ability. Additionally, it uses this ability score modifier when setting the saving throw DC for a force power it casts and when making an attack roll with one.\nForce save DC = 8 + its proficiency bonus + its forcecasting ability modifier\nForce attack modifier = its proficiency bonus + its forcecasting ability modifier"
      },
      {
        "name": "Channel the Force",
        "level": 3,
        "text": "Also at 3rd level, your companion knows how to channel the Force to create a unique effect. Your companion starts with its choice of one from two such effects: Cause Harm or Lend Aid.\nSome Channel the Force effects require saving throws. When your companion uses such an effect from this class, the DC equals its universal force save DC.\nYour companion can use this feature a number of times equal to its Wisdom or Charisma modifier (your companion's choice, minimum of once). Your companion regains all expended uses when it finishes a short or long rest.\nCause Harm:\nAs an action, your companion can expend a use of its Channel the Force to sap the life from a hostile creature it can see within 60 feet. That creature must make a Constitution saving throw. On a failed save, the creature takes necrotic damage equal to your companion's level + its Charisma modifier (minimum of one), or half as much on a successful one.\nLend Aid:\nAs a bonus action, your companion can expend a use of its Channel the Force and touch a beast or humanoid within 5 feet of it. That creature regains hit points equal to your companion's guardian level + its Wisdom modifier (minimum of one). Alternatively, if the beast or humanoid is poisoned or diseased, your companion neutralizes the poison or disease. If more than one poison or disease afflicts the target, your companion neutralizes one poison or disease that it knows is present, or it neutralizes one at random."
      },
      {
        "name": "Apprentice Forcecasting",
        "level": 7,
        "text": "At 7th level, your companion's Max Power Level increases to 2nd, and it learns three additional powers.\nAdditionally, your companion can cast powers at 2nd-level twice. It regains all expended uses after completing a long rest."
      },
      {
        "name": "Extra Attack",
        "level": 11,
        "text": "By 11th level, your companion can attack twice, instead of once, whenever it takes the Attack action on its turn."
      },
      {
        "name": "Force Purity",
        "level": 15,
        "text": "At 15th level, the Force flowing through your companion makes it immune to poison and disease."
      },
      {
        "name": "Journeyman Forcecasting",
        "level": 18,
        "text": "As of 18th level, your companion's Max Power Level increases to 3rd, and it learns three additional powers.\nAdditionally, your companion can cast powers at 3rd-level once. It regains the ability to do so after completing a long rest."
      }
    ]
  },
  {
    "name": "Monk",
    "prerequisite": "In order to become a monk, your companion must have a Dexterity, Wisdom, or Charisma score of 13 or higher.",
    "proficiencies": [
      "• Armor: None",
      "• Weapons: Simple blasters, simple vibroweapons, chakrams, techblades",
      "• Tools: None",
      "• Saving Throws: Strength, Dexterity",
      "• Skills: Choose two from Acrobatics, Athletics, Insight, Lore, Perception, and Stealth"
    ],
    "features": [
      {
        "name": "Martial Arts",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, your companion's practice of martial arts gives it mastery of combat styles that use unarmed strikes and martial artist weapons, which are any simple vibroweapons that don't have the two-handed property.\nYour companion gains the following benefits while it is unarmed or wielding only martial artist weapons and isn't wearing armor or wielding a shield:\n• Your companion can use Dexterity instead of Strength for the attack and damage rolls of its unarmed strikes and martial artist weapons.\n• Your companion can roll a d4 in place of the normal damage of its unarmed strike or martial artist weapons. This die becomes a d6 at 7th level and a d8 at 15th level.\n• Your companion can use Dexterity instead of Strength whenever it would make a Strength (Athletics) check to grapple, shove, or trip a creature.\n• When your companion takes the Attack action with an unarmed strike or a martial artist weapon on your turn, it can make one unarmed strike as a bonus action.\n• Your companion can take the Dash and Disengage actions as a bonus action."
      },
      {
        "name": "Unarmored Defense",
        "level": 3,
        "text": "Also at 3rd level, while your companion is wearing no armor and not wielding a shield, its AC equals 10 + its Dexterity modifier + its Wisdom or Charisma modifier (your companion's choice)."
      },
      {
        "name": "Focus",
        "level": 7,
        "text": "At 7th level, your companion's training allows it to harness the mystic energy of focus. Its access to this energy is represented by a number of focus points. Your companion has three focus points. It gains an additional focus point at 9th, 13th, and 17th level.\nYour companion can spend these points to fuel various focus features. Your companion knows three such features: Flurry of Blows, Patient Defense, and Step of the Wind.\n&emsp;When your companion spends a focus point, it is unavailable until your companion finishes a short or long rest, at the end of which it draws all of its expended focus back into itself. Your companion must spend at least 30 minutes of the rest meditating to regain its focus points.\nSome of your companion's focus features require your target to make a saving throw to resist the feature's effects. The saving throw DC is calculated as follows:\nFocus save DC = 8 + your proficiency bonus + your Wisdom or Charisma modifier (your choice)\nFlurry of Blows:\nWhen your companion makes its Martial Arts bonus action unarmed strike, it can spend 1 focus point to make an additional unarmed strike (no action required). At 18 level, it can instead spend 2 focus points to make two additional unarmed strikes.\nPatient Defense:\nWhen your companion uses its bonus action to Disengage, it can spend 1 focus point to also Dodge (no action required). At 18th level, it can instead spend 2 focus points to Dodge and gain an additional reaction until the start of its next turn. It can only take one reaction per turn.\nStep of the Wind:\nWhen your companion uses its bonus action to Dash, it can spend 1 focus point to double its jump distance for the turn. At 18th level, it can instead spend 2 focus points to gain a flying speed equal to its walking speed until the end of your turn, though it falls if it ends its speed in the air and nothing else is holding it aloft."
      },
      {
        "name": "Enhanced Strikes",
        "level": 7,
        "text": "Also at 7th level, your companion's unarmed strikes count as enhanced for the purpose of overcoming resistance and immunity to unenhanced attacks and damage."
      },
      {
        "name": "Extra Attack",
        "level": 11,
        "text": "By 11th level, your companion can attack twice, instead of once, whenever it takes the Attack action on its turn."
      },
      {
        "name": "Evasion",
        "level": 15,
        "text": "At 15th level, when your companion is subjected to an effect, such as a consular's *force storm* or an engineer's *explosion*, that allows it to make a Dexterity saving throw to take only half damage, it instead take no damage if it succeeds on a saving throw, and only half damage if it fails."
      },
      {
        "name": "Diamond Soul",
        "level": 18,
        "text": "As of 18th level, your companion gains proficiency in all saving throws. Additionally, whenever your companion fails a saving throw, it can spend 1 focus point to reroll it and take the second result."
      }
    ]
  },
  {
    "name": "Operative",
    "prerequisite": "In order to become an operative, your companion must have a Dexterity or Intelligence score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor",
      "• Weapons: Simple blasters, simple vibroweapons, blaster pistol, hidden blade, techblade, vibrorapier",
      "• Tools: One specialist's kit of your choice",
      "• Saving Throws: Dexterity, Intelligence",
      "• Skills: Choose any four"
    ],
    "features": [
      {
        "name": "Sneak Attack",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, your companion knows how to strike subtly and exploit a foe's distraction. Once per turn, it can deal an extra 1d6 damage to one creature it hits with an attack if it has advantage on the attack roll. The attack must use a finesse or a ranged weapon.\nYour companion doesn't need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn't incapacitated, and your companion doesn't have disadvantage on the attack roll.\nThe amount of extra damage increases to 2d6 at 7th level, 3d6 at 11th level, 4d6 at 15th level, and 5d6 at 17th level."
      },
      {
        "name": "Cunning Action",
        "level": 3,
        "text": "Also at 3rd level, your companion's quick thinking and agility allow it to move and act quickly. Your companion can take a bonus action on each of its turns in combat. This action can be used only to take the Dash, Disengage, or Hide action."
      },
      {
        "name": "Bad Feeling",
        "level": 7,
        "text": "At 7th level, your companion has a wary eye, bordering on paranoia. When your companion rolls for initiative, it can move up to its speed. This movement happens before the initiative order is determined.\nOnce your companion has used this feature, it must finish a long rest before it can use it again."
      },
      {
        "name": "Uncanny Dodge",
        "level": 11,
        "text": "By 11th level, when an attacker that your companion can see hits it with an attack, your companion can use its reaction to halve the attack's damage against it."
      },
      {
        "name": "Evasion",
        "level": 15,
        "text": "At 15th level, when your companion is subjected to an effect, such as a consular's *force storm* or an engineer's *explosion*, that allows it to make a Dexterity saving throw to take only half damage, it instead take no damage if it succeeds on a saving throw, and only half damage if it fails."
      },
      {
        "name": "Reliable Talent",
        "level": 18,
        "text": "As of 18th level, your companion has refined its chosen skills until they approach perfection. Whenever your companion makes an ability check that lets it add its proficiency bonus, it can treat a d20 roll of 9 or lower as a 10."
      }
    ]
  },
  {
    "name": "Scholar",
    "prerequisite": "In order to become a scholar, your companion must have an Intelligence score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor",
      "• Weapons: Simple blasters, simple vibroweapons, techblades",
      "• Tools: Any one",
      "• Saving Throws: Wisdom, Intelligence",
      "• Skills: Choose three from Deception, Insight, Intimidation, Investigation, Lore, Medicine, Nature, Persuasion, and Survival"
    ],
    "features": [
      {
        "name": "Academic Superiority",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, your companion has learned maneuvers that are fueled by special dice called superiority dice. See chapter 13 of the Player's Handbook for the maneuvers list.\nManeuvers:\nYour companion learns two maneuvers of its choice. Many maneuvers enhance an attack in some way. Your companion can use only one maneuver per attack, and it may only use each maneuver once per turn.\nYour companion learns an additional maneuver at 5th, 7th, 9th, 11th, 13th, 15th, and 17th level. Each time your companion gains a level, it can also replace one maneuver it knows with a different one.\nSuperiority Dice:\nYour companion has two superiority dice, which are d4s. This die increases to a d6 at 9th level and a d8 at 17th level. A superiority die is expended when your companion uses it. Your companion regains all of its expended superiority dice when it finishes a short or long rest.\nYour companion gains an additional superiority die at 5th, 9th, 13th, and 17th level.\nManeuver Ability:\nYour companion's maneuver ability varies based on the type of the maneuver it uses. It uses Strength, Dexterity, or Constitution for physical maneuvers (its choice), Intelligence, Wisdom, or Charisma for mental maneuvers (its choice), and an ability of its choice for general maneuvers. It uses this ability whenever a maneuver refers to its maneuver ability. Additionally, it uses this ability modifier when setting the saving throw DC for a maneuver it uses.\nManeuver save DC = 8 + your proficiency bonus + your maneuver ability modifier"
      },
      {
        "name": "Critical Analysis",
        "level": 3,
        "text": "Also at 3rd level, it is able to analyze a target, develop a plan on how to best overcome any potential obstacle, and execute that plan with ruthless efficiency. As a bonus action on its turn, your companion can analyze a target it can see within 60 feet of it. For the next minute, or until your companion analyzes another target, it gain the following benefits:\n• When your companion analyzes a hostile creature, its attack and damage rolls made with weapons with the finesse property or blaster weapons against that target may use its Intelligence modifier instead of Strength or Dexterity.\n• When your companion analyzes a friendly creature, the target can end your companion's Critical Analysis on them (no action required) to add your companion's Intelligence modifier to one attack roll, ability check, or saving throw. Once a friendly creature has benefited from this ability, they can not do so again until they complete a short or long rest."
      },
      {
        "name": "Discoveries",
        "level": 7,
        "text": "At 7th level, your companion learns two discoveries from those available to the scholar class or any of the scholar's archetypes."
      },
      {
        "name": "Multitasker",
        "level": 11,
        "text": "By 11th level, your companion can take a second reaction each round. It can only take one reaction per turn."
      },
      {
        "name": "Sage Advice",
        "level": 15,
        "text": "At 15th level, your companion can spend 1 minute spread its knowledge and experience, advising those around it. When it does so, your companion chooses a skill or tool it is proficient with and a number of friendly creatures up to its Intelligence modifier with 30 feet of it who can hear it and understand it. Once within the next hour, the next time each creature would make an ability check with the chosen skill or tool, they may add their proficiency bonus to the roll if they are not already proficient. A creature may only benefit from this feature once. If a creature is targeted by this feature again before using it, they can choose to retain the first benefit or replace it with the new skill or tool instead.\nOnce your companion has used this feature, it must complete a short or long rest before it can use it again."
      },
      {
        "name": "Calm and Collected",
        "level": 18,
        "text": "As of 18th level, when your companion makes a saving throw caused by an effect it can see, it may gain a bonus to the saving throw equal to its Intelligence modifier.\nOnce your companion has used this feature, it must complete a short or long rest before it can use it again."
      }
    ]
  },
  {
    "name": "Scout",
    "prerequisite": "In order to become a scout, your companion must have a Strength, Dexterity, or Intelligence score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor, medium armor",
      "• Weapons: All blasters, all vibroweapons",
      "• Tools: None",
      "• Saving Throws: Strength, Dexterity",
      "• Skills: Choose three from Animal Handling, Athletics, Insight, Investigation, Perception, Piloting, Stealth, Survival, and Technology"
    ],
    "features": [
      {
        "name": "Techcasting",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, during its training it has derived powers from schematics with the aid of a wristpad. See chapter 10 of the Player's Handbook for the general rules of techcasting and chapter 12 of the Player's Handbook for the tech powers list.\nTech Powers Known:\nYour companion learns two tech powers of its choice of no higher level than its Max Power Level.\nAt-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level.\nTech Points:\nYour companion does not require tech points. Instead, it can only cast powers at 1st-level once. It regains the ability to do so after completing a short or long rest.\nMax Power Level:\nYour companion's Max Power Level is 1st.\nTechcasting Ability:\nIntelligence is your companion's techcasting ability for its tech powers. It uses Intelligence whenever a power refers to its techcasting ability. Additionally, it use its Intelligence modifier when setting the saving throw DC for a tech power it casts and when making an attack roll with one.\nTech save DC = 8 + its proficiency bonus + its Intelligence modifier\nTech attack modifier = its proficiency bonus + its Intelligence modifier\nTechcasting Focus:\nYour companion uses a wristpad (found in chapter 5 of the Player's Handbook) as a techcasting focus for its tech powers."
      },
      {
        "name": "Ranger's Quarry",
        "level": 3,
        "text": "Also at 3rd level, your companion learns how to effectively read and track its prey. Once on each of its turns, your companion can choose a creature it can see within 120 feet and mark it as its quarry (no action\nrequired). For the next hour, your companion gains the following benefits:\n• Once per turn, when your companion hits the target with a weapon attack, it can deal 1d4 additional damage to it of the same type as the weapon's damage. This die increases to a d6 at 7th level and a d8 at 15th level.\n• Your companion has advantage on any Wisdom (Perception) or Wisdom (Survival) check it makes to find the target while it's on the same planet as your companion.\nYour companion can only have one creature marked in this way at a time. Beginning at 11th level, your companion can use its reaction to mark a creature when it enters its line of sight, provided it is within range of your companion's Ranger's Quarry.\nThe duration increases to 8 hours at 11th level."
      },
      {
        "name": "Techcasting, Mark II",
        "level": 7,
        "text": "At 7th level, your companion's Max Power Level increases to 2nd, and it learns two additional powers.\nAdditionally, your companion can cast powers at 2nd-level once. It regains the ability to do so after completing a short or long rest."
      },
      {
        "name": "Extra Attack",
        "level": 11,
        "text": "By 11th level, your companion can attack twice, instead of once, whenever it takes the Attack action on its turn."
      },
      {
        "name": "Commando",
        "level": 15,
        "text": "At 15th level, your companion can take the Dash or Hide actions as a bonus action on each of its turns. Additionally, it can remain perfectly still for long periods of time to set up ambushes.\nWhen your companion attempts to hide on its turn, it can opt to not move on that turn. If it avoids moving, creatures that attempt to detect it take a -10 penalty to their Wisdom (Perception) checks until the start of your companion's next turn. Your companion loses this benefit if it moves or falls prone, either voluntarily or because of some external effect. It is still automatically detected if any effect or action causes it to no longer be hidden.\nIf your companion is still hidden on its next turn, it can continue to remain motionless and gain this benefit until it is detected.\nAdditionally, your companion can no longer be tracked by unenhanced means, unless it chooses to leave a trail."
      },
      {
        "name": "Techcasting, Mark III",
        "level": 18,
        "text": "As of 18th level, your companion's Max Power Level increases to 3rd, and it learns two additional powers.\nAdditionally, your companion can cast powers at 3rd-level once. It regains the ability to do so after completing a long rest."
      }
    ]
  },
  {
    "name": "Sentinel",
    "prerequisite": "In order to become a sentinel, your companion must have a Dexterity, Wisdom, or Charisma score of 13 or higher.",
    "proficiencies": [
      "• Armor: Light armor",
      "• Weapons: Simple vibroweapons, simple lightweapons, chakram, doubleblade, doublesaber, doubleshoto, doublesword, hidden blade, lightfoil, light ring, saberwhip, vibrorapier, vibrowhip",
      "• Tools: One specialist's kit of your choice",
      "• Saving Throws: Dexterity, Charisma",
      "• Skills: Choose three from Acrobatics, Animal Handling, Insight, Intimidation, Perception, Persuasion, Piloting, Stealth, and Technology"
    ],
    "features": [
      {
        "name": "Forcecasting",
        "level": 3,
        "text": "Beginning when your companion chooses this class at 3rd level, it has learned powers, fragments of knowledge that imbue it with an abiding force ability. See chapter 10 of the Player's Handbook for the general rules of forcecasting and chapter 11 of the Player's Handbook for the force powers list.\nForce Powers Known:\nYour companion learns three force powers of its choice of no higher level than its Max Power Level. It may learn a force power at the same time it learns its prerequisite.\nAt-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level.\nForce Points:\nYour companion does not require force points. Instead, it can only cast powers at 1st-level twice. It regains all expended uses after completing a long rest.\nMax Power Level:\nYour companion's Max Power Level is 1st.\nForcecasting Ability:\nYour companion's forcecasting ability varies based on the alignment of the powers you cast. It uses Wisdom for light side powers, Charisma for dark side powers, and Wisdom or Charisma for universal powers (its choice). It uses this ability score modifier whenever a power refers to its forcecasting ability. Additionally, it uses this ability score modifier when setting the saving throw DC for a force power it casts and when making an attack roll with one.\nForce save DC = 8 + its proficiency bonus + its forcecasting ability modifier\nForce attack modifier = its proficiency bonus + its forcecasting ability modifier"
      },
      {
        "name": "Led by the Force",
        "level": 3,
        "text": "Also at 3rd level, your companion can add half its proficiency bonus, rounded down, to any ability check it makes that doesn't already include its proficiency bonus."
      },
      {
        "name": "Apprentice Forcecasting",
        "level": 7,
        "text": "At 7th level, your companion's Max Power Level increases to 2nd, and it learns three additional powers.\nAdditionally, your companion can cast powers at 2nd-level twice. It regains all expended uses after completing a long rest."
      },
      {
        "name": "Extra Attack",
        "level": 11,
        "text": "By 11th level, your companion can attack twice, instead of once, whenever it takes the Attack action on its turn."
      },
      {
        "name": "Journeyman Forcecasting",
        "level": 15,
        "text": "At 15th level, your companion's Max Power Level increases to 3rd, and it learns three additional powers.\nAdditionally, your companion can cast powers at 3rd-level twice. It regains all expended uses after completing a long rest."
      },
      {
        "name": "Adept Forcecasting",
        "level": 18,
        "text": "As of 18th level, your companion's Max Power Level increases to 4th, and it learns three additional powers.\nAdditionally, your companion can cast powers at 4th-level once. It regains the ability to do so after completing a long rest."
      }
    ]
  }
];
