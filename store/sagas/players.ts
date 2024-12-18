import { Effect, put, takeLatest } from 'redux-saga/effects';

import { CrashlyticsService, gqlQuery } from '@zalgiris-ventures/core';

import { getMainTeamPlayersQuery } from '../../queries/getMainTeamPlayers/index';
import { GetMainTeamPlayersResult } from '../../queries/getMainTeamPlayers/types';
import { getMainTeamPlayersAction, getMainTeamPlayersFailedAction, getMainTeamPlayersSuccessAction } from '../slices';

export class PlayersSagaWorker {
  static *getMainTeamPlayers() {
    try {
      const {
        data: {
          getMainTeamPlayers: { data },
        },
      }: GetMainTeamPlayersResult = yield gqlQuery<GetMainTeamPlayersResult>({
        query: getMainTeamPlayersQuery,
      });
      const activePlayers = data?.filter(player => player.isActiveMember);
      yield put(getMainTeamPlayersSuccessAction(activePlayers));
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      yield put(getMainTeamPlayersFailedAction(error.message));
    }
  }
}

export function* playersSaga(): Generator<Effect, void> {
  yield takeLatest(getMainTeamPlayersAction, PlayersSagaWorker.getMainTeamPlayers);
}
