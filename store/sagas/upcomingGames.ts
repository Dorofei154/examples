import { Effect, put, select, takeLatest } from 'redux-saga/effects';

import { CrashlyticsService, gqlQuery } from '@zalgiris-ventures/core';

import { TAKE_ITEMS_VALUE, TAKE_SHORT_ITEMS_VALUE } from '../../constants/pagination';
import { getUpcomingGamesQuery } from '../../queries/upcomingGames';
import { GetUpcomingGamesQuery, GetUpcomingGamesResult } from '../../queries/upcomingGames/types';
import { upcomingGamesPageSelector } from '../selectors';
import {
  getShortUpcomingGamesAction,
  getShortUpcomingGamesFailedAction,
  getShortUpcomingGamesSuccessAction,
  getUpcomingGamesAction,
  getUpcomingGamesFailedAction,
  getUpcomingGamesSuccessAction,
} from '../slices';

export class UpcomingGamesSagaWorker {
  static *getUpcomingGames({ payload: { query } }: { payload: Pick<GetUpcomingGamesQuery, 'query'> }) {
    try {
      const page: number = yield select(upcomingGamesPageSelector);
      const pagination = { take: TAKE_ITEMS_VALUE, skip: page * TAKE_ITEMS_VALUE };
      const {
        data: {
          getUpcomingGames: { data },
        },
      }: GetUpcomingGamesResult = yield gqlQuery<GetUpcomingGamesResult, GetUpcomingGamesQuery>({
        query: getUpcomingGamesQuery,
        variables: { pagination, query },
      });
      yield put(getUpcomingGamesSuccessAction(data));
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      yield put(getUpcomingGamesFailedAction(error.message));
    }
  }

  static *getShortListUpcomingGames({ payload: { query } }: { payload: Pick<GetUpcomingGamesQuery, 'query'> }) {
    try {
      const pagination = { take: TAKE_SHORT_ITEMS_VALUE, skip: 0 };
      const {
        data: {
          getUpcomingGames: { data },
        },
      }: GetUpcomingGamesResult = yield gqlQuery<GetUpcomingGamesResult, GetUpcomingGamesQuery>({
        query: getUpcomingGamesQuery,
        variables: { pagination, query },
      });
      yield put(getShortUpcomingGamesSuccessAction(data));
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      yield put(getShortUpcomingGamesFailedAction(error.message));
    }
  }
}

export function* upcomingGamesSaga(): Generator<Effect, void> {
  yield takeLatest(getUpcomingGamesAction, UpcomingGamesSagaWorker.getUpcomingGames);
  yield takeLatest(getShortUpcomingGamesAction, UpcomingGamesSagaWorker.getShortListUpcomingGames);
}
