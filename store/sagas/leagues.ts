import { Effect, put, takeLatest } from 'redux-saga/effects';

import { CrashlyticsService, gqlQuery } from '@zalgiris-ventures/core';

import { getCurrentSeasonActiveLeagues } from '../../queries/allLeagues';
import { GetAllLeaguesResult } from '../../queries/allLeagues/types';
import { getLeaguesAction, getLeaguesFailedAction, getLeaguesSuccessAction } from '../slices';

export class LeaguesSagaWorker {
  static *getAllLeagues() {
    try {
      const {
        data: {
          getCurrentSeasonActiveLeagues: { data },
        },
      }: GetAllLeaguesResult = yield gqlQuery<GetAllLeaguesResult>({
        query: getCurrentSeasonActiveLeagues,
      });
      yield put(getLeaguesSuccessAction(data));
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      yield put(getLeaguesFailedAction(error.message));
    }
  }
}

export function* leaguesSaga(): Generator<Effect, void> {
  yield takeLatest(getLeaguesAction, LeaguesSagaWorker.getAllLeagues);
}
