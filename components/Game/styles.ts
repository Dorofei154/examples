import { styled, Team as UiTeam } from '@zalgiris-ventures/ui';

import { GameInfo as GameInfoComponent } from './components/GameInfo';

export const WrapGame = styled.View<{ isLast?: boolean; paddingBottom?: number }>`
  padding: 16px;
  flex-direction: row;
  min-height: 110px;
  border-bottom-width: ${({ isLast }) => (isLast ? '0px' : '0.5px')};
  border-bottom-color: ${({ theme }) => theme.pallette.white[10]};
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px`};
`;

export const Team = styled(UiTeam)<{
  paddingTop?: number;
}>`
  flex: 1;
  ${({ paddingTop }) => ({ paddingTop })}
`;

export const GameInfo = styled(GameInfoComponent)`
  flex: 1.5;
`;
