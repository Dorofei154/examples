import { ViewProps } from 'react-native';

import { ButtonToolTipProps } from '@zalgiris-ventures/ui';

import { BaseGameDataProps } from '../../types';

export interface GameInfoProps extends Omit<ViewProps, 'id'>, ButtonToolTipProps, BaseGameDataProps {
  date: string;
  time: string;
}
