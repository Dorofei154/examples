import { TextStyle, ViewProps } from 'react-native';

import { FontSize } from '../../types';

export interface TeamProps extends ViewProps {
  logoUrl: string;
  logoSize?: number;
  name?: string;
  nameSize?: FontSize;
  variant?: 'row' | 'column';
  textAlign?: 'left' | 'center' | 'right';
  margin?: number;
  nameStyle?: TextStyle;
  useTeamNameTicker?: boolean;
}
