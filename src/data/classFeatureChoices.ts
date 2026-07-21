// Class resource pools and named sub-choice catalogs, sourced from sw5e.com class pages
// and the shared Customization Options > Fighting Styles page.
//
// Deliberately NOT modeled here (too large / require their own catalogs, consistent with the
// scope-cuts already made for archetype sub-features and feats): Combat Superiority Maneuvers
// (Fighter/Scholar), Fighting Masteries, Lightsaber Forms, Weapon Focuses/Supremacies, Class/
// Multiclass/Splashclass Improvements, Engineer's Infuse Item modifications, and the nested
// per-skill mechanics of the Operative's Skill's Exploit.

import type { ClassResourceDef, ClassSubChoiceDef, ClassSubChoiceOption } from "../types";

export const FIGHTING_STYLES: ClassSubChoiceOption[] = [
  { name: "Area Style", text: "When a creature successfully saves against your projector canister, you can use your bonus action to force them to repeat the save. When a creature rolls a 1 on the saving throw against a projector canister you control, they treat the effect's damage as if it had rolled the maximum." },
  { name: "Assisting Style", text: "You can take the Help action as a bonus action (or as a reaction on your turn if you already could). Creatures benefiting from your Help action can't have disadvantage on the affected ability check or attack roll." },
  { name: "Berserk Style", text: "When you hit with a melee weapon attack using Strength, you deal additional damage equal to your Strength modifier if that creature dealt damage to you since the start of your last turn. When you choose to let an attack that would miss you hit you instead, the creature rolls the damage as normal instead of choosing the maximum." },
  { name: "Blindfighting Style", text: "You gain blindsight out to 10 feet (or it increases by 10 feet if you already have it). You can use your bonus action to double the range of your blindsight until the start of your next turn." },
  { name: "Brawler Style", text: "You are proficient with improvised weapons. Your unarmed strike/natural weapon damage die increases by one step. When you attack, grapple, shove, or trip with an unarmed strike or one-handed weapon on your turn, you can use your bonus action to do the same again against the same creature." },
  { name: "Counterstrike Style", text: "When you would provoke an opportunity attack on your turn, you can use your bonus action to force the creature to make it if it can. Creatures who make opportunity attacks against you provoke opportunity attacks from you." },
  { name: "Covert Style", text: "You can take the Hide action as a bonus action (or as a reaction on your turn if you already could). Creatures you've damaged since the start of your last turn have disadvantage on Perception checks to find you." },
  { name: "Defense Style", text: "While wearing medium/heavy armor you're proficient with, mark a target within 30 feet with your bonus action; damage it deals to you is reduced by half your Strength or Constitution modifier while marked. You have advantage on Strength checks/saves to avoid being moved." },
  { name: "Disruption Style", text: "Choose force- or tech-casting. When a creature succeeds a concentration save you forced, you can force a reroll with your bonus action. Once per round, a hostile creature casting within 5 feet of you must first make a concentration-style save or waste the power." },
  { name: "Dual Wield Style", text: "You add your ability modifier to Two-Weapon Fighting damage rolls even if it wouldn't normally apply. You can draw or stow two weapons where you'd normally draw or stow only one." },
  { name: "Duelist Style", text: "Wielding one weapon and no others: feint with your bonus action (contested check for advantage on your next attack), or repeat a missed attack with your bonus action against the same target. Drawing/stowing that weapon no longer needs an object interaction once per turn." },
  { name: "Equilibrium Style", text: "While wearing light/no armor and no shield, mark a target within 30 feet with your bonus action; you gain a bonus to AC and Dex saves against effects it controls equal to half your Dexterity modifier while marked. You have advantage on Dexterity checks/saves to avoid being moved." },
  { name: "Explosives Style", text: "You can throw grenades and set mines with your bonus action (or reaction if already bonus action). When a creature rolls a 1 on a save against a grenade/mine/missile you control, they take maximum damage instead." },
  { name: "Formation Style", text: "You can take the Guard action as a bonus action (or reaction if already bonus action). You can bring a willing ally within 5 feet along when you move with your bonus action. Letting an attack meant for a guarded ally hit you instead rolls damage normally instead of maximum." },
  { name: "Formfighting Style", text: "Prerequisite: the ability to cast force powers. You learn three lightsaber forms. Once per turn you can draw or stow a lightweapon without an object interaction." },
  { name: "Great Weapon Style", text: "While wielding a two-handed light-/vibro-weapon you're proficient with, its damage rolls gain a minimum roll threshold. Grasping such a weapon with your other hand no longer needs an object interaction." },
  { name: "Guerrilla Style", text: "You can take the Disengage action as a bonus action (or reaction if already bonus action). When you Disengage, you ignore unenhanced difficult terrain and have advantage on the first check/save to avoid movement-impairing effects." },
  { name: "Gunning Style", text: "Creatures who roll a 1 on a save against your burst/rapid property take maximum damage instead. You can spray a line with the burst property, or double one set of rapid-property damage dice instead of adding them." },
  { name: "Mounted Style", text: "Mounting a vehicle or beast only uses 5 feet of movement. You can force an attack targeting your mount to target you instead, if you're a valid target." },
  { name: "Onslaught Style", text: "You can take the Dash action as a bonus action (or reaction if already bonus action). You can make a melee attack roll against a creature's AC instead of a contested check to shove or trip it (with advantage if wielding your weapon two-handed)." },
  { name: "Poisoner Style", text: "You can apply poisons with your bonus action (or reaction if already bonus action). Creatures who roll a 1 on a save against a poison you control take maximum damage instead." },
  { name: "Secured Style", text: "You can treat a fixed weapon as a light shield until the start of your next turn (forgoing attacks with it for the duration). You can benefit from fixed weapons while the hand is full." },
  { name: "Sentinel Style", text: "Creatures provoke an opportunity attack when they move within your reach or move 5+ feet within it. Hitting a creature no more than one size larger with an opportunity attack gives it 4 slowed levels until the end of the turn." },
  { name: "Sharpshooter Style", text: "You can mark a target more than 30 feet away with your bonus action; if it moves 5+ feet before your next turn, it provokes a ranged opportunity attack from you. Your ranged attacks reduce partial cover by one step against targets past 30 feet. Grasping a two-handed weapon one-handed no longer needs an object interaction." },
  { name: "Shield Style", text: "You're no longer restricted to light weapons while wielding a heavy shield. You can shove or trip with your shield as a bonus action. Using a shield as an improvised weapon, you're considered proficient and it gains the light/fixed (light shield) or heavy (heavy shield) property." },
  { name: "Snapshot Style", text: "No disadvantage on ranged attacks from being within 5 feet of a hostile creature. Your ranged attacks reduce partial cover by one step against targets within 30 feet. Your blaster damage against targets within 30 feet gains a minimum roll threshold. Grasping a two-handed weapon one-handed no longer needs an object interaction." },
  { name: "Split Style", text: "You add your ability modifier to Double-Weapon Fighting attack rolls and Two-Weapon Fighting damage rolls even if it wouldn't normally apply." },
  { name: "Spotting Style", text: "You can take the Search action as a bonus action (or reaction if already bonus action). Advantage on checks/saves to determine the nature of illusions (or reroll one die if you'd already have advantage)." },
  { name: "Superiority Style", text: "You learn one maneuver and gain one superiority die (d4, growing to d6 at 5th, d8 at 9th, d10 at 13th, d12 at 17th), regained on a short or long rest." },
  { name: "Throwing Style", text: "After a ranged thrown-weapon attack, you can immediately draw another weapon and move up to 5 feet without provoking opportunity attacks. On a miss with a thrown weapon, you can use your bonus action to repeat the attack against a creature within 15 feet behind your target." },
  { name: "Twin-Blade Style", text: "You add your ability modifier to Double-Weapon Fighting attack rolls even if it wouldn't normally apply. Grasping a double weapon one-handed no longer needs an object interaction." },
  { name: "Versatile Style", text: "On a miss with a versatile weapon wielded in two hands, repeat the attack one-handed with your bonus action. Wielded one-handed instead, attempt to shove or trip with your bonus action. Grasping such a weapon one-handed no longer needs an object interaction." },
];

