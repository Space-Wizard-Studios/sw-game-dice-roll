import { v4 as uuidv4 } from 'uuid';
import { DiceActions } from "@models/actions/DiceAction";
import { getRandomElement } from "@helpers/getRandomElement";
import type { Dice, DiceActionsMap, ExtractSides } from "@models/Dice";

export function generateRandomDice(quantity: number, possibleSides: (keyof DiceActionsMap)[]): Dice[] {
	const diceSet: Dice[] = [];

	for (let i = 0; i < quantity; i++) {
		const sides = getRandomElement(possibleSides) as keyof DiceActionsMap;
		const actions = Array.from({ length: sides }, () => getRandomElement(Object.values(DiceActions)));
		const dice: Dice = {
			id: uuidv4(),
			name: `D${sides}`,
			actions: actions as DiceActionsMap[typeof sides],
			sides: sides as ExtractSides<DiceActionsMap[typeof sides]>,
		};
		diceSet.push(dice);
		console.log('generated dice:', dice.id);
	}

	return diceSet;
}