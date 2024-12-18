import FastImage from 'react-native-fast-image';

import { styled } from '../../styled';
import { ColorWithPalette } from '../../types';

export const Icon = styled(FastImage)<
  {
    size: number;
    colorValue?: string;
  } & ColorWithPalette
>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const IconBackground = styled.View<{ backgroundColor: ColorWithPalette['color']; backgroundSize: number }>`
  background-color: ${({ theme, backgroundColor }) =>
    typeof theme.pallette[backgroundColor] === 'string'
      ? theme.pallette[backgroundColor]
      : theme.pallette[backgroundColor][100]};
  height: ${({ backgroundSize }) => backgroundSize}px;
  width: ${({ backgroundSize }) => backgroundSize}px;
  border-radius: ${({ backgroundSize }) => backgroundSize / 2}px;
  justify-content: center;
  align-items: center;
`;
