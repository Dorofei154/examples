import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  authErrorSelector,
  isAuthProcessingSelector,
  recoverAccountRequestAction,
  resetErrorAction,
  resetPasswordSchema,
} from '@zalgiris-ventures/features/core';
import { AnalyticsService } from '@zalgiris-ventures/core';

import { AuthWrapper } from '../../components/AuthWrapper';
import * as AuthStyled from '../../styles/auth';
import { ResetPasswordFormValues } from '../../interfaces/resetPassword';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';
import { AuthAnalyticEvents } from '../../constants/analyticEvents';

export const ResetPassword = () => {
  const [t] = useTranslation('auth', { keyPrefix: 'forgotPasswordScreen' });
  const methods = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(
      resetPasswordSchema({
        requireError: t('requireError'),
        invalidEmailError: t('invalidEmailError'),
      }),
    ),
  });
  const dispatch = useDispatch();
  const authProcessing = useSelector(isAuthProcessingSelector);
  const authError = useSelector(authErrorSelector);
  const handleSubmit: SubmitHandler<ResetPasswordFormValues> = ({ email }) => {
    AnalyticsService.logAnalyticEvent(AuthAnalyticEvents.ResetPasswordClicked);
    dispatch(recoverAccountRequestAction({ email: email.toLocaleLowerCase().replace(/\s/g, '') }));
  };

  useEffect(() => {
    dispatch(resetErrorAction());
  }, [dispatch]);

  return (
    <AuthWrapper>
      <AuthStyled.ScrollViewContainer keyboardShouldPersistTaps="handled">
        <AuthStyled.PageDescription align="center" size="l" palletteColor={80}>
          {t('description')}
        </AuthStyled.PageDescription>
        <FormProvider {...methods}>
          <ResetPasswordForm onSubmit={handleSubmit} error={authError ?? ''} loading={authProcessing} />
        </FormProvider>
      </AuthStyled.ScrollViewContainer>
    </AuthWrapper>
  );
};
