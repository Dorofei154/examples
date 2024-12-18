import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arrayToIdsMap } from '@zalgiris-ventures/core';
import { logoutAction } from '@zalgiris-ventures/features/core';

import { MainTeamPlayerResource } from '../../interfaces/player';

export interface State {
  ids: string[] | null;
  players: Record<string, MainTeamPlayerResource> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  players: null,
  ids: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'games/players',
  initialState,
  extraReducers(builder) {
    builder.addCase(logoutAction, () => initialState);
  },
  reducers: {
    getMainTeamPlayersAction: state => {
      state.isLoading = true;
      state.error = null;
    },
    getMainTeamPlayersSuccessAction: (state, action: PayloadAction<MainTeamPlayerResource[]>) => {
      const { ids, items: players } = arrayToIdsMap(action.payload);
      state.isLoading = false;
      state.ids = ids;
      state.players = players;
    },
    getMainTeamPlayersFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { actions, reducer } = slice;
