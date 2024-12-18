import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arrayToIdsMap } from '@zalgiris-ventures/core';
import { logoutAction } from '@zalgiris-ventures/features/core';

import { LeagueResource } from '../../interfaces/league';

export interface State {
  ids: string[] | null;
  leagues: Record<string, LeagueResource> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  ids: null,
  leagues: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'games/leagues',
  initialState,
  extraReducers(builder) {
    builder.addCase(logoutAction, () => initialState);
  },
  reducers: {
    getLeaguesAction: state => {
      state.isLoading = true;
    },
    getLeaguesSuccessAction: (state, action: PayloadAction<LeagueResource[]>) => {
      const { ids, items: leagues } = arrayToIdsMap(action.payload);
      state.ids = ids;
      state.leagues = leagues;
      state.isLoading = false;
    },
    getLeaguesFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { actions, reducer } = slice;
