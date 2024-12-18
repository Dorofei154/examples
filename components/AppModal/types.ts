import { ModalProps } from 'react-native-modal';

import { ColorWithPalette } from '../../types';
import { AppButtonProps } from '../AppButton/types';

export interface AppModalProps extends Partial<ModalProps> {
  iconName?: string;
  title?: string;
  subTitle?: string;
  buttons?: AppButtonProps[];
  iconBackground?: ColorWithPalette['color'];
  iconColor?: ColorWithPalette['color'];
  iconSize?: number;
  iconBackgroundSize?: number;
}
