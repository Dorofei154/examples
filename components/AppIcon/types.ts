import { ImageRequireSource } from 'react-native';
import { FastImageProps, Source } from 'react-native-fast-image';

import { ColorWithPalette } from '../../types';

export type AppIconProps = (
  | { name: string; source?: never }
  | { name?: string; source: Source | ImageRequireSource }
) & {
  size?: number;
  colorValue?: string;
  focused?: boolean;
  hasBackground?: boolean;
  backgroundColor?: ColorWithPalette['color'];
  backgroundSize?: number;
} & Partial<ColorWithPalette> &
  Omit<FastImageProps, 'source'>;
