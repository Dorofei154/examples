import { FlatList, FlatListProps, Platform } from 'react-native';
import { ComponentType } from 'react';

import { SafeAreaWrapper, styled } from '@zalgiris-ventures/ui';

export const Wrap = styled(SafeAreaWrapper)`
  flex-grow: 1;
`;
export const WrapHeader = styled.View`
  margin: 16px 16px 24px;
`;

export const GamesList = styled(FlatList as ComponentType<FlatListProps<string> & { showBackground?: boolean }>).attrs<{
  showBackground: boolean;
}>(({ theme, showBackground }) => ({
  contentContainerStyle: {
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: showBackground ? theme.pallette.white[10] : 'transparent',
  },
}))`
  flex: 1;
  border-radius: 8px;
`;

export const WrapContent = styled.View`
  flex: 1;
  ${Platform.OS === 'ios' ? 'margin-bottom: 20px' : ''}
`;
