import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';

import { upcomingGamesSelector, upcomingShortGamesSelector } from '../../store';

export const useUpcomingGames = (selector: typeof upcomingGamesSelector | typeof upcomingShortGamesSelector) => {
  const upcomingGames = useSelector(selector);
  const handleBuyPress = useCallback(
    (id: string) => {
      if (upcomingGames) {
        const { ticketsLeft } = upcomingGames[id];
        ticketsLeft?.url &&
          Linking.canOpenURL(ticketsLeft?.url).then(can => {
            ticketsLeft?.url && can && Linking.openURL(ticketsLeft?.url);
          });
      }
    },
    [upcomingGames],
  );

  return { upcomingGames, handleBuyPress };
};
