import { FC } from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from '../../styled';
import { FontTextProps } from '../FontText/types';

import * as Styled from './styles';
import { AppButtonProps, ButtonVariant } from './types';

const buttonComponent = {
  normal: Styled.NormalButtonContainer,
  rounded: Styled.RoundedButtonContainer,
};

const getTextSize = (variant: ButtonVariant): { size: FontTextProps['size']; weight: FontTextProps['weight'] } => {
  if (variant === 'rounded') {
    return {
      weight: 600,
      size: 'l',
    };
  }
  return {
    weight: 700,
    size: 'x',
  };
};

export const AppButton: FC<AppButtonProps> = ({
  title,
  variant = 'normal',
  rightIcon,
  leftIcon,
  children,
  textColor = 'white',
  buttonColor = 'primary',
  textPallette = 100,
  palletteColor = 100,
  outlined = false,
  touched = false,
  loading = false,
  borderColor,
  disabled,
  ...elementProps
}) => {
  const theme = useTheme();
  const textSize = getTextSize(variant);
  const Container = buttonComponent[variant];
  return (
    <Container
      disabled={Boolean(loading || disabled)}
      palletteColor={palletteColor}
      touched={touched}
      color={buttonColor}
      outlined={outlined}
      borderColor={borderColor}
      {...elementProps}>
      {leftIcon}
      {title ? (
        <Styled.ButtonTitle align="center" color={textColor} palletteColor={textPallette} {...textSize}>
          {title}
        </Styled.ButtonTitle>
      ) : (
        children
      )}

      {(loading || rightIcon) && (
        <Styled.RightIconWrapper>
          {loading ? <ActivityIndicator color={theme.pallette.white[100]} /> : rightIcon}
        </Styled.RightIconWrapper>
      )}
    </Container>
  );
};
