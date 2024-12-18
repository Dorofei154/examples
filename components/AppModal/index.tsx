import { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

import { AppIcon } from '../AppIcon';

import { AppModalProps } from './types';
import * as Styled from './styles';

export const AppModal: FC<AppModalProps> = ({
  iconName,
  title,
  subTitle,
  buttons,
  children,
  hasBackdrop = true,
  iconBackground,
  iconColor = 'primary',
  iconSize = 56,
  iconBackgroundSize,
  backdropOpacity = 0.5,
  ...props
}) => {
  return (
    <Modal hasBackdrop={hasBackdrop} backdropOpacity={backdropOpacity} {...props}>
      <Styled.ModalWrapper>
        <Styled.ModalContainer>
          {iconName === 'loading' && (
            <Styled.IconWrapper>
              <ActivityIndicator color="yellow" size={64} />
            </Styled.IconWrapper>
          )}
          {iconName && iconName !== 'loading' && (
            <Styled.IconWrapper>
              <AppIcon
                hasBackground={Boolean(iconBackground)}
                backgroundColor={iconBackground}
                name={iconName}
                size={iconSize}
                color={iconColor}
                backgroundSize={iconBackgroundSize}
              />
            </Styled.IconWrapper>
          )}

          {title && (
            <Styled.Title align="center" color="black" size="xl2" weight={600}>
              {title}
            </Styled.Title>
          )}
          {subTitle && (
            <Styled.Title align="center" color="black" size="l" weight={400}>
              {subTitle}
            </Styled.Title>
          )}
          {children}
          {buttons && (
            <Styled.ButtonsContainer>
              {buttons.map(({ ...button }) => (
                <Styled.ModalButton key={button.title} {...button} />
              ))}
            </Styled.ButtonsContainer>
          )}
        </Styled.ModalContainer>
      </Styled.ModalWrapper>
    </Modal>
  );
};
