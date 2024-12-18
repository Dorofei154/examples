import { GameState } from '../slices';

export const gameStateSelector = (state: GameState) => {
  return state.games;
};
