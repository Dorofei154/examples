import React, { Ref } from "react";
import { ColorValue, TextInput, TextInputProps, ViewStyle } from "react-native";

import { AppTheme, PalletteColor } from "../../types";

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  ref?: Ref<TextInput>;
  errorColor?: keyof AppTheme["pallette"];
  errorPalletteColor?: PalletteColor;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  placeholderColor?: ColorValue;
  onIconPress?: () => void;
}
