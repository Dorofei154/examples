import React, { FC, memo, useMemo } from 'react';
import { ColorValue, ImageURISource } from 'react-native';

import { useTheme } from '../../styled';

import { DEFAULT_ICON_SIZE } from './data';
import * as Styled from './styles';
import { AppIconProps } from './types';

const AppIconComponent: FC<AppIconProps> = ({
  size = DEFAULT_ICON_SIZE,
  name,
  source: src,
  color = 'primary',
  palletteColor = 100,
  colorValue,
  focused = false,
  hasBackground = false,
  backgroundColor = 'primary',
  backgroundSize = 48,
  ...props
}) => {
  const theme = useTheme();

  const tintColor =
    colorValue || typeof theme.pallette[color] === 'string'
      ? theme.pallette[color]
      : theme.pallette[color][palletteColor || 100];

  const hasFilled = focused ? theme.images[`${name}_filled`] : false;

  const source = useMemo(() => {
    if (src && (src as ImageURISource)?.uri) return src;
    if (!name) return src;
    return hasFilled ? theme.images[`${name}_filled`] : theme.images[name];
  }, [src, name, hasFilled, theme.images]);

  const Icon = (
    <Styled.Icon
      color={focused && hasFilled ? color : color}
      colorValue={colorValue}
      size={size}
      tintColor={tintColor === 'transparent' ? undefined : (tintColor as ColorValue)}
      source={source}
      palletteColor={palletteColor}
      resizeMode="contain"
      {...props}
    />
  );

  return hasBackground ? (
    <Styled.IconBackground backgroundSize={backgroundSize} backgroundColor={backgroundColor}>
      {Icon}
    </Styled.IconBackground>
  ) : (
    Icon
  );
};

export const AppIcon = memo(AppIconComponent);
