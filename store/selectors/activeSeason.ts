import { createSelector } from 'reselect';

import { gameStateSelector } from './games';

const activeSeasonStoreSelector = createSelector(gameStateSelector, state => state.activeSeasonStore);

export const availablePredictionsPageSelector = createSelector(
  activeSeasonStoreSelector,
  state => state.season.available.page,
);

export const historicalPredictionsPageSelector = createSelector(
  activeSeasonStoreSelector,
  state => state.season.historical.page,
);

export const activeSeasonSelector = createSelector(activeSeasonStoreSelector, state => state.season);

export const activeSeasonLoadingSelector = createSelector(activeSeasonStoreSelector, state => state.isLoading);

export const hasMoreAvailablePredictionsSelector = createSelector(
  activeSeasonStoreSelector,
  state => state.season.available.hasMore,
);
export const hasMoreHistoricalPredictionsSelector = createSelector(
  activeSeasonStoreSelector,
  state => state.season.historical.hasMore,
);

export const isLoadingSelector = createSelector(activeSeasonStoreSelector, state => state.isLoading);
