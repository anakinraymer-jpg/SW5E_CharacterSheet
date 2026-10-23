// Companion natures, hit dice, features and traits for the Companions rules in the Expanded Content
// "Customization Options" chapter (sw5e.com). Generated from sw5eapi.azurewebsites.net/api/ExpandedContent,
// not hand-typed. Aberrant, Spirit and Thrall natures are still marked work-in-progress on sw5e.com, so
// they are not included.
import type { CompanionNatureDef } from "../types";

export const COMPANION_NATURES: CompanionNatureDef[] = [
  {
    "nature": "Beast",
    "prerequisite": "Proficiency in Animal Handling",
    "summary": "Your beast takes a form of your choosing. Alternatively, your GM can choose what form your beast takes based on your environment. Once you've chosen your beast's appearance, you assign your beast companion's ability scores. Your beast's Intelligence score is 6, and you assign its other ability scores using a standard array (16, 14, 12, 10, 8) as you see fit.",
    "commonLines": [
      "Languages: Your beast can understand simple commands spoken in two languages of your choice, as well as hand signals, but it can not speak",
      "Size: Tiny",
      "Speed: 20 ft.",
      "Type: Beast",
      "Armor Class: Your beast's armor class equals 10 + its Dexterity modifier.",
      "Barding: Your beast requires proficiency in armor in order to have it made into barding for them, and if the your beast's size increases, the barding must be upgraded accordingly.",
      "Natural Weapon: Your beast companion attacks with a natural weapon, such as claws or a bite, with which it is proficient. On a hit, it deals 1d4 kinetic damage.",
      "Attitude: The beast obeys your commands as best it can. It acts on your turn, and you determine its actions, decisions, attitudes, and so on. If you are incapacitated or absent, your beast acts on its own."
    ],
    "variantLabel": "",
    "variants": [
      {
        "name": "Beast",
        "summary": "",
        "hitDie": 4,
        "lines": []
      }
    ],
    "traits": [
      {
        "name": "Aerial",
        "text": "Your companion has a flying speed equal to its walking speed, and opportunity attacks made against it have disadvantage."
      },
      {
        "name": "Amphibious",
        "text": "Your companion has a swimming speed equal to its walking speed, and it can breathe air and water."
      },
      {
        "name": "Burrower",
        "text": "Your companion has a burrowing speed equal to its walking speed, and it has blindsight out to 10 feet."
      },
      {
        "name": "Charger",
        "text": "If your companion moves at least half its speed straight towards a target before making a melee attack, it deals an additional 1d8 damage on a hit."
      },
      {
        "name": "Climber",
        "text": "Your companion has a climbing speed equal to its walking speed, and it has advantage on Strength saving throws and Strength (Athletics) checks that involve climbing."
      },
      {
        "name": "Closed Mind",
        "text": "Your companion has advantage on Wisdom and Charisma saving throws against force powers."
      },
      {
        "name": "Darkvision",
        "text": "Your companion is accustomed to low-light environments. Your companion can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light. Your companion can't discern color in darkness, only shades of gray."
      },
      {
        "name": "Evasive",
        "text": "Your companion can take the Disengage action as a bonus action."
      },
      {
        "name": "Force Adept",
        "text": "Prerequisite: Force Sensitive\nYour companion learns one 2nd-level force power of your choice, and once per long rest it can cast it at 2nd-level without expending force points. Your companion's forcecasting ability is Wisdom or Charisma (depending on power alignment)."
      },
      {
        "name": "Force Contention",
        "text": "Your companion has advantage on Strength and Constitution saving throws against force powers."
      },
      {
        "name": "Force-Sensitive",
        "text": "Your companion learns one at-will force power and one 1st-level force power, which it can cast at its lowest level once per long rest. Your companion's forcecasting ability is Wisdom or Charisma (depending on power alignment). At-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level."
      },
      {
        "name": "Grappler",
        "text": "When your companion hits with a melee weapon attack, it can use a bonus action to attempt to grapple the target. On a success, the target is both grappled and restrained, and your companion can't attack again while it has a creature grappled."
      },
      {
        "name": "Heavy Hide",
        "text": "Your companion's armor class becomes 14."
      },
      {
        "name": "Keen Hearing",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on hearing."
      },
      {
        "name": "Keen Sight",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Keen Smell",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Light Hide",
        "text": "Your companion's armor class becomes 11 + its Dexterity modifier."
      },
      {
        "name": "Medium Hide",
        "text": "Your companion's armor class becomes 13 + its Dexterity modifier, to a maximum of +2."
      },
      {
        "name": "Natural Camouflage",
        "text": "When your companion attempts to hide, it can opt to not move on its turn. If it avoids moving, it is considered lightly obscured until it moves."
      },
      {
        "name": "Nimble Reflexes",
        "text": "Your companion has advantage on Dexterity and Intelligence saving throws against force powers."
      },
      {
        "name": "Nimble Weapon",
        "text": "Your companion's natural weapon gains the finesse property."
      },
      {
        "name": "Pack Tactics",
        "text": "Your companion has advantage on an attack roll against a creature if at least one ally of your companion is within 5 feet of the creature and the ally isn't incapacitated."
      },
      {
        "name": "Pouncer",
        "text": "If your companion moves at least half its speed straight toward a creature and hits it with a melee attack, the creature must make a Strength saving throw (DC = 8 + your companion's proficiency bonus + its Strength modifier). If the creature is larger than your companion, it makes this save with advantage. On a failed save, the creature is knocked prone, and your companion can make one additional attack against it as a bonus action."
      },
      {
        "name": "Powerful Build",
        "text": "Your companion's carrying capacity and the weight it can push, drag, or lift doubles. If it would already double, it instead triples."
      },
      {
        "name": "Rampager",
        "text": "If your companion reduces a creature to 0 hit points with a melee attack on its turn, your companion can take a bonus action to move up to half its speed and make a melee attack."
      },
      {
        "name": "Ranged Weapon",
        "text": "Your companion has a natural ranged weapon, such as a spitter or tail spikes. It has a normal range of 30 feet and a long range of 90 feet, and on a hit it deals kinetic damage equal to its natural weapon damage die."
      },
      {
        "name": "Reach Weapon",
        "text": "Your companion has a natural weapon with reach, such as a tail or wings. It has the reach property, and on a hit it deals kinetic damage equal to its natural weapon damage die."
      },
      {
        "name": "Size: Huge",
        "text": "Prerequisite: 9th level\nPrerequisite: Size Large\nYour companion's size is Huge. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d12, its natural weapon damage die becomes a d12, and its walking speed increases to 40."
      },
      {
        "name": "Size: Large",
        "text": "Prerequisite: Size Medium\nYour companion's size is Large. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d10, its natural weapon damage die becomes a d10, and its walking speed increases to 35."
      },
      {
        "name": "Size: Medium",
        "text": "Prerequisite: Size Small\nYour companion's size is Medium. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d8, its natural weapon damage die becomes a d8, and its walking speed increases to 30."
      },
      {
        "name": "Size: Small",
        "text": "Your companion's size is Small. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d6, its natural weapon damage die becomes a d6, and its walking speed increases to 25."
      },
      {
        "name": "Sturdy-Legged",
        "text": "Your companion's long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start, and it has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      },
      {
        "name": "Swift",
        "text": "Your companion can take the Dash action as a bonus action."
      },
      {
        "name": "Tremorsense",
        "text": "Your companion gains tremorsense out to 30 feet."
      },
      {
        "name": "Venomous Weapon",
        "text": "When your companion deals damage to a creature with its natural weapon, it must make a Constitution saving throw (DC = 8 + your companion's proficiency bonus + your companion's Constitution modifier) or become poisoned until the end of its next turn."
      }
    ]
  },
  {
    "nature": "Droid",
    "prerequisite": "Proficiency with astrotech's implements",
    "summary": "Your droid takes a form of your choosing. The class of droid you choose determines its features. Once you've selected your type of droid class, you assign your droid's ability scores using standard array (16, 14, 14, 12, 10, 8) as you see fit.",
    "commonLines": [
      "Droid Resistances: Your droid is resistant to necrotic, poison, and psychic damage, and immune to poison and disease.",
      "Droid Vulnerabilities: Your droid is vulnerable to ion damage. Additionally, your droid has disadvantage on saving throws against effects that would deal ion or lightning damage.",
      "Type: Droid",
      "Armor Class: Your droid's armor class equals 10 + its Dexterity modifier.",
      "Armor Integration: Your droid can not wear armor, but it can have the armor professionally integrated into its chassis over the course of a long rest. This work must be done by someone proficient with astrotech's implements. Your droid must be proficient in armor in order to have it integrated.",
      "Droid Systems: Your droid does not need to eat or drink. Additionally, your droid does not require a tech focus to cast tech powers.",
      "Force Insensitive: Your droid can not use force powers or take levels in forcecasting classes.",
      "Maintenance Mode: Rather than sleep, your droid must spend 3 hours performing routine maintenance during a long rest to gain its benefits, during which it has disadvantage on Wisdom (Perception) checks. Additionally, if your droid's long rest would be interrupted, it only needs to complete the long rest instead of restarting it.",
      "Attitude: The droid obeys your commands as best it can. It acts on your turn, and you determine its actions, decisions, attitudes, and so on. If you are incapacitated or absent, your droid acts on its own."
    ],
    "variantLabel": "Droid class",
    "variants": [
      {
        "name": "Class I Droid",
        "summary": "Class I droids, programmed for the mathematical, medical, or physical sciences, are subcategorized as medical droids, biological science droids, physical science droids, and mathematics droids.",
        "hitDie": 8,
        "lines": [
          "Languages: Your droid can speak, read, and write Galactic Basic and one language of your choice. It can understand spoken and written Binary, but can not speak it.",
          "Skills: One Intelligence, Wisdom, or Charisma skill of your choice",
          "Size: Medium",
          "Speed: 25 ft."
        ]
      },
      {
        "name": "Class II Droid",
        "summary": "Class II droids, programmed for the application of engineering and other technical sciences, are subcategorized as astromech droids, exploration droids, environmental droids, engineering droids, and maintenance droids.",
        "hitDie": 6,
        "lines": [
          "Skills: One of your choice",
          "Tools: One specialist's kit of your choice",
          "Languages: Your droid can speak, read, and write Binary. It can understand spoken and written Galactic Basic and one language of your choice, but can not speak it.",
          "Size: Small",
          "Speed: 25 ft.",
          "Undersized: Your droid's small stature makes it hard for it to wield bigger weapons. Your droid can't use heavy shields. Additionally, it can't use martial weapons with the two-handed property unless it also has the light property, and if a martial weapon has the versatile property, your droid can only wield it in two hands."
        ]
      },
      {
        "name": "Class III Droid",
        "summary": "Class III droids, programmed to interact with humans and said to be the most advanced droids ever invented, are subcategorized as protocol droids, servant droids, tutor droids, and child care droids.",
        "hitDie": 8,
        "lines": [
          "Languages: Your droid can speak and understand all registered languages",
          "Size: Medium",
          "Speed: 25 ft."
        ]
      },
      {
        "name": "Class IV Droid",
        "summary": "Class IV droids, programmed for military and security purposes, are subcategorized as assassin droids, battle droids, gladiator droids, and security droids.",
        "hitDie": 8,
        "lines": [
          "Languages: Your droid can speak, read, and write Galactic Basic and one language of your choice. It can understand spoken and written Binary, but can not speak it.",
          "Size: Medium",
          "Speed: 30 ft.",
          "Armored: Your droid has proficiency in light armor. If it would already have proficiency in light armor, it instead has proficiency in medium armor. If it would already have proficiency in light and medium armor, it instead has proficiency in heavy armor. If it would already have proficiency in all armor, it instead has proficiency in a skill or tool of your choice."
        ]
      },
      {
        "name": "Class V Droid",
        "summary": "Class V droids, programmed for menial and low-skill tasks, are subcategorized as construction droids, lifting droids, mining droids, sanitation droids, and transportation droids.",
        "hitDie": 8,
        "lines": [
          "Skills: Athletics",
          "Tools: One set of artisan's implements",
          "Languages: Your droid can speak, read, and write Binary. It can understand spoken and written Galactic Basic and one language of your choice, but can not speak it.",
          "Size: Medium",
          "Speed: 30 ft."
        ]
      }
    ],
    "traits": [
      {
        "name": "Alarm Protocol",
        "text": "You install an alarm module in your companion, granting it the following benefits:\nYour companion gains a +5 bonus to initiative.\nYou and your companion can't be surprised while your companion is conscious."
      },
      {
        "name": "Analysis Protocol",
        "text": "Prerequisite: 9th level, Class I Droid\nYour companion can analyze a target, develop a plan on how to best overcome any potential obstacle, and execute that plan with ruthless efficiency. As a bonus action on your companion's turn, your companion can analyze a target it can see within 60 feet of it. For the next minute, or until it analyzes another target, it gains the following benefits:\nWhen it analyzes a hostile creature, its attack and damage rolls made with weapons with the finesse property or blaster weapons against that target may use its Intelligence modifier instead of Strength or Dexterity.\nWhen it analyzes a friendly creature, the target can end your companion's Analysis Protocol on them (no action required) to add half your companion's Intelligence modifier (rounded down, minimum of +1) to one attack roll, ability check, or saving throw. Once a friendly creature has benefited from this ability, they can not do so again until they complete a short or long rest."
      },
      {
        "name": "Arm Cannons",
        "text": "You install dual arm cannons in your companion. The arm cannons have 2 charges. As an action, your companion can use charges to cast the *overload* tech power, using 1 charge per level. The saving throw is made against your companion's tech save DC (8 + your companion's proficiency bonus + your companion's Intelligence modifier).\nYou can choose this trait multiple times. Each time you do so, the arm cannons gain another charge, to a maximum of 4. The arm cannons regain all charges after a long rest."
      },
      {
        "name": "Back-Up Protocol",
        "text": "You install an emergency protocol in your companion, prompting a quick reboot after critical damage is taken. If your companion would be reduced to 0 hit points, it instead is reduced to 1.\nOnce your companion uses this feature, it must finish a long rest before it can use it again."
      },
      {
        "name": "Celerity Augment",
        "text": "You augment your companion to move a little faster. Your companion's speed increases by 10 feet."
      },
      {
        "name": "Charisma Chip",
        "text": "Prerequisite: Class III Droid\nYou install a charisma chip in your companion. When an ally your companion can see makes an ability check, attack roll, or saving throw, your companion can use its reaction to give them advantage on the roll. It can do so before or after they roll the d20, but before the GM says the roll succeeds or fails. Once your companion uses this ability, it can't use it again until it finishes a short or long rest."
      },
      {
        "name": "Darkvision Optics",
        "text": "Your companion has darkvision to a range of 60 feet. If your companion already has darkvision, this trait increases its range by 30 feet."
      },
      {
        "name": "Durability Module",
        "text": "You enhance your companion's durability, granting the following benefits:\nWhen your companion rolls a Hit Die to regain hit points, the minimum number of hit points your companion can regain from the roll equals twice your companion's Constitution modifier (minimum of 2).\nYour companion's hit point maximum increases by an amount equal to twice its level when you install this protocol. Whenever your companion gains a level thereafter, its hit point maximum increases by an additional 2 hit points."
      },
      {
        "name": "Emergency Mode",
        "text": "Prerequisite: Back-Up Protocol\nYou modify your companion's back-up protocol. When your companion's back-up protocol is initiated, it can use its reaction to make one attack roll against a target within range. If the target is the source of the damage that reduced your companion to 0, the attack roll has advantage."
      },
      {
        "name": "Energy Shield",
        "text": "You install an energy shield in your companion, which has 1 charge. As an action, your companion can use 1 charge to cast the *energy shield* tech power.\nYou can choose this trait multiple times. Each time you do so, the energy shield gains another charge, to a maximum of 3. The energy shield regains all expended charges after a long rest."
      },
      {
        "name": "False Combustion",
        "text": "Prerequisite: Class II Droid\nAs a reaction in response to taking damage, your companion can feign an explosion. For 1 minute, it appears to be destroyed to all outward inspection. A creature can use its action to inspect your companion and make an Intelligence (Investigation) check (DC = 8 + your companion's proficiency bonus + your companion's Intelligence modifier). If it succeeds, it becomes aware that your companion still functions."
      },
      {
        "name": "Fighting Style Protocol",
        "text": "Your companion adopts a particular style of fighting as its specialty. Choose one of the Fighting Style options, detailed in chapter 6 of the Player's Handbook. Your companion can't take a Fighting Style option more than once, even if it later gets to choose again."
      },
      {
        "name": "Flamethrower",
        "text": "You install a flamethrower in your companion. The flamethrower has 1 charge. As an action, your companion can cast the *jet of flame* tech power, though it does not scale with higher levels, or use 1 charge to cast the *flame sweep* tech power at 1st level. The saving throw is made against your companion's tech save DC (8 + your companion's proficiency bonus + your companion's Intelligence modifier).\nYou can choose this trait multiple times. Each time you do so, the flamethrower gains another charge, to a maximum of 3. If the flamethrower has multiple charges, you can use multiple charges to cast *flame sweep* at a higher level, 1 point per charge. The flamethrower regains all expended charges after a long rest."
      },
      {
        "name": "Four-Armed Combatant",
        "text": "Prerequisite: Class IV Droid\nYou install two additional arms to improve your companion's combat capabilities, granting it four arms which it can use independently of one another. Your companion can only gain the benefit of items held by two of its arms at any given time, and once per round your companion can switch which arms it is benefiting from (no action required).\nWhile your companion has at least 3 arms free, it has a climbing speed equal to its walking speed."
      },
      {
        "name": "Heavy Plating",
        "text": "Prerequisite: Proficiency with medium armor\nYour companion gains proficiency in heavy armor. If your companion is already proficient in heavy armor, instead critical hits are treated as normal hits against it while heavy armor is integrated."
      },
      {
        "name": "Interface Protocol",
        "text": "Your companion becomes a valid target for the *tracker droid interface* tech power."
      },
      {
        "name": "Light Plating",
        "text": "Your companion gains proficiency in light armor. If your companion is already proficient in light armor, instead your companion's speed increases by 5 feet while light armor is integrated."
      },
      {
        "name": "Martial Protocol",
        "text": "Prerequisite: 9th level, Class IV Droid\nYour companion has martial training that allows it to perform special combat maneuvers. It gains the following benefits:\nIt learns two maneuvers of your choice from among those available to the fighter class. If a maneuver it uses requires its target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your companion's proficiency bonus + your companion's Strength or Dexterity modifier (your choice).\nYour companion has two superiority dice, which are d4s. These dice are used to fuel its maneuvers. A superiority die is expended when your companion uses it. It regain all of its expended superiority dice when it finishes a short or long rest."
      },
      {
        "name": "Medium Plating",
        "text": "Prerequisite: Proficiency with light armor\nYour companion gains proficiency in medium armor. If your companion is already proficient in medium armor, the maximum Dexterity bonus your companion can add to AC increases to 3 from 2 while medium armor is integrated."
      },
      {
        "name": "Memory Protocol",
        "text": "Prerequisite: Class I Droid\nYour companion can recall anything it has read in the past month that it understood. This includes but is not limited to books, maps, signs, and lists."
      },
      {
        "name": "Observant Protocol",
        "text": "Prerequisite: Alarm Protocol\nYou modify the alarm module in your companion, granting the following benefits:\nIf your companion can see a creature's mouth while it is speaking a language it understands, your companion can interpret what it's saying by reading its lips.\nYour companion is considered to have advantage when determining its passive Wisdom (Perception) and passive Intelligence (Investigation) scores."
      },
      {
        "name": "Performance Protocol",
        "text": "Prerequisite: 9th level, Class III Droid\nYou modify your companion's charisma chip, granting the following benefits:\nYour companion has advantage on Charisma (Performance) checks.\nYour companion can also use its bonus action to motivate an ally within 30 feet of it. Until the start of your companion's next turn, the ally can add the droid's Charisma modifier (minimum of +1) to the first attack roll, ability check, or saving throw they make. Your companion can use this feature a number of time equal to its Charisma modifier, and it regains all expended uses after it completes a long rest."
      },
      {
        "name": "Powerful Droid",
        "text": "Prerequisite: Class V Droid\nYour companion's carrying capacity and the weight it can push, drag, or lift doubles. If it would already double, it instead triples."
      },
      {
        "name": "Power Core",
        "text": "Your companion's hit points increase by an amount equal to its level + 1 and its Hit Die increases by one step (from d6 to d8, d8 to d10, or d10 to d12).\nYou can choose this trait multiple times."
      },
      {
        "name": "Powerful Grip",
        "text": "Prerequisite: 9th level, Class V Droid\nWhen your companion hits a creature with a melee weapon attack on its turn and has a free hand, it can use a bonus action to attempt to grapple the target. If it does so, and the grapple succeeds, your companion can make one additional attack against the target (no action required)."
      },
      {
        "name": "Proficiency Protocol",
        "text": "You install a protocol in your companion that grants it proficiency in a skill or tool. Your companion gains proficiency in a skill or tool of your choice.\nYou can choose this trait multiple times."
      },
      {
        "name": "Rapid Reconstructor",
        "text": "Prerequisite 5th level\nYour companion can control and focus its healing. As a bonus action, it can choose to spend one of its Hit Dice to recover hit points."
      },
      {
        "name": "Repulsor Coil",
        "text": "Prerequisite: 9th level, Class II Droid\nYour companion has a flying speed equal to its walking speed. While medium or heavy armor is integrated, its flying speed is reduced by half."
      },
      {
        "name": "Sensor Augmentation",
        "text": "You augment your companion with an advanced sensor, granting the following benefits:\nYour companion has advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\nYour companion has advantage on saving throws made to avoid or resist traps.\nYour companion has resistance to the damage dealt by traps.\nYour companion can search for traps while traveling at a normal pace, instead of only at a slow pace."
      },
      {
        "name": "Shard Modification",
        "text": "You specially modify your companion to house a shard. Shards are sentient crystals native to the planet Orax, roughly a foot in length, that communicate with each other through pulses of light. While inhabiting a specialized droid host, shards are able to overcome the droid’s inability to wield the Force, granting the following benefits:\nYour companion loses the Force Insensitive trait.\nYour companion can cast the *sense force* force power once per day. Wisdom or Charisma (your choice) is your companion's forcecasting ability for this power."
      },
      {
        "name": "Stun Ray",
        "text": "You install a stun ray in your companion. The stun ray has 1 charge. As an action, your companion can use 1 charge to cast the *hold droid* or *paralyze humanoid* tech power. The saving throw is made against your companion's tech save DC (8 + your companion's proficiency bonus + your companion's Intelligence modifier).\nYou can choose this trait multiple times. Each time you do so, the stun ray gains another charge, to a maximum of 3. The stun ray regains all expended charges after a long rest."
      },
      {
        "name": "Techcasting Protocol",
        "text": "Your companion learns one at-will tech power and one 1st-level tech power, which it can cast at its lowest level once per long rest. Your companion's techcasting ability is Intelligence. At-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level."
      },
      {
        "name": "Techcasting Protocol Mark II",
        "text": "Prerequisite: Techcasting Protocol\nYour companion learns one 2nd-level tech power of your choice, and once per long rest it can cast it at 2nd-level without expending tech points. Your companion's techcasting ability is Intelligence."
      },
      {
        "name": "Toughness Module",
        "text": "Prerequisite: Durability Module\nYou modify the durability module in your companion, granting the following benefit:\nWhenever your companion takes the Dodge action in combat, it can spend one Hit Die to heal itself. Roll the die, add its Constitution modifier, and it regains a number of hit points equal to the total (minimum of one)."
      },
      {
        "name": "Truesight Optics",
        "text": "Prerequisite: 13th level\nPrerequisite: Darkvision Optics\nYour companion can see through illusions and detect invisibility within 30 feet, as with truesight."
      }
    ]
  },
  {
    "nature": "Humanoid",
    "prerequisite": "Proficiency in Intimidation or Persuasion",
    "summary": "Your humanoid takes a form and size of your choosing. Your humanoid's size determines its features. Once you've chosen the size of your humanoid, you assign your humanoid's ability scores using standard array (16, 14, 14, 12, 10, 8) as you see fit.",
    "commonLines": [
      "Languages: Humanoids can speak, read, and write Galactic Basic and one language of your choice. If your humanoid takes the form of a species that can't speak Galactic Basic, you choose whether or not your humanoid can speak it.",
      "Type: Humanoid",
      "Armor Class: Your humanoid's armor class equals 10 + its Dexterity modifier.",
      "Attitude: The humanoid obeys your commands as best it can. It acts on your turn, and you determine its actions, decisions, attitudes, and so on. If you are incapacitated or absent, your humanoid acts on its own."
    ],
    "variantLabel": "Size",
    "variants": [
      {
        "name": "Tiny Humanoid",
        "summary": "Tiny humanoids are comprised of diminutive species such as anzellan or patitites.",
        "hitDie": 4,
        "lines": [
          "Tools: One of your choice.",
          "Size: Tiny",
          "Speed: 20 ft.",
          "Pintsized: Your humanoid's tiny stature makes it hard for it to wield bigger weapons. Your humanoid can't use medium or heavy shields. Additionally, it can't wield weapons with the two-handed or versatile property, and it can only wield one-handed weapons in two hands unless they have the light property.",
          "Puny: Your humanoid is too small to pack much of a punch. It has disadvantage on Strength saving throws, and when determining its bonus to attack and damage rolls for weapon attacks using Strength, it can't add more than +3.",
          "Small and Nimble: Your humanoid is too small and fast to effectively target. It has a +1 bonus to AC, and it has advantage on Dexterity saving throws."
        ]
      },
      {
        "name": "Small Humanoid",
        "summary": "Small humanoids are comprised of shorter species such as ewoks or jawas.",
        "hitDie": 6,
        "lines": [
          "Skills: One of your choice",
          "Tools: One specialist's kit of your choice",
          "Size: Small",
          "Speed: 25 ft.",
          "Undersized: Your humanoid's small stature makes it hard for it to wield bigger weapons. Your humanoid can't use heavy shields. Additionally, it can't use martial weapons with the two-handed property unless it also has the light property, and if a martial weapon has the versatile property, your humanoid can only wield it in two hands."
        ]
      },
      {
        "name": "Medium Humanoid",
        "summary": "Medium humanoids are the most common seen in the galaxy.",
        "hitDie": 8,
        "lines": [
          "Size: Medium",
          "Speed: 30 ft.",
          "Armored: Your humanoid has proficiency in light armor. If it would already have proficiency in light armor, it instead has proficiency in medium armor. If it would already have proficiency in light and medium armor, it instead has proficiency in heavy armor. If it would already have proficiency in all armor, it instead has proficiency in a skill or tool of your choice."
        ]
      }
    ],
    "traits": [
      {
        "name": "Adaptive Resilience",
        "text": "Your companion has advantage on Strength and Constitution saving throws against tech powers."
      },
      {
        "name": "Aggressive",
        "text": "As a bonus action, your companion can move up to its speed toward an enemy of its choice that it can see or hear. Your companion must end this move closer to the enemy than it started."
      },
      {
        "name": "Alert",
        "text": "Always on the lookout for danger, your companion gains the following benefits:\nYour companion gains a +5 bonus to initiative.\nYou and your companion can't be surprised while your companion is conscious."
      },
      {
        "name": "Athlete",
        "text": "Your companion has undergone extensive physical training to gain the following benefits:\nWhen your companion is prone, standing up uses only 5 feet of its movement.\nClimbing doesn't halve your companion's speed.\nYour companion can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet."
      },
      {
        "name": "Amphibious",
        "text": "Your companion can breathe air and water."
      },
      {
        "name": "Cannibalize",
        "text": "If your companion spends at least 1 minute devouring the corpse of a beast or humanoid, it gains temporary hit points equal to its Constitution modifier. Once you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "name": "Closed Mind",
        "text": "Your companion has advantage on Wisdom and Charisma saving throws against force powers."
      },
      {
        "name": "Darkvision",
        "text": "Your companion has a keen eyesight, especially in the dark. It can see in dim light within 60 feet of it as if it were bright light, and in darkness as if it were dim light. It can't discern color in darkness, only shades of gray."
      },
      {
        "name": "Defensive Ball",
        "text": "Your companion is able to curl into a rolling ball for extra protection. When it takes the Dash action while it isn't wielding a shield, it gains a bonus to AC equal to half its proficiency bonus (rounded up) until the start of its next turn."
      },
      {
        "name": "Defiant",
        "text": "When your companion or a creature it can see that can see and understand it makes an ability check, attack roll, or saving throw, your companion can roll a d4 and add it to their roll (no action required). It can use this before or after the roll, but before the GM determines the roll's outcome. Once your companion has used this feature, it must complete a short or long rest before it can use it again."
      },
      {
        "name": "Dungeon Delver",
        "text": "Alert to the hidden traps and secret doors found in many dungeons, your companion gains the following benefits:\nYour companion has advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\nYour companion has advantage on saving throws made to avoid or resist traps.\nYour companion has resistance to the damage dealt by traps.\nYour companion can search for traps while traveling at a normal pace, instead of only at a slow pace."
      },
      {
        "name": "Durable",
        "text": "Hardy and resilient, your companion gains the following benefits:\nWhen your companion rolls a Hit Die to regain hit points, the minimum number of hit points your companion can regain from the roll equals twice your companion's Constitution modifier (minimum of 2).\nYour companion's hit point maximum increases by an amount equal to twice its level when it chooses this trait. Whenever your companion gains a level thereafter, its hit point maximum increases by an additional 2 hit points."
      },
      {
        "name": "Enthralling Pheromones",
        "text": "Your companion can use its pheromones to influence individuals of both sexes. Whenever your companion rolls a 1 on a Charisma (Persuasion) check, it can reroll the die and must use the new roll. Additionally, once per short or long rest, your companion can treat a d20 roll of 9 or lower on a Charisma check as a 10. This feature has no effect on droids or constructs."
      },
      {
        "name": "Fighting Style",
        "text": "Your companion adopts a particular style of fighting as its specialty. Choose one of the Fighting Style options, detailed in chapter 6 of the Player's Handbook. Your companion can't take a Fighting Style option more than once, even if it later gets to choose again."
      },
      {
        "name": "Flight",
        "text": "Prerequisite 9th level\nYour companion has a flying speed equal to its walking speed. While wearing medium or heavy armor, its flying speed is reduced by half."
      },
      {
        "name": "Force Adept",
        "text": "Prerequisite: Force Sensitive\nYour companion knows one 2nd-level force power of your choice, and once per long rest it can cast it at 2nd-level without expending force points. Your companion's forcecasting ability is Wisdom or Charisma (depending on power alignment)."
      },
      {
        "name": "Force Contention",
        "text": "Your companion has advantage on Strength and Constitution saving throws against force powers."
      },
      {
        "name": "Force-Sensitive",
        "text": "Your companion one at-will force power and one 1st-level force power, which it can cast at its lowest level once per long rest. Your companion's forcecasting ability is Wisdom or Charisma (depending on power alignment). At-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead scale at 11th level, and if they would scale at 11th level, they instead scale at 17th level."
      },
      {
        "name": "Four-Armed",
        "text": "Your companion has four arms which it can use independently of one another. It can only gain the benefit of items held by two of its arms at any given time, and once per round it can switch which arms it is benefiting from (no action required)."
      },
      {
        "name": "Grovel, Cower, and Beg",
        "text": "Prerequisite 5th level\nAs an action on its turn, your companion can cower pathetically to distract nearby foes. Until the end of its next turn, your companion's allies gain advantage on attack rolls against enemies within 10 feet of it that can see it.\nOnce your companion has used this trait, it can't use it again until it finishes a short or long rest."
      },
      {
        "name": "Hardy Cleverness",
        "text": "Your companion has advantage on Wisdom and Charisma saving throws against tech powers."
      },
      {
        "name": "Heavily Armored",
        "text": "Prerequisite: Proficiency with medium armor\nYour companion gains proficiency in heavy armor. If your companion is already proficient in heavy armor, instead critical hits are treated as normal hits against it."
      },
      {
        "name": "Hidden Step",
        "text": "As a bonus action, your companion can turn invisible until the start of its next turn or until it attacks, makes a damage roll, or forces someone to make a saving throw.\nOnce your companion has used this trait, it can't use it again until you finish a short or long rest."
      },
      {
        "name": "Hide",
        "text": "Your companion has a thick hide. When it isn't wearing armor, its AC is 13 + its Dexterity modifier."
      },
      {
        "name": "Keen Hearing",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on hearing."
      },
      {
        "name": "Keen Sight",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Keen Smell",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Lightly Armored",
        "text": "Your companion gains proficiency in light armor. If your companion is already proficient in light armor, instead your companion's speed increases by 5 feet while light armor is integrated."
      },
      {
        "name": "Linguist",
        "text": "Your companion has studied languages and codes, gaining the following benefits:\nYour companion learns three languages of its choice.\nYour companion can can ably create written ciphers. Others can't decipher a code it creates unless it teaches them, they succeed on an Intelligence check (DC = your Intelligence score + your proficiency bonus), or they use a power to decipher it."
      },
      {
        "name": "Mobile",
        "text": "Your companion's speed increases by 10 feet."
      },
      {
        "name": "Moderately Armored",
        "text": "Prerequisite: Proficiency with light armor\nYour companion gains proficiency in medium armor. If your companion is already proficient in medium armor, the maximum Dexterity bonus your companion can add to AC increases to 3 from 2 while medium armor is integrated."
      },
      {
        "name": "Naturally Stealthy",
        "text": "Your companion can attempt to hide even when it is obscured only by a creature that is its size or larger than it."
      },
      {
        "name": "Nimble Agility",
        "text": "Your companion reflexes and agility allow it to move with a burst of speed. When your companion moves on its turn in combat, it can double its speed until the end of the turn. Once your companion has used this trait, it can't use it again until it moves 0 feet on one of its turns."
      },
      {
        "name": "Nimble Reflexes",
        "text": "Your companion has advantage on Dexterity and Intelligence saving throws against force powers."
      },
      {
        "name": "Nimbleness",
        "text": "Your companion can move through the space of any creature that is of a size larger than it."
      },
      {
        "name": "Observant",
        "text": "Prerequisite: Alert\nQuick to notice details of its environment, your companion gains the following benefits:\nIf your companion can see a creature's mouth while it is speaking a language it understands, your companion can interpret what it's saying by reading its lips.\nYour companion is considered to have advantage when determining its passive Wisdom (Perception) and passive Intelligence (Investigation) scores."
      },
      {
        "name": "Powerful Build",
        "text": "Your companion's carrying capacity and the weight it can push, drag, or lift doubles. If it would already double, it instead triples."
      },
      {
        "name": "Proficient",
        "text": "Your companion gains proficiency in one skill or tool of its choice."
      },
      {
        "name": "Rapid Regeneration",
        "text": "Prerequisite 5th level\nYour companion can control and focus its healing. As a bonus action, it can choose to spend one of its Hit Dice to recover hit points."
      },
      {
        "name": "Regenerative",
        "text": "Prerequisite 5th level\nWhen your companion takes damage, it can use its reaction and expend a Hit Die to regain hit points as long as the damage would not reduce its hit points to 0."
      },
      {
        "name": "Second Heart",
        "text": "Prerequisite 5th level\nWhen your companion is reduced to 0 hit points but not killed outright, it can drop to 1 hit point instead. It can't use this feature again until it finishes a long rest."
      },
      {
        "name": "Strong-Legged",
        "text": "When your companion makes a long jump, it can cover a number of feet up to twice its Strength score. When it makes a high jump, it can leap a number of feet up into the air equal to 3 + twice its Strength modifier."
      },
      {
        "name": "Tech Resistance",
        "text": "Your companion has advantage on Dexterity and Intelligence saving throws against tech powers."
      },
      {
        "name": "Unarmed Combatant",
        "text": "Your companion's unarmed strikes deal 1d4 kinetic damage. It can use your choice of your Strength or Dexterity modifier for the attack and damage rolls. It must use the same modifier for both rolls."
      },
      {
        "name": "Savage Attacks",
        "text": "When your companion scores a critical hit with a melee weapon attack, it can roll one of the weapon’s damage dice one additional time and add it to the extra damage of the critical hit."
      },
      {
        "name": "Savage Shorty",
        "text": "Prerequisite: Strength 13, size Small\nDespite being short of stature, your companion's size has no impact on its strength and virility. Your companion gains the following benefits:\nYour companion's speed increases by 5 feet\nYour companion loses the Undersized trait."
      },
      {
        "name": "Tech Adept",
        "text": "Prerequisite: Tech Dabbler\nYour companion learns one 2nd-level tech power of your choice, and once per long rest it can cast it at 2nd-level without expending tech points. Your companion's techcasting ability is Intelligence. Your companion requires use of a wristpad for this power."
      },
      {
        "name": "Tech Dabbler",
        "text": "Your companion learns one at-will tech power and one 1st-level tech power, which it can cast at its lowest level once per long rest. Your companion's techcasting ability is Intelligence. Your companion requires use of a wristpad for these powers. At-will powers chosen by your companion do not scale normally at higher levels. Instead, if they would scale at 5th level, they instead\nscale at 11th level, and if they would scale at 11th level, they instead scale at 17th level."
      },
      {
        "name": "Tiny Terror",
        "text": "Prerequisite: Strength 13, size Tiny\nDespite falling below knee height of other species, your companion's size has less impact on its strength and virility. Your companion gains the following benefits:\nYour companion's speed increases by 5 feet\nYour companion loses the Pintsized trait, and it is no longer limited to +3 when determining its bonus to attack and damage rolls for weapon attacks using Strength due to the Puny trait.\nYour companion gains the Undersized trait: *Undersized.* Your companion's small stature makes it hard for it to wield bigger weapons. It can't use heavy shields or martial weapons with the two-handed property unless it has the light property, and if a martial weapon has the versatile property, your companion can only wield it in two hands."
      },
      {
        "name": "Tough",
        "text": "Prerequisite: Durable\nYour companion has the blood of heroes flowing through its veins. Your companion gain the following benefits:\nWhenever your companion takes the Dodge action in combat, it can spend one Hit Die to heal itself. Roll the die, add its Constitution modifier, and it regains a number of hit points equal to the total (minimum of one)."
      },
      {
        "name": "Trance",
        "text": "Your companion only needs 3 hours of sleep during a long rest to gain its benefits, instead of 6. Additionally, if your companion's long rest would be interrupted, it only needs to complete the long rest instead of restarting it to gain its benefits."
      },
      {
        "name": "Weapon Expert",
        "text": "Your companion gains proficiency with all blasters, lightweapons, and vibroweapons. If your companion is already proficient with all blasters, lightweapons or vibroweapons, instead once per turn when it rolls damage for a weapon attack using a weapon from a category in which it is proficient with all weapons, it can reroll the weapon's damage dice and use either total."
      }
    ]
  },
  {
    "nature": "Tracker Droid",
    "prerequisite": "The ability to cast tech powers",
    "summary": "Your tracker droid takes a form of your choosing. Once you've selected your tracker droid's appearance, you assign your tracker droid's ability scores using a standard array (16, 14, 12, 10, 8, 6) as you see fit.",
    "commonLines": [
      "Droid Resistances: Your tracker droid is resistant to necrotic, poison, and psychic damage, and immune to poison and disease.",
      "Droid Vulnerabilities: Your tracker droid is vulnerable to ion damage. Additionally, your tracker droid has disadvantage on saving throws against effects that would deal ion or lightning damage.",
      "Skills: Two of your choice",
      "Tools: One of your choice, which comes integrated into the droid",
      "Languages: Tracker droids can speak, read, and write Binary. They can understand spoken and written Galactic Basic and one language of your choice, but can not speak it.",
      "Size: Tiny",
      "Speed: 20 feet",
      "Type: Droid",
      "Armor Class: Your tracker droid's armor class equals 10 + its Dexterity modifier. Your tracker droid can't wear armor or have it integrated.",
      "Droid Systems: Your tracker droid does not need to eat or drink. Additionally, your tracker droid does not require a tech focus to cast tech powers, and it is a valid target of the *tracker droid interface* tech power.",
      "Droid Weaponry: Your tracker droid has an integrated shockprod with which it can make weapon attacks. This weapon can't be removed while your tracker droid is conscious. Your tracker droid's shockprod deals 1 lightning damage on a hit, and it has the finesse property.",
      "Force Insensitive: Your tracker droid can not use force powers or take levels in forcecasting classes.",
      "Maintenance Mode: Rather than sleep, your companion must spend 3 hours performing routine maintenance during a long rest to gain its benefits, during which it has disadvantage on Wisdom (Perception) checks. Additionally, if your companion's long rest would be interrupted, it only needs to complete the long rest instead of restarting it.",
      "Attitude: The tracker droid obeys your commands as best it can. It acts on your turn, and you determine its actions, decisions, attitudes, and so on. If you are incapacitated or absent, your tracker droid acts on its own."
    ],
    "variantLabel": "",
    "variants": [
      {
        "name": "Tracker Droid",
        "summary": "",
        "hitDie": 4,
        "lines": []
      }
    ],
    "traits": [
      {
        "name": "Aerial Travel Package",
        "text": "Your companion has a 30 foot flying speed, and opportunity attacks made against it have disadvantage."
      },
      {
        "name": "Camouflage Module",
        "text": "You install a camouflage module in your companion. Your companion can activate its camouflage module to become invisible. While it is invisible, anything it is carrying or wearing is also invisible. It becomes visible if it attacks, casts a power, takes a hostile action, or when it deactivates the module. Activating or deactivating the module requires an action.\nDeduct the time your companion is invisible, in increments of 1 minute, from the module's maximum duration of 2 hours. After 2 hours of use, the module ceases to function. For every uninterrupted period of 12 hours the module goes unused, it regains 1 hour of use."
      },
      {
        "name": "Darkvision Optics",
        "text": "Your companion has darkvision to a range of 60 feet. If your companion already has darkvision, this trait increases its range by 30 feet."
      },
      {
        "name": "Four-Armed Tracker",
        "text": "Prerequisite: Pintsized Arms or Undersized Arms\nYour companion gains two additional arms which they can use independently of one another. Your companion can only gain the benefit of items held by two of its arms at any given time, and once per round it can switch which arms it is benefiting from (no action required)."
      },
      {
        "name": "Heavy Plating",
        "text": "Your companion's armor class becomes 14."
      },
      {
        "name": "Interfaced Assistance Protocol",
        "text": "Prerequisite: 5th level\nWhile you are interfaced with your companion via the *tracker droid interface* tech power, whenever you have advantage on an ability check or attack roll granted by your companion taking the Help action, you can reroll one of the dice once."
      },
      {
        "name": "Interfaced Crafting Protocol",
        "text": "Prerequisite: 5th level\nWhile you are interfaced with your companion via the *tracker droid interface* tech power, whenever you make an ability check using artisan's implements with which you are proficient, you have advantage on the check. If you already have advantage, you can instead reroll one of the dice once."
      },
      {
        "name": "Interfaced Distraction Protocol",
        "text": "Prerequisite: 5th level\nWhile you are interfaced with your companion via the *tracker droid interface* tech power, when your companion is within 5 feet of a target, you do not provoke opportunity attacks when moving out of that creature's reach."
      },
      {
        "name": "Interfaced Healing Protocol",
        "text": "Prerequisite: 5th level\nWhile you are interfaced with your companion via the *tracker droid interface* tech power, when you restore hit points to a creature that is within 5 feet of your companion, you can roll the dice twice and take either total."
      },
      {
        "name": "Interfaced Tracking Protocol",
        "text": "Prerequisite: 5th level\nWhile you are interfaced with your companion via the *tracker droid interface* tech power, when you make a Wisdom (Survival) check to track a target, and your companion is also tracking that target, you gain advantage on the check. If you already have advantage, you can instead reroll one of the dice once."
      },
      {
        "name": "Keen Hearing",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on hearing."
      },
      {
        "name": "Keen Sight",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Keen Smell",
        "text": "Your companion has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Laser Cutter",
        "text": "Your companion can cut through 1-inch-thick glass at a rate of 3 inches per round."
      },
      {
        "name": "Light Plating",
        "text": "Your companion's armor class becomes 11 + its Dexterity modifier."
      },
      {
        "name": "Medium Plating",
        "text": "Your companion's armor class becomes 13 + its Dexterity modifier, to a maximum of +2."
      },
      {
        "name": "Pintsized Arms",
        "text": "Prerequisite: Size Tiny\nYour Tiny tracker droid gains two arms that struggle to wield bigger weapons. Your companion can't use medium or heavy shields. Additionally, your companion can't wield weapons with the two-handed or versatile property, and it can only wield one-handed weapons in two hands unless they have the light property."
      },
      {
        "name": "Proficiency Protocol",
        "text": "You install a protocol in your companion that grants it proficiency in a skill or tool of your choice."
      },
      {
        "name": "Ranged Interface Protocol",
        "text": "The range within which you can interact with your companion increases by 50 feet. This increases by an additional 50 feet at 5th level (100), 9th level (150), 13th level (200), 17th level (250), and 20th level (300)."
      },
      {
        "name": "Ranged Shockshot",
        "text": "Your companion gains a ranged shockshot. It has a normal range of 30 feet and a long range of 90 feet, and on a hit it deal lightning damage equal to its shockprod damage."
      },
      {
        "name": "Scomp Link",
        "text": "Prerequisite: 9th level\nYour companion gets an integrated scomp link which it can use to interface with computers. While interfaced, when you or your companion makes an Intelligence (slicer's kit) check, you can choose to reroll the check. You must use the new roll. You can wait until after you roll the d20 before deciding to use this feature, but you must decide before the GM says whether the check succeeds or fails."
      },
      {
        "name": "Sentry Dish",
        "text": "Your companion learns the *alarm* tech power. It can cast it once, without spending tech points, and it regains the ability to do so when it finishes a long rest. Intelligence is its techcasting ability for this power."
      },
      {
        "name": "Size: Small",
        "text": "Your companion's size is Small. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d6, its shockprod damage die becomes a d4, and it's walking speed increases to 25."
      },
      {
        "name": "Spider Legs",
        "text": "Your companion has a climbing speed equal to its walking speed. Additionally, your companion has advantage on Strength saving throws and Strength (Athletics) checks that involve climbing."
      },
      {
        "name": "Storage",
        "text": "Your companion comes with a hidden storage compartment which can store up to 1 lb. Finding this hidden compartment requires a DC 15 Investigation check."
      },
      {
        "name": "Techcasting Range Protocol",
        "text": "You can cast tech powers with a range of 5 feet or greater through your companion while interfaced with it, but your companion must be within 5 feet of the target of the power. This increases to 10 feet at 5th level, 20 feet at 9th level, 30 feet at 13th level, 60 feet at 17th level, and 120 feet at 20th level."
      },
      {
        "name": "Truesight Optics",
        "text": "Prerequisite: 13th level\nPrerequisite: Darkvision Optics\nYour companion can see through illusions and detect invisibility within 60 feet, as with truesight."
      },
      {
        "name": "Undersized Arms",
        "text": "Prerequisite: Size Small\nYour Small tracker droid gains two arms that struggle to wield bigger weapons. Your companion can't use heavy shields. Additionally, your companion can't use martial weapons with the two-handed property unless it also has the light property, and if a martial weapon has the versatile property, your companion can only wield it in two hands."
      }
    ]
  },
  {
    "nature": "Turret",
    "prerequisite": "Proficiency with artillerist's kit",
    "summary": "Your turret is a portable companion that you can upgrade over time. Your turret uses your Intelligence score, and its Charisma is 6. You assign your turret's Strength, Dexterity, Constitution, and Wisdom scores using a standard array (16, 14, 12, 8) as you see fit.",
    "commonLines": [
      "Turret Resistances: Your turret is resistant to necrotic, poison, and psychic damage, and immune to poison and disease.",
      "Turret Vulnerabilities: Your turret is vulnerable to ion damage. Additionally, your turret has disadvantage on saving throws against effects that would deal ion or lightning damage.",
      "Languages: Your turret does not understand any languages, and it cannot speak.",
      "Size: Small",
      "Speed: Your turret has two modes: undeployed and deployed. While undeployed, your turret's speed equals your own and it can take no actions. While deployed, your turret has a speed of 25 feet and can take actions. You can deploy or undeploy your turret at any time on your turn (no action required), but the effect doesn't occur until the start of your next turn.",
      "Type: Construct",
      "Armor Class: Your turret uses its Intelligence score for its Armor Class.",
      "Force Insensitive: Your turret can not use force powers or take levels in forcecasting classes.",
      "Integrated Weaponry: Your turret has an integrated vibroweapon and blaster with which it is proficient and can make weapon attacks. Neither weapon can be removed while your turret is not disabled. Your turret's vibroweapon deals 1d8 kinetic damage on a hit. Your turret's blaster has the ammunition (range 100/400) and reload 20 properties, and it deals 1d6 kinetic or energy damage on it a hit, depending on its loaded ammunition. It can use both slug cartridges and power cells for ammunition. Your turret can't reload itself. You can choose which weapon your turret uses each time it attacks (no action required).",
      "Turret Systems: Your turret does not need to eat or drink. Additionally, your turret does not require a tech focus to cast tech powers.",
      "Attitude: Your turret has a remote control, which you can use to direct it while within 120 feet of it (no action required). If you are incapacitated or absent, your turret takes no actions unless a trait says otherwise."
    ],
    "variantLabel": "",
    "variants": [
      {
        "name": "Turret",
        "summary": "",
        "hitDie": 6,
        "lines": []
      }
    ],
    "traits": [
      {
        "name": "Augmenting Barrier",
        "text": "Prerequisite: 5th level\nAs an action, you can reduce your companion's speed and have it create a barrier that surrounds in a radius depending on its size. A Small turret's speed is reduced to 10 feet and has a 5-foot radius, a Medium turret's speed is reduced to 5 feet and has a 10-foot radius, and a Large turret's speed is to reduce to 0 and has a 15-foot radius. While active, when damage is dealt by a tech power originating from inside the barrier against a target outside the barrier, that tech power gains a bonus to damage equal to half your Intelligence modifier (rounded up).\nThis barrier lasts for 1 minute. You can end it early as a bonus action on your turn. Once you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "name": "Autoreload",
        "text": "You can preload your companion's blaster with additional ammunition. You can preload two additional power cells, or you can replace each power cell with 20 slug cartridges. Once on each of your turns, you can reload your companion without using an action. Once you've expended the preloaded ammunition, you can't reload your companion's blaster in this way again until you reload it with an action."
      },
      {
        "name": "Climbing Turret",
        "text": "Your companion has a climbing speed equal to its walking speed, and it has advantage on Strength saving throws and Strength (Athletics) checks that involve climbing."
      },
      {
        "name": "Cloaking Barrier",
        "text": "Prerequisite: 5th level\nAs an action, you can reduce your companion's speed and have it create a barrier that surrounds in a radius depending on its size. A Small turret's speed is reduced to 10 feet and has a 5-foot radius, a Medium turret's speed is reduced to 5 feet and has a 10-foot radius, and a Large turret's speed is to reduce to 0 and has a 15-foot radius. While active, this barrier creates an area that is lightly obscured. Wisdom (Perception) checks that originate outside the barrier take a -10 penalty when attempting to detect anything inside the barrier.\nThis barrier lasts for 1 minute. You can end it early as a bonus action on your turn. Once you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "name": "Deployment Accelerator",
        "text": "Your companion now deploys and undeploys instantly, but you can only do so once on each of your turns."
      },
      {
        "name": "Disguised Turret",
        "text": "Your companion can collapse into an innocuous looking container while undeployed. You have advantage on Charisma (Deception) checks to hide the nature of your companion while it is undeployed."
      },
      {
        "name": "Fighting Style",
        "text": "Your companion adopts a particular style of fighting as its specialty. Choose one of the Fighting Style options, detailed in chapter 6 of the Player's Handbook. Your companion can't take a Fighting Style option more than once, even if it later gets to choose again."
      },
      {
        "name": "Hovering Turret",
        "text": "Your companion can hover 5 feet over the ground while deployed. It ignores difficult terrain while hovering in this way."
      },
      {
        "name": "Integrated Grenade Launcher",
        "text": "You integrate a grenade launcher into your companion.\nYou can choose this upgrade multiple times. Each time you do so, the weapon's reload number increases by 1."
      },
      {
        "name": "Integrated Projector",
        "text": "You integrate a vapor projector into your companion.\nYou can choose this upgrade multiple times. Each time you do so, the weapon's reload number increases by 1."
      },
      {
        "name": "Integrated Rocket Launcher",
        "text": "You integrate a rocket launcher into your companion.\nYou can choose this upgrade multiple times. Each time you do so, the weapon's reload number increases by 1."
      },
      {
        "name": "Modifiable Weaponry",
        "text": "You can replace your companion's integrated vibroweapon or blaster with a different weapon of the same type. The new weapon cannot be removed while your companion is not disabled.\nYou can choose this upgrade twice."
      },
      {
        "name": "Phalanx Barrier",
        "text": "Prerequisite: 5th level\nAs an action, you can reduce your companion's speed and have it create a barrier that surrounds in a radius depending on its size. A Small turret's speed is reduced to 10 feet and has a 5-foot radius, a Medium turret's speed is reduced to 5 feet and has a 10-foot radius, and a Large turret's speed is to reduce to 0 and has a 15-foot radius. While active, ranged weapon attacks originating from outside the barrier that pass through it have disadvantage. Ranged weapon attacks originating from inside the barrier are unaffected.\nThis barrier lasts for 1 minute. You can end it early as a bonus action on your turn. Once you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "name": "Ram Attachment",
        "text": "You integrate a battering ram into your companion. When your companion makes a Strength check to break down physical doors, it gains a bonus to the check, depending on its size. A Small turret gains a +2 bonus, a Medium turret gains a +3 bonus, and a Large turret gains a +5 bonus."
      },
      {
        "name": "Rejuvenating Barrier",
        "text": "Prerequisite: 5th level\nAs an action, you can reduce your companion's speed and have it create a barrier that surrounds in a radius depending on its size. A Small turret's speed is reduced to 10 feet and has a 5-foot radius, a Medium turret's speed is reduced to 5 feet and has a 10-foot radius, and a Large turret's speed is to reduce to 0 and has a 15-foot radius. While active, friendly creatures that enter this barrier for the first time or start their turn there regain hit points equal to your Intelligence modifier, and gain temporary hit points equal to your Intelligence modifier. This feature can restore a creature to no more than half of its hit point maximum.\nThis barrier lasts for 1 minute. You can end it early as a bonus action on your turn. Once you've used this feature, you must complete a short or long rest before you can use it again."
      },
      {
        "name": "Sentry",
        "text": "You add an overwatch suite to your companion. When you cast the *alarm* tech power, you can choose to have your companion notified when the alarm is triggered. If you do so, when the alarm is triggered, your companion immediately makes a number of weapon attacks against the triggering creature up to your companion's proficiency bonus. If multiple creatures trigger the alarm simultaneously, your companion targets each creature randomly."
      },
      {
        "name": "Size: Large",
        "text": "Prerequisite: Size: Medium\nYour companion's size is Large. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d10, its vibroweapon and blaster damages increase to 1d12 and 1d10, respectively, and its deployed walking speed decreases to 15 feet."
      },
      {
        "name": "Size: Medium",
        "text": "Your companion's size is Medium. Its hit points increase by an amount equal to its level + 1, its Hit Die becomes a d8, its vibroweapon and blaster damages increase to 1d10 and 1d8, respectively, and its deployed walking speed decreases to 20 feet."
      },
      {
        "name": "Suppressing Fire",
        "text": "Prerequisite: 13th level\nWhen a creature within 30 feet of you moves at least 5 feet, you can use your reaction to have your companion make a ranged weapon attack with its blaster against the creature. If the attack hits, the creature's speed is reduce by half until the start of your next turn."
      },
      {
        "name": "Turret Coverage",
        "text": "As an action, you can have your companion anchor itself to the ground or recover itself. While anchored, its speed is reduce to 0, it has resistance to energy and kinetic damage, and it provides cover to creatures within 5 feet of it, depending on its size. A Small turret provides one-quarter cover, a Medium turret provides half cover, and a Large turret provides three-quarters cover. If an attack would miss a creature by an amount less than or equal to the bonus to AC granted by your companion's cover, and the attack would hit your companion, your companion instead takes the attack's damage."
      }
    ]
  }
];
