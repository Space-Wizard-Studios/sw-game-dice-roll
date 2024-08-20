import { Component, createContext, useContext, ParentProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { GamePhases } from 'types/GamePhases';

export type GameManager = {
    currentPhase: GamePhases;
};

export const [gameState, setGameState] = createStore<GameManager>({
    currentPhase: GamePhases.Presentation,
});

const GameContext = createContext<[GameManager, typeof setGameState]>([gameState, setGameState]);

export const GameProvider: Component<ParentProps> = (props) => {
    return (
        <GameContext.Provider value={[gameState, setGameState]}>
            {props.children}
        </GameContext.Provider>
    );
};

export const useGameManager = () => useContext(GameContext);