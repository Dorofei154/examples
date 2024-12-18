import { fork } from "redux-saga/effects";

import { leaguesSaga } from "./leagues";
import { latestResultsSaga } from "./latestResults";
import { upcomingGamesSaga } from "./upcomingGames";
import { playersSaga } from "./players";
import { activeSeasonSaga } from "./activeSeason";

export function* sagas(): Generator {
  yield fork(leaguesSaga);
  yield fork(latestResultsSaga);
  yield fork(upcomingGamesSaga);
  yield fork(playersSaga);
  yield fork(activeSeasonSaga);
}