function fightingStyleChoice(className: string, countByLevel: number[]): ClassSubChoiceDef {
  return { key: `${className.toLowerCase()}-fighting-style`, label: "Fighting Style", className, countByLevel, options: FIGHTING_STYLES };
}

export const CLASS_RESOURCES: ClassResourceDef[] = [
  {
    key: "berserker-rages",
    label: "Rages",
    className: "Berserker",
    refresh: "Long Rest",
    maxByLevel: [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 99],
  },
  {
    key: "fighter-superiority-dice",
    label: "Superiority Dice",
    className: "Fighter",
    refresh: "Short Rest",
    maxByLevel: [0, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    dieByLevel: [null, "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"],
  },
  {
    key: "scholar-superiority-dice",
    label: "Superiority Dice",
    className: "Scholar",
    refresh: "Short Rest",
    maxByLevel: [3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12],
    dieByLevel: ["d4", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"],
  },
  {
    key: "monk-focus-points",
    label: "Focus Points",
    className: "Monk",
    refresh: "Short Rest",
    maxByLevel: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  },
];

export const CLASS_SUB_CHOICES: ClassSubChoiceDef[] = [
  {
    key: "berserker-instincts",
    label: "Berserker Instincts",
    className: "Berserker",
    countByLevel: [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
    options: [
      { name: "Acklay's Instinct", text: "While raging, you have advantage on Constitution saving throws." },
      { name: "Bantha's Instinct", text: "Your carrying capacity and push/drag/lift weight doubles (triples if already doubled). Advantage on Strength checks to push, pull, lift, or break objects.", prerequisite: "7th level" },
      { name: "Blurrg's Instinct", text: "Your travel pace (mounted or on foot) is doubled, as is that of up to ten companions within 60 feet of you while you're not incapacitated." },
      { name: "Boggdo's Instinct", text: "While raging, you have a flying speed equal to your walking speed, though you fall if you end your turn airborne with nothing else holding you up.", prerequisite: "13th level" },
      { name: "Chirodactyl's Instinct", text: "While raging, you have blindsight to 30 feet and advantage on Wisdom (Perception) checks relying on sound, as long as you aren't deafened.", prerequisite: "7th level" },
      { name: "Dewback's Instinct", text: "Choose three damage types other than true damage. While raging, you have resistance to those types." },
      { name: "Fighter's Instinct", text: "You adopt a particular style of fighting as your specialty. Choose one of the Fighting Style options." },
      { name: "Fyrnock's Instinct", text: "While raging, use your bonus action to leap up to 30 feet, dealing kinetic damage equal to your Strength modifier to each creature within 5 feet of where you land. Usable twice, more at 5th/9th/13th/17th level; regains on long rest." },
      { name: "Hawk's Instinct", text: "You can see up to 1 mile away without difficulty, discerning fine details as if within 100 feet. Dim light no longer imposes disadvantage on Perception checks.", prerequisite: "7th level" },
      { name: "Katarn's Instinct", text: "You gain a climbing speed equal to your movement speed." },
      { name: "Loth-cat's Instinct", text: "While raging, other creatures have disadvantage on opportunity attacks against you, and you can take the Dash action as a bonus action." },
      { name: "Predator's Instinct", text: "Your speed increases by 10 feet." },
      { name: "Rancor's Instinct", text: "While raging, hostile creatures within 5 feet of you have disadvantage on attack rolls against targets other than you (or another creature with this feature), unless they can't see/hear you or can't be frightened.", prerequisite: "13th level" },
      { name: "Tactician's Instinct", text: "When you use Reckless Attack, you can forgo your own advantage so that friendly creatures within 5 feet of a hostile creature within 5 feet of you have advantage against that creature instead." },
      { name: "Tracker's Instinct", text: "You can track creatures while traveling at a fast pace, and move stealthily while traveling at a normal pace.", prerequisite: "7th level" },
      { name: "Terentatek's Instinct", text: "When forced to save against a force power, use your reaction to move up to half your speed toward the caster; ending within 5 feet lets you make one melee weapon attack as part of the reaction.", prerequisite: "13th level" },
      { name: "Varactyl's Instinct", text: "While raging, you have advantage on Dexterity checks, your attack rolls can't suffer disadvantage, and each slowed level only reduces your speed by 5 feet (unless it would reduce it to 0).", prerequisite: "13th level" },
    ],
  },
  fightingStyleChoice("Fighter", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
  {
    key: "fighter-strategies",
    label: "Fighter Strategies",
    className: "Fighter",
    countByLevel: [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4],
    options: [
      { name: "Cover Strategist", text: "You treat partial cover as one step higher, and while in cover, your attacks reduce partial cover by one step." },
      { name: "Cunning Strategist", text: "Choose two actions (apply poison, Dash, Disengage, Guard, Help, Hide, Search, throw grenades/set mines, mounted beast attack, or vehicle action) you can take as a bonus action instead of an action." },
      { name: "Enduring Strategist", text: "You only need 3 hours of sleep for a long rest's benefits, an interrupted long rest just needs completing rather than restarting, and you have advantage on saves against exhaustion." },
      { name: "Mastery Strategist", text: "You've mastered a particular style of fighting. Choose one of the Fighting Mastery options." },
      { name: "Lightweapon Strategist", text: "You gain proficiency in all lightweapons, no longer need force-casting ability to learn lightsaber-form-granting features, and learn one lightsaber form of your choice." },
      { name: "Maneuver Strategist", text: "You learn two additional maneuvers, replaceable one at a short rest or both at a long rest." },
      { name: "Skilled Strategist", text: "You gain proficiency in a skill and a tool, or two tools." },
      { name: "Style Strategist", text: "You adopt a second fighting style (choose one of the Fighting Style options), swappable at the end of a long rest." },
    ],
  },
  {
    key: "guardian-auras",
    label: "Guardian Aura",
    className: "Guardian",
    countByLevel: [0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
    options: [
      { name: "Aura of Conquest", text: "Whenever a creature frightened of you starts its turn within 5 feet of you, it gains 4 slowed levels and takes psychic damage equal to half your guardian level." },
      { name: "Aura of Conviction", text: "You and friendly creatures within 5 feet have advantage on saves against being charmed or frightened." },
      { name: "Aura of Hatred", text: "You and friendly creatures within 5 feet gain a bonus to the first melee weapon damage roll each round equal to your Charisma modifier (minimum +1)." },
      { name: "Aura of Presence", text: "Whenever you or a friendly creature within 5 feet must save, they can add your Wisdom modifier to the saving throw." },
      { name: "Aura of Protection", text: "Whenever a creature within 5 feet takes damage, you can use your reaction to take that damage instead (no other effects transfer, and it can't be reduced)." },
      { name: "Aura of Vigor", text: "Whenever a friendly creature starts its turn within 5 feet of you, it gains temporary hit points equal to your Wisdom or Charisma modifier (minimum +1)." },
      { name: "Aura of Warding", text: "You and friendly creatures within 5 feet have resistance to damage from force powers." },
    ],
  },
  fightingStyleChoice("Guardian", [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
  {
    key: "consular-force-empowered-casting",
    label: "Force-Empowered Casting Option",
    className: "Consular",
    countByLevel: [0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
    options: [
      { name: "Careful Power", text: "Spend 1 additional force point to automatically succeed a number of targets (up to your Wis/Cha modifier, min 1) on their saving throw against the power." },
      { name: "Distant Power", text: "Spend 1 additional force point to double the range of a power with a range of 5+ feet, or make a touch power's range 30 feet." },
      { name: "Extended Power", text: "Spend 1 additional force point to double the duration of a power lasting 1 minute or longer, to a max of 24 hours." },
      { name: "Heightened Power", text: "Spend 3 additional force points to give one target of a save-forcing power disadvantage on its first save against it." },
      { name: "Improved Power", text: "Spend 1 additional force point to reroll a number of damage dice (up to your Wis/Cha modifier, min 1) and use the new rolls. Usable even after another casting option." },
      { name: "Lingering Power", text: "Spend 3 additional force points on a concentration power; if you lose concentration, the power persists until the end of your next turn." },
      { name: "Pinpoint Power", text: "Spend 1 force point to make a ranged force attack against a single target in the area of a save-based power instead, hitting as if they failed their save." },
      { name: "Quickened Power", text: "Spend 2 additional force points to change a 1-action power's casting time to 1 bonus action." },
      { name: "Refocused Power", text: "Spend 2 force points as a reaction to automatically succeed a concentration save. Usable even after another casting option." },
      { name: "Seeking Power", text: "Spend 2 force points to reroll a missed attack-roll power and use the new roll. Usable even after another casting option." },
      { name: "Twinned Power", text: "Spend additional force points equal to the power's level (1 if at-will) to add a second target to a single-target power that doesn't have range self." },
    ],
  },
  {
    key: "consular-force-affinity",
    label: "Force Affinity",
    className: "Consular",
    countByLevel: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    options: [
      { name: "Ashla", text: "When you successfully cast a light side power, your or the target's hit point maximum and current hit points increase by the power's level for 1 minute (one instance at a time)." },
      { name: "Bendu", text: "You add both your Wisdom and Charisma modifier to your maximum force points, instead of just one." },
      { name: "Bogan", text: "Your dark side power damage rolls gain a minimum roll threshold." },
    ],
  },
  {
    key: "monk-monastic-vows",
    label: "Monastic Vows",
    className: "Monk",
    countByLevel: [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
    options: [
      { name: "Vow of Deflection", text: "Reaction to reduce melee weapon attack damage by 1d10 + Dexterity modifier + monk level." },
      { name: "Vow of the Devoted", text: "You learn 2 (growing) universal force powers, cast with focus points (1 per power level) instead of force points, using your focus ability and DC/attack modifier." },
      { name: "Vow of Fate", text: "Roll a d20 after a rest; before the next rest, replace any attack/save/check by you or a creature within 5 feet with that roll.", prerequisite: "7th level" },
      { name: "Vow of the Fighter", text: "You adopt a particular style of fighting as your specialty. Choose one of the Fighting Style options." },
      { name: "Vow of the Focused", text: "Substitute Strength, Constitution, or Intelligence (chosen now) for Wisdom or Charisma on monk class features (except other vows and Monastic Order)." },
      { name: "Vow of Fortitude", text: "Use your action or bonus action to end being blinded or deafened on yourself.", prerequisite: "7th level" },
      { name: "Vow of Freedom", text: "Ignore unenhanced difficult terrain; break free of a grapple/restraint as a bonus action instead of an action." },
      { name: "Vow of Intuition", text: "You no longer have disadvantage on attack rolls against creatures within 10 feet you can't see." },
      { name: "Vow of the Limber", text: "Spend 1 focus point on your first unarmed strike each turn to increase your reach by 5 feet until end of turn.", prerequisite: "7th level" },
      { name: "Vow of the Nemesis", text: "Bonus action to force a Wisdom save on a creature within 30 feet; on a failure it has disadvantage attacking others and must save to move far from you for a minute.", prerequisite: "13th level" },
      { name: "Vow of the Open Mind", text: "Gain proficiency in a skill of your choice. Spend 1 focus point and 10 minutes meditating to add Wisdom or Charisma modifier to checks with a skill you're proficient in (one instance at a time)." },
      { name: "Vow of Precision", text: "Your critical hit range with unarmed strikes increases by 1.", prerequisite: "13th level" },
      { name: "Vow of Requital", text: "After Dodging, when a melee attack against you misses, use your reaction to make a melee attack against that creature.", prerequisite: "13th level" },
      { name: "Vow of Restoration", text: "Spend 1 focus point in place of an unarmed strike to heal a willing creature within reach: your Martial Arts die + Wisdom or Charisma modifier." },
      { name: "Vow of the Sentry", text: "Gain proficiency in light and medium armor, and keep Martial Arts/Unarmored Movement benefits while wearing them (no shield)." },
      { name: "Vow of Serenity", text: "Your maximum focus increases by half your Wisdom or Charisma modifier (minimum +1)." },
      { name: "Vow of Spirit", text: "Use Wisdom or Charisma instead of Strength/Dexterity for unarmed strike and monk weapon attack and damage rolls (same modifier for both)." },
      { name: "Vow of the Versatile", text: "Replace an unarmed strike in Martial Arts or Flurry of Blows with a monk weapon attack using your Martial Arts die for damage." },
    ],
  },
  {
    key: "operative-exploits",
    label: "Operative Exploits",
    className: "Operative",
    countByLevel: [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
    options: [
      { name: "Commander's Exploit", text: "You gain proficiency in medium armor." },
      { name: "Explorer's Exploit", text: "You can hold your breath twice as long, and take half damage from falling." },
      { name: "Fate's Exploit", text: "Roll a d20 after a rest; before the next rest, replace any attack/save/check by you or a creature within 5 feet with that roll.", prerequisite: "7th level" },
      { name: "Fighter's Exploit", text: "You adopt a particular style of fighting as your specialty. Choose one of the Fighting Style options." },
      { name: "Freedom's Exploit", text: "Ignore unenhanced difficult terrain; break free of a grapple/restraint as a bonus action instead of an action." },
      { name: "Guerrilla's Exploit", text: "You only need 3 hours of sleep for a long rest's benefits, an interrupted long rest just needs completing, and you have advantage on saves against exhaustion." },
      { name: "Learner's Exploit", text: "Gain proficiency in a skill and a tool, or two tools. Can be taken multiple times, choosing new proficiencies each time." },
      { name: "Mentor's Exploit", text: "Once per turn, share a forced saving throw with a friendly creature within 60 feet, taking disadvantage yourself to give them advantage.", prerequisite: "13th level" },
      { name: "Skill's Exploit", text: "You learn an exploit letting you use a proficient skill on the Attack action (Aim, Angle, Battle Cry, Charm, Confuse Beast, Distract, Emulate Predator, Feint, Hacktivate, Instruct, and more). Usable twice combined, more at 5th/9th/13th/17th level; regains on long rest. Can be taken multiple times." },
    ],
  },
  {
    key: "scholar-discoveries",
    label: "Discoveries",
    className: "Scholar",
    countByLevel: [0, 2, 4, 4, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9],
    options: [
      { name: "Academic Memory", text: "You can recall anything you've read in the past month that you understand." },
      { name: "Adaptive", text: "When your Critical Analysis target drops to 0 HP, use your reaction to retarget it to another creature in range.", prerequisite: "15th level" },
      { name: "Ambassador", text: "You learn three additional languages of your choice. Can be chosen multiple times." },
      { name: "Clever Applications", text: "Proficiency with improvised weapons (finesse, 1d6 damage). Sage Advice can grant improvised weapon proficiency, retained for the duration." },
      { name: "Expert's Advice", text: "The first time a Sage Advice target uses the chosen check, they gain an additional bonus equal to half your Critical Analysis modifier." },
      { name: "Hardened Mind", text: "Advantage on saves against illusions and Intelligence checks to discern them; resistance to psychic damage.", prerequisite: "9th level" },
      { name: "Lifelong Learning", text: "Gain proficiency in a skill and a tool, or two tools. Can be chosen multiple times." },
      { name: "Lingering Advice", text: "Sage Advice targets retain its benefit for the full duration.", prerequisite: "5th level" },
      { name: "Malleable Maneuvering", text: "Learn two additional maneuvers, replaceable one at a short rest or both at a long rest." },
      { name: "Master's Advice", text: "The first time a Sage Advice target uses the chosen check, they gain an additional bonus equal to your full Critical Analysis modifier.", prerequisite: "11th level, Expert's Advice" },
      { name: "Mental Prowess", text: "Use your Critical Analysis modifier instead of Strength/Dexterity to grapple or escape a grapple/restraint." },
      { name: "Moderately Armored", text: "You gain proficiency in medium armor.", prerequisite: "5th level" },
      { name: "Perfect Maneuver", text: "Your superiority die rolls gain a minimum roll threshold." },
      { name: "Quick Analysis", text: "When you roll initiative and aren't surprised, use your reaction to trigger Critical Analysis.", prerequisite: "9th level" },
      { name: "Rancor's Discipline", text: "Substitute Wisdom or Charisma for Intelligence on scholar class features (except other discoveries and Academic Pursuit)." },
      { name: "Reliable Sources", text: "Intelligence (Lore) or Intelligence (Nature) checks that add your proficiency bonus gain a minimum roll threshold.", prerequisite: "9th level" },
      { name: "Resolute", text: "Add your Intelligence modifier to saving throws against charm and fear effects." },
      { name: "Running on Fumes", text: "You only need 3 hours of sleep for a long rest's benefits, an interrupted long rest just needs completing, and you have advantage on saves against exhaustion." },
      { name: "Survival Expert", text: "Use your Critical Analysis modifier instead of Wisdom for Survival checks; advantage on saves against poison." },
      { name: "Targeted Analysis", text: "Attack rolls against your Critical Analysis target can't suffer disadvantage.", prerequisite: "5th level" },
      { name: "Tech Amateur", text: "Learn and cast one 1st-level tech power once per long rest (Intelligence, wristpad required). Can be chosen multiple times for different powers." },
      { name: "Universal Language", text: "Communicate simple ideas with any creature with Intelligence 6+ through gestures." },
      { name: "Versatile Maneuvers", text: "Choose two known maneuvers to count as general maneuvers; choose another at 5th/9th/13th/17th level, swappable each level." },
    ],
  },
  {
    key: "scout-routines",
    label: "Scout Routine",
    className: "Scout",
    countByLevel: [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
    options: [
      { name: "Adaptability Routine", text: "Each turn, choose an ability without saving throw proficiency; add half your proficiency bonus to saves with it until your next turn (extendable to allies within 5 feet)." },
      { name: "Maven's Routine", text: "Each turn, gain resistance to tech power damage until your next turn (extendable to allies within 5 feet)." },
      { name: "Mesmer's Routine", text: "Each turn, gain advantage on saves against incapacitation/sleep effects until your next turn (extendable to allies within 5 feet)." },
      { name: "Nomad's Routine", text: "Each turn, gain advantage on Constitution saves against exhaustion and natural adaptation to hot/cold (extendable to allies within 5 feet)." },
      { name: "Responder's Routine", text: "On initiative, add your proficiency bonus and gain advantage against creatures who haven't acted (extendable: allies within 5 feet add half your proficiency bonus and gain advantage on their first attack)." },
      { name: "Sharpshooter's Routine", text: "Each turn, gain a bonus to your first weapon attack roll equal to your Intelligence modifier (extendable: allies within 5 feet add half that modifier)." },
      { name: "Strider's Routine", text: "Each turn, each slowed level only reduces your speed by 5 feet unless it would reduce it to 0 (extendable to allies within 5 feet)." },
      { name: "Warden's Routine", text: "Each turn, gain a crawling, climbing, and swimming speed equal to your walking speed (extendable to allies within 5 feet)." },
    ],
  },
  fightingStyleChoice("Scout", [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
  {
    key: "sentinel-ideals",
    label: "Sentinel Ideals",
    className: "Sentinel",
    countByLevel: [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    options: [
      { name: "Ideal of the Agile", text: "Swimming and climbing speed equal to walking speed; longer jumps. Manifest (bonus action): for 1 minute, opportunity attacks against you have disadvantage." },
      { name: "Ideal of the Artisan", text: "Add half your Wis/Cha modifier to checks with a chosen skill/tool. Manifest (action): for 10 minutes, the bonus becomes full and extends to a second skill/tool." },
      { name: "Ideal of the Contender", text: "Unarmed strike damage die increases one step and gains finesse. Manifest (bonus action): for 1 minute, unarmed strikes count as enhanced and you can use Wis/Cha for grapple checks." },
      { name: "Ideal of the Fighter", text: "Choose a Fighting Style option. Manifest (bonus action): for 1 minute, you know the corresponding fighting mastery (or another of your choice if already known)." },
      { name: "Ideal of the Hunter", text: "Darkvision to 60 feet (or +30 feet if you already have it). Manifest (bonus action): for 1 minute, see in enhanced darkness and gain blindsight to 10 feet." },
      { name: "Ideal of the Steadfast", text: "Force a Dexterity save instead of a melee attack roll, with advantage/disadvantage mirrored from what your attack roll would have had. Manifest (bonus action): for 1 minute, successes take half damage and 1s on the die take maximum." },
      { name: "Ideal of the Titan", text: "Proficiency in medium armor. Manifest (bonus action): for 1 minute, advantage on forced-movement checks/attacks and +5 feet to the distance moved." },
      { name: "Ideal of the Tranquil", text: "Gain temporary force points (half Wis/Cha modifier) after a rest. Manifest (action): regain force points equal to half your Wis/Cha modifier." },
      { name: "Ideal of the Vigorous", text: "Use Wis/Cha instead of Constitution for Hit Die healing rolls. Manifest (action): gain temporary hit points equal to half your sentinel level + Wis/Cha modifier." },
    ],
  },
];

// Per-class accent color, applied as a CSS variable override on the sheet so each class
// reads with a distinct visual identity (headers, borders, focus rings, etc.).
export const CLASS_ACCENTS: Record<string, string> = {
  Berserker: "#e2543a",
  Consular: "#4aa3c7",
  Engineer: "#c98a3a",
  Fighter: "#6c8fae",
  Guardian: "#3d7fc4",
  Monk: "#5a9f6a",
  Operative: "#9163cf",
  Scholar: "#6b74d6",
  Scout: "#82a63f",
  Sentinel: "#b34fae",
};

export const CLASS_RESOURCES_BY_CLASS = new Map<string, ClassResourceDef[]>();
for (const r of CLASS_RESOURCES) {
  const list = CLASS_RESOURCES_BY_CLASS.get(r.className) ?? [];
  list.push(r);
  CLASS_RESOURCES_BY_CLASS.set(r.className, list);
}

export const CLASS_SUB_CHOICES_BY_CLASS = new Map<string, ClassSubChoiceDef[]>();
for (const c of CLASS_SUB_CHOICES) {
  const list = CLASS_SUB_CHOICES_BY_CLASS.get(c.className) ?? [];
  list.push(c);
  CLASS_SUB_CHOICES_BY_CLASS.set(c.className, list);
}
