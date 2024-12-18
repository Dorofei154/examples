import { createSelector } from 'reselect';

import { gameStateSelector } from './games';

const playersStoreSelector = createSelector(gameStateSelector, state => state.playersStore);

export const mainPlayersSelector = createSelector(playersStoreSelector, state => state.players);

export const mainPlayersIdsSelector = createSelector(playersStoreSelector, state => state.ids);
