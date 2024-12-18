import { TouchableOpacity } from 'react-native';

import { css, styled } from '../../styled';
import { AppTheme, ColorWithPalette } from '../../types';
import { FontText } from '../FontText';

import { DefaultButtonContainerData } from './types';

const getBackGroundColor = ({
  outlined,
  theme,
  color,
  palletteColor,
}: ColorWithPalette & { outlined: boolean; theme: AppTheme }) => {
  if (outlined) {
    return 'transparent';
  }
  return typeof theme.pallette[color] === 'object' ? theme.pallette[color][palletteColor] : theme.pallette[color];
};

const getBorderColor = ({
  outlined,
  theme,
  borderColor,
}: DefaultButtonContainerData & {
  theme: AppTheme;
}) => {
  if (outlined) {
    return `1px solid ${theme.pallette.white[10]}`;
  }
  if (borderColor) {
    return theme.pallette[borderColor][100];
  }
  return 'none';
};

const commonButtonStyles = css<ColorWithPalette & DefaultButtonContainerData>`
  background-color: ${props => getBackGroundColor({ ...props })};
  border: ${({ theme, outlined, borderColor }) => getBorderColor({ outlined, theme, borderColor })};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const NormalButtonContainer = styled(TouchableOpacity)<ColorWithPalette & DefaultButtonContainerData>`
  ${commonButtonStyles}
  padding: 12px 16px;
  border-radius: 12px;
  min-height: 48px;
  width: 100%;
`;

export const RoundedButtonContainer = styled(TouchableOpacity)<
  ColorWithPalette & DefaultButtonContainerData & { touched?: boolean }
>`
  ${commonButtonStyles};

  border: ${({ theme, outlined, touched }) => {
    if (outlined && touched) {
      return `1px solid ${theme.pallette.white[80]}`;
    }
    return outlined ? `1px solid ${theme.pallette.white[10]}` : 'none';
  }};
  background-color: ${({ theme, color, palletteColor }) => {
    return theme.pallette[color] && typeof theme.pallette[color] === 'object'
      ? theme.pallette[color][palletteColor]
      : theme.pallette[color];
  }};
  padding: 8px 16px;
  border-radius: 100px;
`;

export const ButtonTitle = styled(FontText)<ColorWithPalette>`
  color: ${({ theme, color, palletteColor }) => theme.pallette[color][palletteColor]};
  text-align: center;
`;

export const RightIconWrapper = styled.View`
  padding-left: 8px;
`;
