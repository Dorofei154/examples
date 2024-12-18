import { Controller, useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@zalgiris-ventures/ui';

import { ResetPasswordFormValues } from '../../interfaces';
import * as Styled from '../../styles/forms';

import { ResetPasswordFormProps } from './types';

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onSubmit, error, loading }) => {
  const theme = useTheme();
  const [t] = useTranslation('auth', { keyPrefix: 'forgotPasswordScreen' });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ResetPasswordFormValues>();

  return (
    <Styled.FormWrapper>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <Styled.Input
            error={errors.email?.message || error}
            value={value}
            onChangeText={onChange}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={t('inputEmailPlaceholder')}
            placeholderTextColor={theme.pallette.white[60]}
            label={t('inputEmailTitle')}
          />
        )}
      />
      <Styled.Button loading={loading} title={t('buttonReset')} onPress={handleSubmit(onSubmit)} />
    </Styled.FormWrapper>
  );
};
