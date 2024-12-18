import { all, Effect, put, select, takeLatest } from 'redux-saga/effects';

import { CrashlyticsService, gqlQuery } from '@zalgiris-ventures/core';

import { SeasonGamePredictionItems } from '../../interfaces/predictions';
import { getCurrentActiveSeasonQuery } from '../../queries/activeSeason';
import { GetCurrentActiveSeasonQuery, GetCurrentActiveSeasonResult } from '../../queries/activeSeason/types';
import { availablePredictionsPageSelector } from '../selectors/activeSeason';
import {
  getActiveSeasonAction,
  getActiveSeasonFailedAction,
  getActiveSeasonSuccessAction,
  saveGameUserPredictionsAction,
  setMyStatisticAction,
} from '../slices';
import { TAKE_PREDICTIONS_ITEMS_VALUE } from '../slices/activeSeason';

export class ActiveSeasonSagaWorker {
  static *saveGameUserPredictions(predictions: SeasonGamePredictionItems) {
    yield all(
      predictions.data.map(item => {
        return put(
          saveGameUserPredictionsAction({
            isHistorical: item.isHistorical,
            gameData: item.game,
            isCurrentSeasonPredictions: true,
          }),
        );
      }),
    );
  }

  static *getActiveSeason() {
    const availablePredictionsPage: number = yield select(availablePredictionsPageSelector);
    const availablePredictionsPagination = {
      take: TAKE_PREDICTIONS_ITEMS_VALUE,
      skip: availablePredictionsPage * TAKE_PREDICTIONS_ITEMS_VALUE,
    };
    const historicalPredictionsPage: number = yield select(availablePredictionsPageSelector);
    const historicalPredictionsPagination = {
      take: TAKE_PREDICTIONS_ITEMS_VALUE,
      skip: historicalPredictionsPage * TAKE_PREDICTIONS_ITEMS_VALUE,
    };
    try {
      const {
        data: {
          getCurrentActiveSeason: { data },
        },
      }: GetCurrentActiveSeasonResult = yield gqlQuery<GetCurrentActiveSeasonResult, GetCurrentActiveSeasonQuery>({
        query: getCurrentActiveSeasonQuery,
        variables: { availablePredictionsPagination, historicalPredictionsPagination },
      });
      if (data?.myPredictionStats?.data) {
        yield put(setMyStatisticAction(data?.myPredictionStats));
      }
      yield put(getActiveSeasonSuccessAction(data));
      if (data.availableGamePredictions) {
        yield ActiveSeasonSagaWorker.saveGameUserPredictions(data.availableGamePredictions);
      }
      if (data.historicalGamePredictions) {
        yield ActiveSeasonSagaWorker.saveGameUserPredictions(data.historicalGamePredictions);
      }
    } catch (error: any) {
      CrashlyticsService.reportError(error);
      yield put(getActiveSeasonFailedAction(error.message));
    }
  }
}

export function* activeSeasonSaga(): Generator<Effect, void> {
  yield takeLatest(getActiveSeasonAction, ActiveSeasonSagaWorker.getActiveSeason);
}
