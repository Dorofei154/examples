import { call, getContext } from 'redux-saga/effects';

import { ApolloClient, OperationVariables, QueryOptions } from '@apollo/client';

export function* gqlQuery<TResult, TVariables extends OperationVariables = OperationVariables>(
  options: QueryOptions<TVariables, TResult>,
): Generator<unknown, TResult> {
  try {
    const apolloClient = (yield getContext('apolloClient')) as never as ApolloClient<unknown>;
    const result: TResult = (yield call(() => apolloClient.query({ fetchPolicy: 'no-cache', ...options }))) as never;
    return result;
  } catch (e: any) {
    throw e?.networkError?.result?.errors[0] || e;
  }
}
