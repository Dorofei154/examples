import { call, getContext } from 'redux-saga/effects';

import { ApolloClient, MutationOptions, OperationVariables } from '@apollo/client';

export function* gqlMutate<TResult, TVariables extends OperationVariables = OperationVariables>(
  options: MutationOptions<TResult, TVariables>,
): Generator<unknown, TResult> {
  try {
    const apolloClient = (yield getContext('apolloClient')) as never as ApolloClient<unknown>;
    const result: TResult = (yield call(() =>
      apolloClient.mutate({ fetchPolicy: 'no-cache', errorPolicy: 'all', ...options }),
    )) as never;
    return result;
  } catch (e: any) {
    throw e?.networkError?.result?.errors[0] || e;
  }
}
