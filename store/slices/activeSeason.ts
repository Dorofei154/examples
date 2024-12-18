import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RefreshingQuery, WithNull } from '@zalgiris-ventures/core';
import { logoutAction } from '@zalgiris-ventures/features/core';

import { myPredictionStatsItems } from '../../interfaces/myPredictionStats';
import { DefaultSeasonResourceFields, SeasonResource } from '../../interfaces/season';

interface SeasonState extends WithNull<DefaultSeasonResourceFields> {
  available: {
    page: number;
    hasMore: boolean;
  };
  historical: {
    page: number;
    hasMore: boolean;
  };
}

export interface State {
  myPredictionStats: myPredictionStatsItems | null;
  season: SeasonState;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  season: {
    available: {
      hasMore: true,
      page: 0,
    },
    historical: {
      hasMore: true,
      page: 0,
    },
    id: null,
    title: null,
    year: null,
  },
  myPredictionStats: null,
  isLoading: false,
  error: null,
};

export const TAKE_PREDICTIONS_ITEMS_VALUE = 3;

const slice = createSlice({
  name: 'games/activeSeason',
  initialState,
  extraReducers(builder) {
    builder.addCase(logoutAction, () => initialState);
  },
  reducers: {
    getActiveSeasonAction: (
      state,
      action: PayloadAction<{ historical?: RefreshingQuery; available?: RefreshingQuery }>,
    ) => {
      if (action.payload.available?.refreshing) {
        state.season.available.page = 0;
        state.season.available.hasMore = true;
      }
      if (action.payload.historical?.refreshing) {
        state.season.historical.page = 0;
        state.season.historical.hasMore = true;
      }
      state.isLoading = true;
      state.error = null;
    },
    getActiveSeasonSuccessAction: (state, action: PayloadAction<SeasonResource>) => {
      const availablePredictions = action.payload.availableGamePredictions?.data;
      const historicalPredictions = action.payload.historicalGamePredictions?.data;
      if (availablePredictions) {
        state.season.available.page = state.season.available.hasMore
          ? state.season.available.page + 1
          : state.season.available.page;
        state.season.available.hasMore = availablePredictions.length === TAKE_PREDICTIONS_ITEMS_VALUE;
      }
      if (historicalPredictions) {
        state.season.historical.page = state.season.historical.hasMore
          ? state.season.historical.page + 1
          : state.season.historical.page;
        state.season.historical.hasMore = historicalPredictions.length === TAKE_PREDICTIONS_ITEMS_VALUE;
      }
      state.season.id = action.payload.id;
      state.season.title = action.payload.title;
      state.season.year = action.payload.year;
      state.isLoading = false;
    },
    getActiveSeasonFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setMyStatisticAction: (state, action: PayloadAction<myPredictionStatsItems>) => {
      state.myPredictionStats = action.payload;
    },
  },
});

export const { actions, reducer } = slice;
