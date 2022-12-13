import styled from 'styled-components';

import Button from '@atoms/button';
import { SettingIcon } from '@atoms/icon';
import { appAction, useAppState } from 'src/store';
import colorVars from 'src/utils/color-vars';
import { pickersWidth } from 'src/utils/constants';

const StyledButton = styled(Button)`
  width: fit-content;
  min-width: 3rem;
  padding: 0px 0.5rem;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1050;
  box-shadow: ${props => props.theme.shadow.high};
  color: ${colorVars.secondary};
  transition: inherit;
  transition-property: transform, opacity;

  &[aria-hidden='true'] {
    transform: translateX(min(${pickersWidth}, 100vw))
      translateX(-100%) translateX(-32px);
    opacity: 0;
    z-index: 0;
    pointer-events: none;
  }
`;

const buttonTitle = 'Open picker setting';

export default function SettingButton() {
  const { isPickerShown } = useAppState();

  return (
    <StyledButton
      $bg={colorVars.primary}
      onClick={appAction.togglePicker}
      aria-hidden={isPickerShown}
      title={buttonTitle}
      aria-label={buttonTitle}
    >
      <SettingIcon color='currentColor' />
    </StyledButton>
  );
}
