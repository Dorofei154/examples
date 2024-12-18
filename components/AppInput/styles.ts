import { TextInput } from 'react-native';

import { FontText } from '../FontText';
import { styled } from '../../styled';

export const Wrapper = styled.View<{ isMultiline: boolean }>`
  background-color: ${({ theme }) => theme.pallette.white[10]};
  width: 100%;
  padding: 8px 12px;
  border: ${({ theme }) => `1px solid ${theme.pallette.white[20]}`};
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${({ isMultiline }) => (isMultiline ? 'flex-end' : 'center')};
  box-sizing: content-box;
`;

export const Input = styled(TextInput)<{ hasIcon: boolean }>`
  padding: 0px ${({ hasIcon }) => (hasIcon ? '12px' : '0px')} 0px 0px;
  font-size: 16px;
  line-height: 20px;
  height: ${({ multiline }) => (multiline ? 'auto' : '24px')}
  flex-direction: row;
  align-self: center;
  width: ${({ hasIcon }) => (hasIcon ? '92%' : '100%')};
  color: ${({ theme }) => theme.pallette.white[100]};
`;

export const Icon = styled.TouchableOpacity``;
export const InputWrapper = styled.View`
  width: 100%;
`;

export const Label = styled(FontText)`
  padding-bottom: 4px;
`;

export const Error = styled(FontText)`
  padding-top: 4px;
`;
