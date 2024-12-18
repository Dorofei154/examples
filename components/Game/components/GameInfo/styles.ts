import { View } from 'react-native';

import { styled } from '@zalgiris-ventures/ui';

export const WrapGameInfo = styled(View)`
  align-items: center;
`;

export const WrapGameInfoHeader = styled.View`
  align-items: center;
  justify-content: center;
`;

export const WrapGameInfoDate = styled.View`
  align-items: center;
  justify-content: center;
`;

export const WrapGameInfoScore = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.pallette.success};
  padding: 4px 8px;
  margin-top: 4px;
`;

export const WrapGameInfoTime = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.pallette.success};
  padding: 0px 4px;
  margin-top: 4px;
`;

export const WrapGameInfoBody = styled.View`
  margin-top: 8px;
  align-items: center;
  justify-content: center;
`;

export const WrapTicketView = styled.View`
  margin-top: 16px;
`;
