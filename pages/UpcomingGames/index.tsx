import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Dropdown, EmptyPlaceholder, useTheme } from '@zalgiris-ventures/ui';
import { useBackHandler } from '@zalgiris-ventures/core';
import { RouteNames } from '@zalgiris-ventures/features/core';

import { Game } from '../../components/Game';
import {
  hasMoreUpcomingGamesSelector,
  upcomingGamesIdsSelector,
  upcomingGamesLoadingSelector,
  upcomingGamesSelector,
} from '../../store';
import { getUpcomingGamesAction } from '../../store/slices';
import { useUpcomingGames } from '../../utils';
import { getTicketsLeftProps } from '../../utils/helpers/getTicketsLeftProps';
import { useGame } from '../../utils/hooks/useGame';
import { useGames } from '../../utils/hooks/useGames';
import { GamesStackParamList } from '../../router/types';

import * as Styled from './styles';

export const UpcomingGames = () => {
  const [t] = useTranslation('games', { keyPrefix: 'games' });
  const isLoading = useSelector(upcomingGamesLoadingSelector);
  const upcomingGamesIds = useSelector(upcomingGamesIdsSelector);
  const hasMore = useSelector(hasMoreUpcomingGamesSelector);
  const navigation = useNavigation<NavigationProp<GamesStackParamList>>();
  const route = useRoute<RouteProp<GamesStackParamList>>();
  const { previousScreen } = route.params as { previousScreen: string };
  useBackHandler(navigation, previousScreen, {
    parentScreen: RouteNames.GamesStack.UpcomingGames,
    previousScreen: RouteNames.GamesStack.UpcomingGames,
  });

  const theme = useTheme();
  const { handleGamePress } = useGame();
  const { handleBuyPress, upcomingGames } = useUpcomingGames(upcomingGamesSelector);
  const { selectedDropdownItem, handleLeagueSelect, handleReachEnd, handleRefresh, leagues } = useGames(
    getUpcomingGamesAction,
    hasMore,
    isLoading,
  );

  const renderEmptyListPlaceholder = () => {
    return <EmptyPlaceholder title={t('common.emptyUpcomingGames')} iconName="games" />;
  };

  const onGamePress = useCallback((id: string) => handleGamePress(id), [handleGamePress]);

  const renderGame = ({ item, index }: { item: string; index: number }) => {
    if (upcomingGames) {
      const { ticketsLeft, startingAt, away, home, league, id, status } = upcomingGames[item];

      return (
        <Game
          {...getTicketsLeftProps(ticketsLeft, t)}
          key={id}
          matchType=""
          leagueName={league.name}
          isLast={index + 1 === upcomingGamesIds?.length}
          gameDateIso={startingAt}
          team1Name={home.title}
          team2Name={away.title}
          team1LogoUrl={home.logoUrl}
          team2LogoUrl={away.logoUrl}
          isGameFinished={false}
          status={status}
          id={id}
          onPress={onGamePress}
          onBuyPress={handleBuyPress}
        />
      );
    }
    return null;
  };

  return (
    <Styled.Wrap edges={['left', 'right']}>
      <Styled.WrapHeader>
        <Dropdown data={leagues} onSelect={handleLeagueSelect} selected={selectedDropdownItem} />
      </Styled.WrapHeader>
      <Styled.WrapContent>
        <Styled.GamesList
          showBackground={Boolean(upcomingGamesIds?.length)}
          data={upcomingGamesIds}
          renderItem={renderGame}
          ListEmptyComponent={!isLoading ? renderEmptyListPlaceholder : null}
          refreshControl={
            <RefreshControl tintColor={theme.pallette.white[100]} refreshing={isLoading} onRefresh={handleRefresh} />
          }
          keyExtractor={itemId => itemId}
          onEndReachedThreshold={0.5}
          onEndReached={handleReachEnd}
        />
      </Styled.WrapContent>
    </Styled.Wrap>
  );
};
