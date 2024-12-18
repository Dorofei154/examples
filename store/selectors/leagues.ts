import { createSelector } from 'reselect';

import { gameStateSelector } from './games';

const leaguesStoreSelector = createSelector(gameStateSelector, state => state.leaguesStore);

export const leaguesSelector = createSelector(leaguesStoreSelector, state => state.leagues);

export const leaguesIdsSelector = createSelector(leaguesStoreSelector, state => state.ids);

export const leaguesArraySelector = createSelector(leaguesStoreSelector, state => Object.values(state.leagues || []));

export const leaguesLoadingSelector = createSelector(leaguesStoreSelector, state => state.isLoading);
