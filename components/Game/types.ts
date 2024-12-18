import { ButtonToolTipProps } from '@zalgiris-ventures/ui';

import { GameStatuses } from '../../constants/game';
import { TeamBasicProps } from '../../interfaces/team';

export interface BaseGameDataProps {
  matchType?: string;
  score?: string;
  leagueName: string;
  status: GameStatuses;
  isGameFinished?: boolean;
  onBuyPress?: (id: string) => void;
  hasBuyButton?: boolean;
  id: string;
}
export interface GameProps extends ButtonToolTipProps, BaseGameDataProps, TeamBasicProps {
  isLast?: boolean;
  gameDateIso: string;
  onPress?: (id: string) => void;
}
