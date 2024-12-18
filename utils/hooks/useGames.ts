import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';

import { ItemDropdown } from '@zalgiris-ventures/ui';
import { useDropdown } from '@zalgiris-ventures/features/core';

import { ALL_TOURNAMENTS_DROPDOWN_ITEM } from '../../constants/leagues';
import { getLeaguesAction, leaguesArraySelector } from '../../store';

export const useGames = (
  fn: (data: { id?: string; refreshing?: boolean }) => AnyAction,
  hasMore: boolean,
  isLoading: boolean,
) => {
  const leagues = useSelector(leaguesArraySelector);
  const [t] = useTranslation('games', { keyPrefix: 'games' });
  const dispatch = useDispatch();
  const allTournamentsItem = useMemo(
    () => ({ id: ALL_TOURNAMENTS_DROPDOWN_ITEM.id, name: t(ALL_TOURNAMENTS_DROPDOWN_ITEM.name) }),
    [t],
  );
  const { handleSelect, selectedDropdownItem } = useDropdown(allTournamentsItem);

  useEffect(() => {
    dispatch(getLeaguesAction());
  }, [dispatch]);

  const getDataRequest = useCallback(
    (id?: string, refreshing?: boolean) => {
      (!isLoading || refreshing) &&
        dispatch(
          fn({
            refreshing: Boolean(refreshing),
            ...(id && id !== ALL_TOURNAMENTS_DROPDOWN_ITEM.id ? { query: { leagueIds: [id] } } : {}),
          }),
        );
    },
    [dispatch, fn, isLoading],
  );

  const handleLeagueSelect = useCallback(
    (item: ItemDropdown) => {
      if (item.id !== selectedDropdownItem.id) {
        getDataRequest(item.id, item.id !== selectedDropdownItem.id);
        handleSelect(item);
      }
    },
    [getDataRequest, handleSelect, selectedDropdownItem.id],
  );

  const handleRefresh = () => {
    getDataRequest(selectedDropdownItem.id, true);
  };

  const handleReachEnd = () => {
    hasMore && getDataRequest(selectedDropdownItem.id);
  };

  const allLeagues = useMemo(() => {
    return [allTournamentsItem, ...leagues];
  }, [allTournamentsItem, leagues]);

  return {
    leagues: allLeagues,
    selectedDropdownItem,
    handleLeagueSelect,
    handleRefresh,
    handleReachEnd,
  };
};
