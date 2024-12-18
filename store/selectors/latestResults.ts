import { createSelector } from 'reselect';

import { gameStateSelector } from './games';

const latestResultsStoreSelector = createSelector(gameStateSelector, state => state.latestResultsStore);

export const latestResultsSelector = createSelector(latestResultsStoreSelector, state => state.results);

export const latestResultsIdsSelector = createSelector(latestResultsStoreSelector, state => state.ids);

export const shortLatestResultsSelector = createSelector(latestResultsStoreSelector, state => state.shortResults);

export const shortLatestResultsIdsSelector = createSelector(latestResultsStoreSelector, state => state.shortIds);

export const latestResultsLoadingSelector = createSelector(latestResultsStoreSelector, state => state.isLoading);

export const latestResultsPageSelector = createSelector(latestResultsStoreSelector, state => state.page);

export const hasMoreLatestResultsSelector = createSelector(latestResultsStoreSelector, state => state.hasMore);
