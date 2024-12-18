import { styled } from '../../styled';
import { AppButton } from '../AppButton';
import { FontText } from '../FontText';

export const ModalWrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.pallette.white[100]};
  width: 100%;
  max-height: 100%;
  max-width: 500px;
  border-radius: 16px;
  padding: 40px 16px 40px 16px;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ModalButton = styled(AppButton)`
  margin: 0px 8px;
  height: 100%;
  flex: 1;
`;

export const Title = styled(FontText)`
  padding-bottom: 16px;
`;

export const IconWrapper = styled.View`
  margin-bottom: 24px;
`;
