import { Effect, put, select, takeLatest } from 'redux-saga/effects';

import { CrashlyticsService, gqlQuery } from '@zalgiris-ventures/core';

import { TAKE_ITEMS_VALUE, TAKE_SHORT_ITEMS_VALUE } from '../../constants/pagination';
import { getLatestResultsQuery } from '../../queries/latestResults';
import { GetLatestResultsQuery, GetLatestResultsResult } from '../../queries/latestResults/types';
import { latestResultsPageSelector } from '../selectors/latestResults';
import {
  getLatestResultsAction,
  getLatestResultsSuccessAction,
  getShortLatestResultsAction,
  getShortLatestResultsFailedAction,
  getShortLatestResultsSuccessAction,
} from '../slices';

export class LatestResultsSagaWorker {
  static *getLatestResults({ payload: { query } }: { payload: Pick<GetLatestResultsQuery, 'query'> }) {
    const page: number = yield select(latestResultsPageSelector);
    const pagination = { take: TAKE_ITEMS_VALUE, skip: page * TAKE_ITEMS_VALUE };

    try {
      const {
        data: {
          getEndedGames: { data },
        },
      }: GetLatestResultsResult = yield gqlQuery<GetLatestResultsResult, GetLatestResultsQuery>({
        query: getLatestResultsQuery,
        variables: { pagination, query },
      });
      yield put(getLatestResultsSuccessAction(data));
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      console.log('error', { error });
      yield put(getShortLatestResultsFailedAction(error.message));
    }
  }

  static *getShortLatestResults({ payload: { query } }: { payload: Pick<GetLatestResultsQuery, 'query'> }) {
    const pagination = { take: TAKE_SHORT_ITEMS_VALUE, skip: 0 };

    try {
      const {
        data: {
          getEndedGames: { data },
        },
      }: GetLatestResultsResult = yield gqlQuery<GetLatestResultsResult, GetLatestResultsQuery>({
        query: getLatestResultsQuery,
        variables: { pagination, query },
      });
      yield put(getShortLatestResultsSuccessAction(data));
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      console.log('error', { error });
      yield put(getShortLatestResultsFailedAction(error.message));
    }
  }
}

export function* latestResultsSaga(): Generator<Effect, void> {
  yield takeLatest(getLatestResultsAction, LatestResultsSagaWorker.getLatestResults);
  yield takeLatest(getShortLatestResultsAction, LatestResultsSagaWorker.getShortLatestResults);
}
