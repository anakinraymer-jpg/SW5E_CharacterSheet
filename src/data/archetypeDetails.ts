// PHB archetypes, sourced from sw5e.com. Nested sub-catalogs (modifications,
// discoveries, surge tables) are intentionally summarized rather than fully
// enumerated — see the linked archetype page on sw5e.com for the complete list.

import type { ArchetypeEntry } from "../types";

export const ARCHETYPES_CATALOG: ArchetypeEntry[] = [
  // ---- Guardian ----
  {
    name: "Makashi Form",
    className: "Guardian",
    features: [
      { name: "Form Basics", level: 3, text: "You gain the Makashi lightsaber form. If you already know it, choose another lightsaber form instead." },
      { name: "The Way of the Ysalamiri", level: 3, text: "Bonus action: enter an offensive stance for 1 minute, adding your Wisdom or Charisma modifier to the first melee attack and damage roll each turn. Ends early if incapacitated/die. Long rest to reuse." },
      { name: "Channel the Force: Makashi Riposte", level: 3, text: "Reaction to melee damage: expend a Channel the Force use to reduce the damage by 1d10 + Dexterity modifier + guardian level; if reduced to 0, make a melee attack as part of the reaction." },
      { name: "Force-Empowered Reflexes", level: 7, text: "You can take a second reaction each round." },
      { name: "Glancing Blow", level: 15, text: "Reaction to halve an attack's damage against you." },
      { name: "Master of Contention", level: 20, text: "Dexterity and Wisdom or Charisma scores increase by 2 (max +2). For 1 minute: resistance to and ignore resistance to kinetic/energy damage; melee attacks against you have disadvantage; your melee attacks deal an additional damage die. Long rest to reuse." },
    ],
  },
  {
    name: "Niman Form",
    className: "Guardian",
    features: [
      { name: "Form Basics", level: 3, text: "You gain the Niman lightsaber form. If you already know it, choose another lightsaber form instead." },
      { name: "The Way of the Rancor", level: 3, text: "Bonus action: enter a balanced stance for 1 minute, letting you melee attack when casting a force power, and use Wisdom or Charisma instead of Strength/Dexterity for melee attack and damage rolls. Long rest to reuse." },
      { name: "Channel the Force: Telekinetic Slash", level: 3, text: "When you damage with an at-will force power (attack or save), expend a Channel the Force use and force points for 1d8 additional damage per point, up to your Focused Strikes maximum." },
      { name: "Enlightenment", level: 7, text: "Reducing a hostile creature to 0 HP or healing an ally at 0 HP with a force power grants temporary force points equal to your Wisdom or Charisma modifier. Short/long rest to reuse." },
      { name: "Redirect", level: 15, text: "Reaction to redirect a Dexterity-save or attack-roll power targeting only you to another target within 30 feet. Short/long rest to reuse." },
      { name: "Master of Moderation", level: 20, text: "Dexterity and Wisdom or Charisma scores increase by 2 (max +2). For 1 minute: resistance to kinetic/energy from unenhanced weapons; advantage and resistance vs. force powers; an at-will universal power targeting one creature can also hit an adjacent target. Long rest to reuse." },
    ],
  },
  {
    name: "Shien/Djem So Form",
    className: "Guardian",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "You gain proficiency in heavy armor." },
      { name: "Form Basics", level: 3, text: "You gain your choice of the Shien or Djem So lightsaber form. If you already know it, choose another form instead." },
      { name: "The Way of the Krayt Dragon", level: 3, text: "Bonus action: threatening stance for 1 minute; first Strength melee hit each turn deals extra Strength-mod damage, redirectable to an adjacent creature. Long rest to reuse." },
      { name: "Channel the Force", level: 3, text: "Choose Blade Barrier (Shien: forgo Strength damage to reduce incoming energy/kinetic damage) or Falling Avalanche (Djem So: gain advantage on a Strength check/attack by halving speed)." },
      { name: "Determination", level: 7, text: "Choose Aggressive Negotiations (Shien: Intimidation/Persuasion proficiency, no disadvantage while wielding a proficient weapon) or Reliable Vigor (Djem So: use guardian level in place of a low Strength check/save result, 3 uses growing)." },
      { name: "Presence", level: 15, text: "Choose Precise Reflection (Shien: force points add damage to saber reflect hits) or Brutal Strikes (Djem So: Force-Empowered Strikes gain a minimum roll threshold and grant temp HP)." },
      { name: "Master of Perseverance", level: 20, text: "Strength and Constitution scores increase by 2 (max +2). For 1 minute: resistance to kinetic/energy from unenhanced weapons; free 1st-level Force-Empowered Strikes on Strength melee hits granting temp HP; reaction counter-attack with advantage. Long rest to reuse." },
    ],
  },
  {
    name: "Soresu Form",
    className: "Guardian",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "You gain proficiency in heavy armor." },
      { name: "Form Basics", level: 3, text: "You gain the Soresu lightsaber form. If you already know it, choose another lightsaber form instead." },
      { name: "The Way of the Mynock", level: 3, text: "Bonus action: defensive stance 1 minute, casting saber ward as part of the bonus action and each turn; gain special reactions equal to proficiency bonus usable only to cast saber reflect. Long rest to reuse." },
      { name: "Channel the Force: Advancing Defender", level: 3, text: "When you cast saber reflect, expend a Channel the Force use to move up to 10 feet as part of the reaction without provoking opportunity attacks." },
      { name: "Circle of Shelter", level: 7, text: "Reaction to ward yourself or a creature within 5 feet: roll 1d8 added to their AC against the triggering attack; if it still hits, they gain resistance to the damage. 3 uses, more at 9th/13th/17th level." },
      { name: "Stand Against the Tide", level: 15, text: "Reaction to force a creature that misses you with a melee attack to repeat the attack against another creature of your choice." },
      { name: "Master of Resilience", level: 20, text: "Constitution and Wisdom or Charisma scores increase by 2 (max +2). For 1 minute: resistance to kinetic/energy from unenhanced weapons; saber reflect can include a melee attack; advantage on Dexterity saves for you and allies within 30 feet. Long rest to reuse." },
    ],
  },

  // ---- Berserker ----
  {
    name: "Ballistic Approach",
    className: "Berserker",
    features: [
      { name: "Firestorm", level: 3, text: "Proficiency with martial blasters that have the burst or rapid property. While wielding a proficient blaster: use Strength or Dexterity for attack/damage within 30 feet; count as proficient with improvised blasters." },
      { name: "Explosive", level: 3, text: "While raging: blaster damage rolls gain a minimum roll threshold; add rage damage to Strength ranged attacks. At 9th level, add Brutal Critical dice when a target rolls a 1 on a save against your burst/rapid weapon." },
      { name: "Rampage", level: 6, text: "While raging, dealing Strength blaster damage lets you use a bonus action to move half your speed toward the target and melee attack if you end within 5 feet." },
      { name: "Down, Not Out", level: 10, text: "Reaction to make a blaster attack against a creature within 30 feet that hits you." },
      { name: "Brawn", level: 14, text: "Burst property applies rage damage to every target hit, and Large or smaller creatures that fail the burst/rapid save within 30 feet are knocked prone." },
    ],
  },
  {
    name: "Cyclone Approach",
    className: "Berserker",
    features: [
      { name: "Dual Wielder", level: 3, text: "Add your Strength or Dexterity modifier to Two-Weapon Fighting damage if it doesn't already apply." },
      { name: "Double Swing", level: 3, text: "Once per turn on a miss while raging, immediately make a melee attack with a weapon in your other hand." },
      { name: "Twisting Winds", level: 6, text: "Add your Strength or Dexterity modifier to saves/checks made to avoid being knocked prone, pushed, grappled, or restrained." },
      { name: "Mighty Leap", level: 10, text: "Jump distance doubled; no opportunity attacks when leaving a hostile creature's reach while jumping." },
      { name: "Tornado", level: 14, text: "Forgo one regular attack to instead attack every creature within 5 feet, separate rolls each; dual-wielded weapons both apply their damage dice on a hit. 5 uses, +1 at 17th level; regains on short/long rest." },
    ],
  },
  {
    name: "Juggernaut Approach",
    className: "Berserker",
    features: [
      { name: "Armored Brute", level: 3, text: "Proficiency in heavy armor; you can rage and gain rage benefits while wearing it." },
      { name: "Unstoppable Force", level: 3, text: "While raging, move through a hostile creature's space via a contested Athletics check; on success, ignore difficult terrain, push the creature 5 feet, and avoid opportunity attacks from it this turn." },
      { name: "Raging Bulwark", level: 6, text: "Reaction to move toward an ally targeted by a ranged attack/save and provide cover; you provide enhanced cover tiers to creatures your size or one size smaller." },
      { name: "Overwhelming Cleave", level: 10, text: "Pushing a creature into a surface/creature while raging deals kinetic damage equal to Rage Damage; first Strength melee hit each turn can also damage an adjacent creature." },
      { name: "Relentless Assault", level: 14, text: "Action: charge up to twice your speed in a line without opportunity attacks; creatures within 5 feet of the path save or take Strength mod + Rage Damage and are pushed; melee attack on a nearby creature at the end. Short/long rest to reuse." },
    ],
  },
  {
    name: "Marauder Approach",
    className: "Berserker",
    features: [
      { name: "Forcecasting", level: 3, text: "You derive force powers from primal instinct, learning universal powers via a dedicated Marauder Approach table (Force Powers Known/Force Points/Max Power Level, growing from level 3 to 20)." },
      { name: "Furious Force", level: 3, text: "You can cast force powers while raging (1-action casting time, no concentration, no heavy armor), adding rage damage to force power attack/save damage rolls; casting counts as attacking for maintaining rage." },
      { name: "Reckless Power", level: 6, text: "While raging, casting a force power with your action lets you make a melee weapon attack as a bonus action." },
      { name: "Powerful Presence", level: 10, text: "Bonus action battle cry: up to ten creatures within 60 feet — allies gain advantage on attacks/saves, enemies gain disadvantage, until your next turn. Long rest to reuse." },
      { name: "Force Storm", level: 14, text: "Action: end your rage early to force a 15-foot Dexterity save around you, dealing 1d12 force damage per round spent raging (half on success)." },
    ],
  },

  // ---- Consular ----
  {
    name: "Way of Balance",
    className: "Consular",
    features: [
      { name: "Force Barrier", level: 3, text: "Casting a 1st-level+ universal power creates a barrier lasting until your next long rest, with HP = twice your consular level + Wisdom or Charisma modifier, absorbing damage you'd take. At-will universal powers restore 1 barrier HP (up to half max). Long rest to recreate." },
      { name: "Projected Barrier", level: 6, text: "Reaction to have your Force Barrier absorb damage taken by a creature you can see within 30 feet." },
      { name: "At-Will Barrier", level: 10, text: "Casting an at-will universal power restores 1 barrier hit point (can't exceed half maximum)." },
      { name: "Improved Suppression", level: 14, text: "Add your proficiency bonus to ability checks required by powers like sever force or force suppression." },
      { name: "Force Resistance", level: 18, text: "Advantage on saving throws against force powers, and resistance to their damage." },
    ],
  },
  {
    name: "Way of Lightning",
    className: "Consular",
    features: [
      { name: "Shocking Affinity", level: 3, text: "Use Wisdom or Charisma for lightning-damage powers. You can convert a damage-dealing power (attack or save) to lightning damage; on a hit/failed save the target becomes shocked until your next turn. 2 uses, more at 5th/9th/13th/17th level." },
      { name: "Potent Lightning", level: 6, text: "Add your governing ability modifier (min +1) to lightning force power damage that doesn't already include it." },
      { name: "Blistering Rebuke", level: 10, text: "Reaction when a creature within 5 feet hits you: it makes a Dexterity save or takes 1d10 + consular level lightning damage, is pushed 10 feet, and becomes shocked. 4 uses, more at 13th/17th level." },
      { name: "Electric Attunement", level: 14, text: "Resistance to lightning damage; your force powers ignore resistance to lightning damage." },
      { name: "Unlimited Power", level: 18, text: "Deal maximum damage with a 1st-6th level lightning force power, a number of times equal to your proficiency bonus per long rest before you start taking true damage for additional uses." },
    ],
  },
  {
    name: "Way of Suggestion",
    className: "Consular",
    features: [
      { name: "Subtle Control", level: 3, text: "Action: a creature within 30 feet makes a Wisdom save or you alter a memory of a recent event. Detecting your Force use is harder for others (disadvantage, or a contested check needed even with sense force/force sight active)." },
      { name: "Out of Mind", level: 6, text: "Bonus action: a creature within 60 feet makes a Wisdom save or you become invisible to it for 1 minute or until you damage it. Short rest to reuse." },
      { name: "Delicate Potency", level: 10, text: "Treat cloud mind, dominate mind, mass coerce mind, or dominate monster as cast at your Max Power Level. 4 uses, more at 13th/17th level." },
      { name: "Delayed Effect", level: 14, text: "Delay a force power's effect up to half your consular level in rounds. Long rest to reuse." },
      { name: "Subtle Presence", level: 18, text: "Action: 10-minute focus granting your choice of Cloak of Fright, Cloak of Invisibility, or Cloak of Memory (each usable once, regaining on a long rest)." },
    ],
  },
  {
    name: "Way of the Sage",
    className: "Consular",
    features: [
      { name: "Disciple of Life", level: 3, text: "Use Wisdom or Charisma for healing powers. Healing powers of 1st level+ restore an extra 2 + the power's level in hit points." },
      { name: "Preserve Life", level: 6, text: "Action: channel 5 x consular level hit points of healing, divided among creatures within 30 feet, capped at half each creature's max HP; no effect on droids/constructs. 3 uses, more at 9th/13th/17th level." },
      { name: "Blessed Healer", level: 10, text: "Healing another creature with a force power also heals you for 2 + the power's level." },
      { name: "Blessed by the Force", level: 14, text: "Bonus action while below half HP: regain half your hit point maximum. Long rest to reuse." },
      { name: "Supreme Healing", level: 18, text: "Healing dice from your powers use their maximum value instead of being rolled." },
    ],
  },

  // ---- Engineer ----
  {
    name: "Armormech Engineering",
    className: "Engineer",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency in armormech's implements, medium armor, and heavy armor; crafting with armormech's implements is twice as fast." },
      { name: "Modified Armor", level: 3, text: "Modify one suit of armor or a shield into an enhanced, attuned item that also serves as your tech focus. It has 4+ modification slots (growing with level, see engineer table) to install modifications; excess installs beyond your proficiency bonus reduce your tech point max. At 9th level, maintain a modified armor and shield simultaneously. (Full modification list omitted — see sw5e.com.)" },
      { name: "Damage Absorption", level: 3, text: "Reaction + a Potent Aptitude use: reduce damage taken by the die rolled + Intelligence modifier, while wearing/wielding your modified gear." },
      { name: "Extra Attack", level: 6, text: "You can attack twice, instead of once, while wearing your modified armor or wielding your modified shield." },
      { name: "Armormech's Celerity", level: 14, text: "Taking the Attack action or casting a 1st-level+ tech power lets you make a weapon attack as a bonus action. 5 uses, +1 at 17th level; regains on long rest." },
      { name: "Suit Reliability", level: 18, text: "Strength, Dexterity, or Constitution checks and saves gain a minimum roll threshold while wearing/wielding your modified gear." },
    ],
  },
  {
    name: "Armstech Engineering",
    className: "Engineer",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency in armstech's implements, medium armor, martial blasters, and martial vibroweapons; crafting with armstech's implements is twice as fast." },
      { name: "Modified Weaponry", level: 3, text: "Modify one proficient weapon into an enhanced, attuned item that also serves as your tech focus, with 4+ modification slots growing with level; excess installs reduce your tech point max. At 9th level, maintain two modified weapons. (Full modification list omitted — see sw5e.com.)" },
      { name: "Close Call", level: 3, text: "Expend a Potent Aptitude use to reroll a missed attack with your modified weapon." },
      { name: "Armstech's Strike", level: 6, text: "Once per round, deal an extra 1d6 damage (same type) with your modified weapon, growing to 2d6 at 11th level and 3d6 at 17th." },
      { name: "Targeting Matrix", level: 14, text: "Convert an area-save tech power into a single attack roll with your modified weapon against one target; on a hit, they suffer the failed-save effect. 5 uses, +1 at 17th; regains on long rest." },
      { name: "Armstech's Salvo", level: 18, text: "Your Targeting Matrix can attack every target that would be affected by the power, separate rolls each." },
    ],
  },
  {
    name: "Gadgeteer Engineering",
    className: "Engineer",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency in gadgeteer's implements; crafting with them is twice as fast." },
      { name: "Gadgeteer Harness", level: 3, text: "Create a gadgeteer harness — an enhanced, attuned item that serves as your tech focus, with 4+ modification slots growing with level for attaching gadgets. (Full modification list omitted — see sw5e.com.)" },
      { name: "Projected Barrier", level: 3, text: "Bonus action + Potent Aptitude use: project an Environmental or Physical Barrier onto a friendly creature within 30 feet, absorbing chosen damage types until it drops to 0 HP." },
      { name: "Versatile Direction", level: 6, text: "You can take a second bonus action each round. 3 uses, more at 9th/13th/17th level; regains on long rest." },
      { name: "Reinforced Barriers", level: 14, text: "Casting a tech power can restore hit points to a barrier within 30 feet, up to its initial maximum." },
      { name: "Adaptive Barrier", level: 18, text: "Reaction to grant a barriered creature resistance (or immunity, if matching the barrier's damage type) to triggering damage; the barrier drops to 0 HP." },
    ],
  },
  {
    name: "Unstable Engineering",
    className: "Engineer",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency with your choice of artisan's implements; crafting with tinker's implements is twice as fast." },
      { name: "Modified Tinkercannon", level: 3, text: "Modify your tinker's implements into a tinkercannon. Casting a 1st-level+ tech power while wielding it risks an Unstable Engineering Surge on a roll of 1. You have 4+ overrides (growing with level) to reroll a surge, at the cost of reduced tech points if overused. (Full surge table omitted — see sw5e.com.)" },
      { name: "Unstable Volley", level: 3, text: "Bonus action + Potent Aptitude use: launch unstable energy at a surface within 30 feet (growing to 60/120 feet); it erupts for lightning damage (Dexterity save) after 1 minute or when detonated early. Damage grows with level." },
      { name: "Creative Destruction", level: 6, text: "Add your governing ability modifier (min +1) to tech power/class feature damage that doesn't already include it; doing so may trigger a Surge roll." },
      { name: "Experimental Overrides", level: 14, text: "When you use an override to reroll a Surge, you can choose either result." },
      { name: "Engineering Bombardment", level: 18, text: "Once per power/feature, if you roll the maximum on a damage die, you can roll it again and use both results." },
    ],
  },

  // ---- Fighter ----
  {
    name: "Assault Specialist",
    className: "Fighter",
    features: [
      { name: "Brute Force", level: 3, text: "+2 bonus to weapon attack damage rolls, increasing to +3 at 10th level and +4 at 16th." },
      { name: "Improved Critical", level: 3, text: "Your critical hit range with weapons increases by 1." },
      { name: "Remarkable Athlete", level: 7, text: "Add half your proficiency bonus to Strength, Dexterity, or Constitution checks that don't already include it." },
      { name: "Brutish Durability", level: 10, text: "Once per round, roll a d8 (growing to d10 at 13th, d12 at 17th) added to a saving throw; if it turns a death save total to 20+, you gain the benefit of rolling a natural 20." },
      { name: "Devastating Critical", level: 15, text: "A critical hit with a weapon attack gains bonus damage equal to your fighter level." },
      { name: "Survivor", level: 18, text: "At the start of each turn, regain 5 + Constitution modifier hit points if at half HP or below (not at 0)." },
    ],
  },
  {
    name: "Blademaster Specialist",
    className: "Fighter",
    features: [
      { name: "Unarmored Defense", level: 3, text: "While unarmored and shieldless, AC = 10 + Dexterity modifier + Strength modifier." },
      { name: "Adaptive Fighting", level: 3, text: "You have three effects — Change Up (swap Fighting Style), Draw (crit range +1 with drawn weapon this turn), Stow (Disengage when stowing a weapon). 2 uses, more at 5th/9th/13th/17th level." },
      { name: "Dervish", level: 7, text: "A critical hit with a melee weapon regains an expended use of Adaptive Fighting." },
      { name: "Resilient Fighting", level: 10, text: "Expending Adaptive Fighting grants resistance to energy and kinetic weapon damage until your next turn." },
      { name: "Adrenaline Rush", level: 15, text: "Using Action Surge grants an extra bonus action in addition to the extra action." },
      { name: "Bladestorm", level: 18, text: "Action: attack every creature within reach, separate rolls, each attack after the first gaining a cumulative +1 bonus (max +6); dual/double weapons also add the bonus to damage and allow a bonus-action Two-Weapon attack. Short/long rest to reuse." },
    ],
  },
  {
    name: "Shield Specialist",
    className: "Fighter",
    features: [
      { name: "Techcasting", level: 3, text: "You derive tech powers via your wristpad, learning them from a dedicated Shield Specialist table (Tech Powers Known/Tech Points/Max Power Level, growing from level 3 to 20). Intelligence is your techcasting ability." },
      { name: "Stay in Formation", level: 3, text: "Take the Guard action as a bonus action." },
      { name: "Rallying Cry", level: 7, text: "Using Second Wind heals up to three allies within 60 feet for your fighter level each; one more ally at 9th/13th/17th level." },
      { name: "Inspiring Surge", level: 10, text: "Using Action Surge lets one ally within 60 feet make a weapon attack with its reaction." },
      { name: "Bulwark", level: 15, text: "Using Indomitable to reroll an Intelligence, Wisdom, or Charisma save lets an ally who failed the same save also reroll." },
      { name: "Greater Inspiring Surge", level: 18, text: "Inspiring Surge can target two allies instead of one." },
    ],
  },
  {
    name: "Tactical Specialist",
    className: "Fighter",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency with your choice of artisan's implements." },
      { name: "Improved Combat Superiority", level: 3, text: "You know four maneuvers (instead of two) and have four superiority dice (instead of two), both growing faster per a dedicated Tactical Superiority table." },
      { name: "Maneuver Versatility", level: 3, text: "You can use each maneuver twice per turn; two known maneuvers count as general maneuvers, with more swappable at 5th/9th/13th/17th level." },
      { name: "Know Your Enemy", level: 7, text: "After observing/interacting with a creature for 1 minute, the GM tells you if it's your equal, superior, or inferior in two chosen traits (ability scores, AC, HP, class levels)." },
      { name: "Maneuver Adept", level: 10, text: "Once per turn, your superiority dice rolls gain a minimum roll threshold." },
      { name: "Relentless", level: 15, text: "Rolling initiative with no superiority dice left regains 1 die." },
      { name: "Maneuver Mastery", level: 18, text: "Once per round, choose the maximum instead of rolling a superiority die." },
    ],
  },

  // ---- Monk ----
  {
    name: "Crimson Order",
    className: "Monk",
    features: [
      { name: "Crimson Armaments", level: 3, text: "Proficiency in light and medium armor (or heavy armor if already proficient); Martial Arts and Unarmored Movement work while armored (no shield). Over an hour, adapt to a new weapon, gaining its proficiency and monk-weapon status (one at a time)." },
      { name: "Crimson Squall", level: 6, text: "Bonus action + 1 focus point while wielding a monk weapon: create a 5-foot (growing to 15 at 11th, 30 at 17th) difficult-terrain aura around you that blocks opportunity attacks from within it." },
      { name: "Vigilant Sentinel", level: 11, text: "+10 bonus to Wisdom (Perception) checks until your next turn if you don't move on your turn." },
      { name: "Sovereign Protector", level: 17, text: "Bonus action: for 1 minute, double speed, +2 AC, advantage on Dexterity saves, and an extra limited action each turn. Long rest to reuse." },
    ],
  },
  {
    name: "Echani Order",
    className: "Monk",
    features: [
      { name: "Echani Weapons", level: 3, text: "Choose two weapon types (one vibroweapon, one blaster) as Echani/monk weapons, gaining proficiency and Agile Parry (+2 AC after an unarmed strike while holding one) and Echani's Shot (+1d4 ranged damage via bonus action). One more weapon type at 6th/11th/17th level." },
      { name: "One with the Blade", level: 6, text: "Your Echani weapon attacks count as enhanced; Deft Strike lets you spend 1 focus point on a hit for +Martial Arts die damage, once per turn." },
      { name: "Sharpen the Blade", level: 11, text: "Bonus action: expend up to 3 focus points to grant an Echani weapon a matching attack/damage bonus for 1 minute." },
      { name: "Unerring Accuracy", level: 17, text: "Once per turn, reroll a missed monk-weapon attack." },
    ],
  },
  {
    name: "Matukai Order",
    className: "Monk",
    features: [
      { name: "Force-Enhanced Strikes", level: 3, text: "Spend 1 focus point on an unarmed/monk-weapon hit: Strength save or 2d6 force damage and pushed 15 feet (half damage, no push on success)." },
      { name: "Instinctive Leap", level: 6, text: "Reaction when a hostile creature closes to 5 feet: disengage and leap up to half your speed." },
      { name: "Absorb Damage", level: 11, text: "Bonus action: resistance to kinetic and energy damage until your next turn. 4 uses, more at 13th/17th level; regains on long rest." },
      { name: "Control the Field", level: 17, text: "Instinctive Leap can use your full speed; landing lets you make an unarmed strike with advantage for +2d6 force damage on a hit." },
    ],
  },
  {
    name: "Nightsister Order",
    className: "Monk",
    features: [
      { name: "Ichor Lightning", level: 3, text: "A new 30-foot ranged focus attack counting as an unarmed strike (usable with Flurry of Blows), dealing necrotic damage with your Martial Arts die; reducing a creature to 0 HP grants temporary hit points." },
      { name: "Dark Magick", level: 6, text: "Action: creatures within 30 feet that can see you make a Wisdom save or become charmed or frightened (your choice) until the end of your next turn." },
      { name: "Mastery of Death", level: 11, text: "Spend 1 focus point (no action) to drop to 1 hit point instead of 0." },
      { name: "Spirit Blade Assault", level: 17, text: "Action: strike an adjacent creature, spending 1-10 focus points; Constitution save or take 2d10 necrotic damage per point spent (half on success)." },
    ],
  },

  // ---- Operative ----
  {
    name: "Acquisitions Practice",
    className: "Operative",
    features: [
      { name: "Fast and Agile", level: 3, text: "Your Cunning Action bonus action can instead be a Sleight of Hand check, a kit use to disarm/unlock, or the Use an Object action. Climbing costs no extra movement, and you gain two half-speed flying hops in place of normal movement." },
      { name: "Deft Hands", level: 3, text: "Forgo two Sneak Attack dice to perform Hinder, Pilfer, or Tumble (save DC = 8 + proficiency + Dexterity)." },
      { name: "Supreme Sneak", level: 9, text: "Advantage on Stealth if you move no more than half speed; resistance to and immunity from damage on falls under 100 feet." },
      { name: "Aerial Agility", level: 13, text: "Three flying hops instead of two; grabbing a climbable surface after a flying hop." },
      { name: "Thief's Reflexes", level: 17, text: "Take two turns in the first combat round (second at initiative -10). Falling 50+ feet near an enemy lets you reaction-attack, with bonus Sneak Attack dice and a prone-on-fail chance." },
    ],
  },
  {
    name: "Beguiler Practice",
    className: "Operative",
    features: [
      { name: "Forcecasting", level: 3, text: "You derive force powers from your emotional connection, learning them from a dedicated Beguiler Practice table (Force Powers Known/Force Points/Max Power Level, growing from level 3 to 20)." },
      { name: "Fascinating Display", level: 3, text: "1-minute display: humanoids within 60 feet (up to your Charisma modifier) make a Wisdom save (DC 8 + proficiency + Charisma) or become charmed, idolizing and aiding you. Long rest to reuse." },
      { name: "Mesmerizing Presence", level: 9, text: "Advantage on attack rolls against creatures charmed by you." },
      { name: "Enthralling Vigor", level: 13, text: "Gain temporary hit points when a creature fails a Wisdom/Charisma save against your power or feature. 5 uses, +1 at 17th; regains on short/long rest." },
      { name: "Distracting Countenance", level: 17, text: "Bonus action: for 1 minute, attackers must succeed a Charisma save or fail to attack you this turn. Short/long rest to reuse." },
    ],
  },
  {
    name: "Lethality Practice",
    className: "Operative",
    features: [
      { name: "Assassinate", level: 3, text: "Turn a hidden hit into a critical hit; if it drops the target to 0 HP, a contested Stealth check lets you stay hidden. 1 use, +1 at 9th/17th; regains on long rest." },
      { name: "Lethal Strikes", level: 3, text: "Forgo two Sneak Attack dice for Priming Attack, Target Assessment, or Vulnerable Strike (save DC = 8 + proficiency + Dexterity)." },
      { name: "Infiltrator", level: 9, text: "Reaction to let yourself or a nearby ally reroll a failed Stealth check." },
      { name: "Bushmaster", level: 13, text: "Advantage on initiative; the first creature you hit each combat grants advantage to attacks against it until your next turn." },
      { name: "Death Strike", level: 17, text: "Hitting a hidden or surprised creature forces a Constitution save or doubles the attack's damage. Long rest to reuse." },
    ],
  },
  {
    name: "Sharpshooter Practice",
    className: "Operative",
    features: [
      { name: "Assume the Position", level: 3, text: "No advantage needed for Sneak Attack against targets 30+ feet away with no enemies within 5 feet of you; standing from prone costs only 5 feet; proficiency with two martial blasters." },
      { name: "Placed Shots", level: 3, text: "Forgo two Sneak Attack dice for Disarming Shot, Penetrating Shot, or Suppressive Shot (save DC = 8 + proficiency + Dexterity)." },
      { name: "Head Shot", level: 9, text: "Advantage against creatures that haven't yet acted in combat; hits against surprised creatures are critical hits." },
      { name: "Distracting Shot", level: 13, text: "Reaction ranged attack to protect an ally at range, imposing disadvantage on the attacker or granting the ally advantage on a save." },
      { name: "Double Tap", level: 17, text: "Forgo advantage on an attack to make an extra attack against the same or an adjacent target; both can benefit from Sneak Attack." },
    ],
  },

  // ---- Scholar ----
  {
    name: "Gambler Pursuit",
    className: "Scholar",
    features: [
      { name: "Gambler's Aptitude", level: 3, text: "Proficiency with a gaming set and your choice of Insight, Deception, Persuasion, or Sleight of Hand, with no disadvantage on either." },
      { name: "Risk Versus Reward", level: 3, text: "On your first attack vs. your Critical Analysis target, roll a d6 (growing to d8/d10/d12): 4+ grants you advantage until your next turn, 3 or lower grants the target advantage against you instead." },
      { name: "Lucky Number 7", level: 6, text: "Rolling a 7 on an attack against your Critical Analysis target auto-hits and regains a superiority die." },
      { name: "Tell Me the Odds", level: 9, text: "Reaction when your Critical Analysis target hits you: roll a d8 (growing to d10/d12); 4+ imposes disadvantage on the attack, or forces a reroll if already at disadvantage." },
      { name: "Borrowed Luck", level: 17, text: "Once per round, replace a d20 roll with 7 and bank the original number as a borrowed luck roll to substitute into a later roll." },
    ],
  },
  {
    name: "Physician Pursuit",
    className: "Scholar",
    features: [
      { name: "Medical Practitioner", level: 3, text: "Proficiency with biochemist's kits and your choice of Medicine or Nature, with no disadvantage on either." },
      { name: "Remote Healer", level: 3, text: "Maneuvers targeting your Critical Analysis ally gain a 30-foot range." },
      { name: "Field Surgeon", level: 6, text: "Healing/temp-HP maneuvers gain an extra die (growing with level); on your Critical Analysis target, you can max both dice. 1 use, 2 at 11th; regains on short/long rest, once per turn." },
      { name: "Resuscitate", level: 9, text: "Bonus action to stabilize a creature at 0 HP; action to revive a creature that died since your last turn to 1 HP. Short/long rest to reuse." },
      { name: "Panacea", level: 17, text: "Over 10 minutes and 1,000 cr of supplies, craft a panacea syringe that reduces exhaustion, heals fully, and cures disease/poison/paralysis/stun. Long rest to create another." },
    ],
  },
  {
    name: "Politician Pursuit",
    className: "Scholar",
    features: [
      { name: "Silver Tongue", level: 3, text: "Learn two languages and gain proficiency in a Charisma skill of your choice, with no disadvantage on it." },
      { name: "Motivating Diplomat", level: 3, text: "Your Critical Analysis target and allies within 10 feet gain an AC bonus equal to half your Critical Analysis ability modifier." },
      { name: "Force of Personality", level: 6, text: "Action: a creature makes a Wisdom save or is charmed and follows a suggested course of action for up to 24 hours. 3 uses, more at 9th/13th/17th; regains on long rest." },
      { name: "Reassemble", level: 9, text: "Bonus action: chosen allies within 60 feet can reaction-move their speed toward you without provoking." },
      { name: "Beguiling Presence", level: 17, text: "Humanoids within 60 feet have disadvantage on saves against charm/fear effects that originate from you." },
    ],
  },
  {
    name: "Tactician Pursuit",
    className: "Scholar",
    features: [
      { name: "Battle Display", level: 3, text: "Proficiency in martial blasters and martial vibroweapons." },
      { name: "Tactical Mastery", level: 3, text: "Your Critical Analysis range increases to 90 feet." },
      { name: "Fire as One", level: 6, text: "Reaction attack against your Critical Analysis target once per round when someone else attacks it." },
      { name: "Battlefield Survey", level: 9, text: "After 10 minutes observing an area, chosen allies (up to your Critical Analysis modifier) ignore difficult terrain and gain Stealth advantage there." },
      { name: "All-Out Attack", level: 17, text: "Action: chosen allies within 60 feet get a reaction weapon attack against a target you choose for each. Short/long rest to reuse." },
    ],
  },

  // ---- Scout ----
  {
    name: "Bulwark Technique",
    className: "Scout",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency in heavy armor." },
      { name: "Personal Barrier", level: 3, text: "A rest-refreshed barrier (HP = twice your scout level + Intelligence modifier) absorbs damage; while it has HP you're considered proficient in Constitution saves for power concentration, and melee attackers take energy damage." },
      { name: "Mark of the Bulwark", level: 3, text: "Reaction to redirect your Ranger's Quarry target's melee attack on a nearby ally to yourself, dealing bonus damage if your barrier has HP." },
      { name: "Projected Barrier", level: 7, text: "Action: spend 3 barrier hit points for a Projected Sphere, Maelstrom, or Wave effect (cover, damage zone, or cone damage)." },
      { name: "Regenerative Shielding", level: 11, text: "Succeeding a forced save regains barrier HP equal to your Intelligence modifier." },
      { name: "Adaptive Barrier", level: 15, text: "Your barrier can gain resistance to a damage type it's hit by, until your next turn." },
    ],
  },
  {
    name: "Hunter Technique",
    className: "Scout",
    features: [
      { name: "Hunter's Prey", level: 3, text: "Choose Colossus Slayer (extra damage vs. damaged foes), Giant Killer (reaction attack vs. Large+ attackers), or Horde Breaker (extra attack vs. an adjacent creature)." },
      { name: "Mark of the Hunter", level: 3, text: "The first attack against your Ranger's Quarry target each turn adds your Ranger's Quarry damage die." },
      { name: "Defensive Tactics", level: 7, text: "Choose Escape the Horde (disadvantage on opportunity attacks vs. you), Multiattack Defense (+4 AC after being hit), or Steel Will (advantage vs. frightened)." },
      { name: "Multiattack", level: 11, text: "Choose Volley (ranged attack against many within 10 feet of a point) or Whirlwind Attack (melee attack against many within 5 feet)." },
      { name: "Superior Hunter's Defense", level: 15, text: "Choose Evasion, Stand Against the Tide, or Uncanny Dodge." },
    ],
  },
  {
    name: "Slayer Technique",
    className: "Scout",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency in heavy armor." },
      { name: "Slayer's Pride", level: 3, text: "Advantage on saves against being frightened." },
      { name: "Mark of the Slayer", level: 3, text: "You learn your Ranger's Quarry target's damage immunities/resistances/vulnerabilities; the first hit against it each turn deals extra Ranger's Quarry damage." },
      { name: "Supernatural Defense", level: 7, text: "Reaction to add your Ranger's Quarry die to a save forced by your Quarry, or to a grapple-escape check against it." },
      { name: "Nemesis", level: 11, text: "Bonus action on a crit or kill: a creature within 30 feet makes a Wisdom save or is frightened of you for 1 minute (repeatable save each turn)." },
      { name: "Slayer's Counter", level: 15, text: "Reaction attack against your Ranger's Quarry target before making a save it forces on you; a hit auto-succeeds the save." },
    ],
  },
  {
    name: "Stalker Technique",
    className: "Scout",
    features: [
      { name: "Accomplished Ambusher", level: 3, text: "An extra attack against a surprised creature as part of the Attack action." },
      { name: "Mark of the Stalker", level: 3, text: "While hidden from your Ranger's Quarry target, your first attack each round doesn't automatically reveal you (contested Stealth vs. Perception, disadvantage within 30 feet)." },
      { name: "Concealment", level: 7, text: "Invisible to darkvision in darkness; a ranged hit on a hidden target forces a Dexterity save or their speed drops to 0 until your next turn. 3 uses, more at 9th/13th/17th; regains on short/long rest." },
      { name: "Stalker's Flurry", level: 11, text: "Forgo advantage on an attack to make an extra bonus-action attack against the same target." },
      { name: "Stalker's Dodge", level: 15, text: "Reaction to impose disadvantage on a non-advantage attack against you, before or after the roll." },
    ],
  },

  // ---- Sentinel ----
  {
    name: "Path of Focus",
    className: "Sentinel",
    features: [
      { name: "Focused Burst", level: 3, text: "Learn burst for free (doesn't count against powers known); can use the Double Strike option when cast as your action; add Wisdom or Charisma to its damage; targets take half damage instead of none on a successful save." },
      { name: "Blade Dance", level: 3, text: "Dealing damage to an adjacent creature lets you move up to 10 feet without provoking opportunity attacks." },
      { name: "Blade Storm", level: 7, text: "Once per turn, when a creature takes damage from you twice, make an additional attack against it using your Kinetic Combat die (no action required)." },
      { name: "Focused Flow", level: 13, text: "Force-Empowered Self features can be used for free, rolling a d4 instead of your Kinetic Combat die and expending no force points." },
      { name: "Master Strike", level: 18, text: "Once per turn, when a creature takes damage from you a third time, force a Constitution save or it becomes stunned until the end of its next turn." },
    ],
  },
  {
    name: "Path of Shadows",
    className: "Sentinel",
    features: [
      { name: "Dead Silence", level: 3, text: "Learn psychic charge for free (doesn't count against powers known); use Wisdom or Charisma for it; a hit deals extra damage equal to your modifier and silences the target's voice until your next turn." },
      { name: "Cloak of Shadows", level: 3, text: "Hide as a bonus action; you can attempt to hide while only lightly obscured." },
      { name: "Shadow Strike", level: 7, text: "Once per turn, deal extra 1d6 damage (growing to 2d6/3d6) to a creature you hit with advantage." },
      { name: "Shadow Step", level: 13, text: "Bonus action in dim light/darkness: teleport up to 60 feet to an unoccupied dim/dark space, gaining advantage on your next melee attack this turn." },
      { name: "Shadow's Wrath", level: 18, text: "While hidden from your target, your first attack roll each round doesn't reveal you on a successful contested Stealth check; if also invisible, you remain invisible." },
    ],
  },
  {
    name: "Path of the Corsair",
    className: "Sentinel",
    features: [
      { name: "Bonus Proficiencies", level: 3, text: "Proficiency with demolitions kits and three blasters of your choice." },
      { name: "Corsair Munitions", level: 3, text: "Throw grenades/set mines as a bonus action; use Wisdom or Charisma for throwing range; use your universal force save DC for explosives if higher." },
      { name: "Force-Empowered Detonators", level: 3, text: "Create two grenades per rest (growing to six by 17th level) using a demolitions kit; thrown as an action, dealing Kinetic Combat die + Wisdom/Charisma damage (force, necrotic, or psychic) on a failed Dex/Con/Wis save, half on success." },
      { name: "Remote Start", level: 7, text: "Bonus action (or integrated into a blaster Attack action) to detonate a primed explosive within 60 feet, gaining advantage on the damage roll." },
      { name: "Energized Kinetics", level: 13, text: "Once per turn, add Kinetic Combat die damage (your choice of force/lightning/necrotic/psychic) to a Detonator or Double Strike hit." },
      { name: "Disorienting Detonations", level: 18, text: "Spend 2 force points to inflict a condition (blinded, deafened, ignited, shocked, or slowed) on a creature that fails a Detonator save." },
    ],
  },
  {
    name: "Path of the Forceblade",
    className: "Sentinel",
    features: [
      { name: "Phasethrow", level: 3, text: "Learn saber throw for free (doesn't count against powers known); no disadvantage at melee range; Double Strike option when cast as your action; bonus damage equal to half your Wisdom/Charisma modifier." },
      { name: "Forceblade Bond", level: 3, text: "A 1-hour ritual bonds up to two light/vibro-weapons to you: can't be disarmed of them, summon them as a bonus action, and use Wisdom or Charisma for their attack/damage rolls." },
      { name: "Twin Saber Throw", level: 7, text: "Casting saber throw with your forceblade can hit the same target multiple times; damaging a creature within 30 feet lets you bonus-action teleport to it and melee attack using your Kinetic Combat die. 3 uses, more at 9th/13th/17th; regains on long rest." },
      { name: "Disruptive Throw", level: 13, text: "Reaction to throw your forceblade at a ranged attacker (force attack, Kinetic Combat die damage), imposing disadvantage on their triggering attack." },
      { name: "Forceblade Mastery", level: 18, text: "Action: telekinetically strike every creature within 10 feet, spending 1 force point per target; Dexterity save or take Kinetic Combat die + half sentinel level damage, pushed 10 feet, and knocked prone." },
    ],
  },
];
