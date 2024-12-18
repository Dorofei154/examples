import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AppButton, FontText, ToolTip } from '@zalgiris-ventures/ui';
import { AnalyticsService } from '@zalgiris-ventures/core';

import { GamesAnalyticEvents } from '../../../../constants/analyticEvents';

import * as Styled from './styles';
import { GameInfoProps } from './types';

const GameInfoComponent: FC<GameInfoProps> = ({
  score,
  leagueName,
  matchType = '',
  date,
  hasToolTip = false,
  toolTipTitle,
  toolTipThemeColor = 'primary',
  time,
  status,
  isGameFinished = false,
  onBuyPress,
  hasBuyButton = false,
  id,
  ...props
}) => {
  const [t] = useTranslation('games', { keyPrefix: 'games' });

  const handleBuyPress = () => {
    AnalyticsService.logAnalyticEvent(GamesAnalyticEvents.BuyTicketsClicked, {
      game_id: id,
      game_status: status,
    });
    onBuyPress?.(id);
  };

  const Button = (
    <AppButton
      buttonColor="white"
      title={t('common.buyTicketButton')}
      variant="rounded"
      palletteColor={2}
      outlined
      onPress={handleBuyPress}
    />
  );
  return (
    <Styled.WrapGameInfo {...props}>
      <Styled.WrapGameInfoHeader>
        <FontText size="xs" palletteColor={60}>
          {leagueName} {matchType && `· ${matchType}`}
        </FontText>
      </Styled.WrapGameInfoHeader>
      <Styled.WrapGameInfoBody>
        <Styled.WrapGameInfoDate>
          <FontText size="s" weight={900}>
            {date}
          </FontText>
        </Styled.WrapGameInfoDate>
        {isGameFinished ? (
          <Styled.WrapGameInfoScore>
            <FontText weight={900}>{score}</FontText>
          </Styled.WrapGameInfoScore>
        ) : (
          <Styled.WrapGameInfoTime>
            <FontText size="s" weight={900}>
              {time}
            </FontText>
          </Styled.WrapGameInfoTime>
        )}
      </Styled.WrapGameInfoBody>
      {hasBuyButton && (
        <Styled.WrapTicketView>
          {hasToolTip ? (
            <ToolTip themeColor={toolTipThemeColor} title={toolTipTitle ?? ''} titleSize="xxs">
              {Button}
            </ToolTip>
          ) : (
            Button
          )}
        </Styled.WrapTicketView>
      )}
    </Styled.WrapGameInfo>
  );
};

export const GameInfo = memo(GameInfoComponent);
