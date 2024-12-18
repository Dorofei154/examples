import { createSelector } from 'reselect';

import { gameStateSelector } from './games';

const upcomingGamesStoreSelector = createSelector(gameStateSelector, state => state.upcomingGamesStore);

export const upcomingGamesSelector = createSelector(upcomingGamesStoreSelector, state => state.games);

export const upcomingShortGamesSelector = createSelector(upcomingGamesStoreSelector, state => state.shortGames);

export const upcomingShortGamesIdsSelector = createSelector(upcomingGamesStoreSelector, state => state.idsShort);

export const upcomingGamesIdsSelector = createSelector(upcomingGamesStoreSelector, state => state.ids);

export const upcomingGamesLoadingSelector = createSelector(upcomingGamesStoreSelector, state => state.isLoading);

export const upcomingGamesPageSelector = createSelector(upcomingGamesStoreSelector, state => state.page);

export const hasMoreUpcomingGamesSelector = createSelector(upcomingGamesStoreSelector, state => state.hasMore);
