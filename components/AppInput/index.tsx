import { forwardRef, RefObject, useImperativeHandle, useRef, useState } from 'react';
import { LayoutChangeEvent, TextInput } from 'react-native';

import { useTheme } from '../../styled';

import * as Styled from './styles';
import { AppInputProps } from './types';

export const AppInput = forwardRef<
  {
    focus: () => void;
  },
  AppInputProps
>(
  (
    {
      label,
      error,
      icon,
      onIconPress,
      errorColor = 'error',
      errorPalletteColor = 100,
      containerStyle,
      ...textInputProps
    },
    ref,
  ) => {
    const [isMultiline, setIsMultiline] = useState(false);
    const inputHeightRef = useRef(0);
    const initialInputHeightRef = useRef(0);
    const inputRef = useRef<TextInput>() as RefObject<TextInput>;

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef?.current?.focus();
      },
    }));

    const handleLayout = (e: LayoutChangeEvent) => {
      const { height } = e.nativeEvent.layout;
      if (inputHeightRef.current === 0) {
        inputHeightRef.current = height;
        initialInputHeightRef.current = height;
        return;
      }
      if (height > inputHeightRef.current && !isMultiline) {
        setIsMultiline(true);
        return;
      }
      if (height === initialInputHeightRef.current) {
        setIsMultiline(false);
      }
    };

    const theme = useTheme();
    return (
      <Styled.InputWrapper style={containerStyle}>
        {label && (
          <Styled.Label size="l" weight={600}>
            {label}
          </Styled.Label>
        )}
        <Styled.Wrapper isMultiline={isMultiline}>
          <Styled.Input
            hasIcon={Boolean(icon)}
            onLayout={handleLayout}
            placeholderTextColor={theme.pallette.white[60]}
            ref={inputRef}
            selectionColor={theme.pallette.primary[100]}
            {...textInputProps}
          />
          <Styled.Icon onPress={onIconPress}>{icon}</Styled.Icon>
        </Styled.Wrapper>
        {error && (
          <Styled.Error palletteColor={errorPalletteColor} color={errorColor} size="s">
            {error}
          </Styled.Error>
        )}
      </Styled.InputWrapper>
    );
  },
);
