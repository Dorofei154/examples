import { View } from 'react-native';

import { css, styled } from '../../styled';
import { AppImage } from '../AppImage';

import { TeamProps } from './types';

const alignStyles = css`
  align-items: center;
`;

export const RowContainer = styled(View)`
  ${alignStyles}
  flex-direction: row;
`;

export const ColumnContainer = styled(View)`
  ${alignStyles}
  flex-direction: column;
  flex: 1;
`;

export const Logo = styled(AppImage)<{ variant: TeamProps['variant']; logoMargin: number }>`
  margin: 0px;
  ${({ variant, logoMargin }) =>
    variant && variant === 'column' ? `margin-bottom: ${logoMargin}px;` : `margin-right: ${logoMargin}px`}
`;
