import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arrayToIdsMap, RefreshingQuery } from '@zalgiris-ventures/core';
import { logoutAction } from '@zalgiris-ventures/features/core';

import { TAKE_ITEMS_VALUE } from '../../constants/pagination';
import { UpcomingGame } from '../../interfaces/upcomingGame';
import { GetUpcomingGamesQuery } from '../../queries/upcomingGames/types';

export interface State {
  ids: string[] | null;
  idsShort: string[] | null;
  shortGames: Record<string, UpcomingGame> | null;
  games: Record<string, UpcomingGame> | null;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  shortGames: null,
  idsShort: null,
  games: null,
  ids: null,
  page: 0,
  hasMore: true,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'games/upcomingGames',
  initialState,
  extraReducers(builder) {
    builder.addCase(logoutAction, () => initialState);
  },
  reducers: {
    getUpcomingGamesAction: (state, action: PayloadAction<Pick<GetUpcomingGamesQuery, 'query'> & RefreshingQuery>) => {
      if (action.payload.refreshing) {
        state.page = 0;
        state.ids = null;
        state.games = null;
        state.hasMore = true;
      }
      state.isLoading = true;
      state.error = null;
    },
    getUpcomingGamesSuccessAction: (state, action: PayloadAction<UpcomingGame[]>) => {
      const { ids, items: games } = arrayToIdsMap(action.payload);
      state.isLoading = false;
      state.hasMore = action.payload.length === TAKE_ITEMS_VALUE;
      state.page += 1;
      state.ids = state.ids ? [...new Set([...state.ids, ...ids])] : ids;
      state.games = { ...state.games, ...games };
    },
    getUpcomingGamesFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getShortUpcomingGamesAction: (
      state,
      action: PayloadAction<Pick<GetUpcomingGamesQuery, 'query'> & RefreshingQuery>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    getShortUpcomingGamesSuccessAction: (state, action: PayloadAction<UpcomingGame[]>) => {
      const { ids, items: games } = arrayToIdsMap(action.payload);
      state.isLoading = false;
      state.idsShort = ids;
      state.shortGames = games;
    },
    getShortUpcomingGamesFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { actions, reducer } = slice;
