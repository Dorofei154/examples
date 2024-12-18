import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';

import dayjs from 'dayjs';
import { AppLanguages } from '@zalgiris-ventures/core';

import { GameProps } from './types';
import * as Styled from './styles';

const TOP_PADDING = 25;

const GameComponent: FC<GameProps> = ({
  isLast,
  gameDateIso,
  team1Name,
  team2Name,
  team1LogoUrl,
  team2LogoUrl,
  hasToolTip,
  id,
  status,
  onPress,
  ...props
}) => {
  const date = dayjs(gameDateIso).locale(AppLanguages.Lt).format('ddd, MM-DD').toUpperCase();
  const time = dayjs(gameDateIso).format('HH:mm');

  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <Pressable onPress={handlePress}>
      <Styled.WrapGame isLast={isLast} paddingBottom={hasToolTip ? 60 : 16}>
        <Styled.Team
          useTeamNameTicker
          paddingTop={hasToolTip ? TOP_PADDING : 0}
          logoUrl={team1LogoUrl || ''}
          name={team1Name}
        />
        <Styled.GameInfo status={status} id={id} hasToolTip={hasToolTip} date={date} time={time} {...props} />
        <Styled.Team
          useTeamNameTicker
          paddingTop={hasToolTip ? TOP_PADDING : 0}
          logoUrl={team2LogoUrl || ''}
          name={team2Name}
        />
      </Styled.WrapGame>
    </Pressable>
  );
};

export const Game = memo(GameComponent);
