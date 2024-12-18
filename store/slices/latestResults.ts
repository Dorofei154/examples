import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arrayToIdsMap, RefreshingQuery } from '@zalgiris-ventures/core';
import { logoutAction } from '@zalgiris-ventures/features/core';

import { LatestResult } from '../../interfaces/latestResult';
import { TAKE_ITEMS_VALUE } from '../../constants/pagination';
import { GetLatestResultsQuery } from '../../queries/latestResults/types';

export interface State {
  shortIds: string[] | null;
  shortResults: Record<string, LatestResult> | null;
  ids: string[] | null;
  results: Record<string, LatestResult> | null;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  shortIds: null,
  shortResults: null,
  results: null,
  ids: null,
  page: 0,
  hasMore: true,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'games/latestResults',
  initialState,
  extraReducers(builder) {
    builder.addCase(logoutAction, () => initialState);
  },
  reducers: {
    getLatestResultsAction: (state, action: PayloadAction<Pick<GetLatestResultsQuery, 'query'> & RefreshingQuery>) => {
      if (action.payload.refreshing) {
        state.page = 0;
        state.ids = null;
        state.results = null;
        state.hasMore = true;
      }
      state.isLoading = true;
      state.error = null;
    },
    getLatestResultsSuccessAction: (state, action: PayloadAction<LatestResult[]>) => {
      const { ids, items: results } = arrayToIdsMap(action.payload);
      state.isLoading = false;
      state.hasMore = action.payload.length === TAKE_ITEMS_VALUE;
      state.page += 1;
      state.ids = state.ids ? [...new Set([...state.ids, ...ids])] : ids;
      state.results = { ...state.results, ...results };
    },
    getLatestResultsFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getShortLatestResultsAction: (
      state,
      action: PayloadAction<Pick<GetLatestResultsQuery, 'query'> & RefreshingQuery>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    getShortLatestResultsSuccessAction: (state, action: PayloadAction<LatestResult[]>) => {
      const { ids, items: results } = arrayToIdsMap(action.payload);
      state.isLoading = false;
      state.shortIds = ids;
      state.shortResults = results;
    },
    getShortLatestResultsFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { actions, reducer } = slice;
