import { createStore } from 'solid-js/store';
import { useGameManager } from '@game/GameContext';
import { GamePhase } from 'types/GamePhases';

type LineType = 'info' | 'failure' | 'success';

export type DialogueLine = {
    text: string;
    type?: LineType;
};


export type DialogueMessage = {
    lines: DialogueLine[];
    phase?: GamePhase;
};

export const [dialogueStore, setDialogueStore] = createStore<{ messages: DialogueMessage[] }>({
    messages: [],
});

export function addDialogueMessage(newMessage: DialogueMessage) {
    const [gameState] = useGameManager();
    const currentPhase = gameState.currentPhase;
    const messagePhase = { ...newMessage, phase: { ...currentPhase } };

    setDialogueStore('messages', messages => [...messages, messagePhase]);
}

export function addDialogueLine(line: string, type?: LineType) {
    setDialogueStore('messages', messages => {
        if (messages.length === 0) {
            return [...messages, { lines: [{ text: line, type }] }];
        } else {
            const lastMessage = messages[messages.length - 1];
            return [
                ...messages.slice(0, -1),
                { ...lastMessage, lines: [...lastMessage.lines, { text: line, type }] },
            ];
        }
    });
}