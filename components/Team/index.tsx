import React, { FC, memo } from 'react';

import { FontText } from '../FontText';
import { TextTicker } from '../TextTicker';

import * as Styled from './styles';
import { TeamProps } from './types';

const buttonComponent = {
  row: Styled.RowContainer,
  column: Styled.ColumnContainer,
};

const TeamComponent: FC<TeamProps> = ({
  logoUrl,
  name,
  nameSize = 's',
  logoSize = 48,
  variant = 'column',
  margin = 8,
  textAlign = 'center',
  nameStyle,
  useTeamNameTicker,
  ...props
}) => {
  const Container = buttonComponent[variant];
  return (
    <Container {...props}>
      <Styled.Logo
        colorValue="transparent"
        size={logoSize}
        source={logoUrl}
        variant={name ? variant : undefined}
        logoMargin={margin}
      />
      {useTeamNameTicker ? (
        <TextTicker align={textAlign} style={nameStyle} size={nameSize} weight={600}>
          {name}
        </TextTicker>
      ) : (
        <FontText align={textAlign} style={nameStyle} size={nameSize} weight={600}>
          {name}
        </FontText>
      )}
    </Container>
  );
};

export const Team = memo(TeamComponent);
