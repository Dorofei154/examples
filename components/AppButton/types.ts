import { TouchableOpacityProps } from 'react-native';

import { AppTheme, PalletteColor } from '../../types';

export type ButtonVariant = 'normal' | 'rounded';

export interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: ButtonVariant;
  buttonColor?: keyof AppTheme['pallette'];
  palletteColor?: PalletteColor;
  textColor?: keyof AppTheme['pallette'];
  borderColor?: keyof AppTheme['pallette'];
  textPallette?: PalletteColor;
  outlined?: boolean;
  touched?: boolean;
  loading?: boolean;
}

export interface ButtonStateProps {
  outlined: boolean;
  disabled: boolean;
}

export interface DefaultButtonContainerData {
  outlined: boolean;
  borderColor?: keyof AppTheme['pallette'];
}
