import { combineReducers, ReducersMapObject } from "@reduxjs/toolkit";

import * as leaguesStore from "./leagues";
import * as latestResultsStore from "./latestResults";
import * as upcomingGamesStore from "./upcomingGames";
import * as playersStore from "./players";
import * as activeSeasonStore from "./activeSeason";

export interface GameState {
  games: {
    leaguesStore: leaguesStore.State;
    latestResultsStore: latestResultsStore.State;
    upcomingGamesStore: upcomingGamesStore.State;
    playersStore: playersStore.State;
    activeSeasonStore: activeSeasonStore.State;
  };
}

export const reducers = combineReducers({
  leaguesStore: leaguesStore.reducer,
  latestResultsStore: latestResultsStore.reducer,
  upcomingGamesStore: upcomingGamesStore.reducer,
  playersStore: playersStore.reducer,
  activeSeasonStore: activeSeasonStore.reducer,
});

export const rootReducers: ReducersMapObject = {
  games: reducers,
};

export const {
  getLeaguesAction,
  getLeaguesSuccessAction,
  getLeaguesFailedAction,
} = leaguesStore.actions;

export const {
  getLatestResultsAction,
  getLatestResultsSuccessAction,
  getLatestResultsFailedAction,
  getShortLatestResultsAction,
  getShortLatestResultsSuccessAction,
  getShortLatestResultsFailedAction,
} = latestResultsStore.actions;

export const {
  getUpcomingGamesAction,
  getUpcomingGamesSuccessAction,
  getUpcomingGamesFailedAction,
  getShortUpcomingGamesAction,
  getShortUpcomingGamesFailedAction,
  getShortUpcomingGamesSuccessAction,
} = upcomingGamesStore.actions;

export const {
  getMainTeamPlayersAction,
  getMainTeamPlayersSuccessAction,
  getMainTeamPlayersFailedAction,
} = playersStore.actions;

export const {
  getActiveSeasonAction,
  getActiveSeasonSuccessAction,
  getActiveSeasonFailedAction,
  setMyStatisticAction,
} = activeSeasonStore.actions;
