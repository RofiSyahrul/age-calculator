import styled from 'styled-components';

import { useAppState } from 'src/store';
import colorVars from 'src/utils/color-vars';
import { pickersWidth } from 'src/utils/constants';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100%;
  transition: inherit;
  transition-property: width, opacity;

  width: 100%;
  margin-top: 1rem;

  &.with-picker {
    width: calc(100% - ${pickersWidth});
    opacity: 1;

    ${props => props.theme.breakpoint.lg} {
      margin-top: 0rem;
    }

    ${props => props.theme.breakpoint.sm} {
      opacity: 0;
    }
  }
`;

const Text = styled.span`
  font-size: 1.25rem;
  line-height: 1.3em;
  text-align: center;
  color: ${colorVars.white};

  ${props => props.theme.breakpoint.xs} {
    font-size: 0.875rem;
  }
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration-thickness: 1.5px;
  text-decoration-style: wavy;
`;

export default function Footer() {
  const { isPickerShown, specialSetting } = useAppState();

  return (
    <FooterWrapper className={isPickerShown ? 'with-picker' : ''}>
      <Text>
        {`Copyright © ${new Date().getFullYear()} `}
        <Anchor href={REPOSITORY_URL} target='_blank'>
          Rofi
        </Anchor>
        {'.'}
      </Text>
      {!specialSetting && <Text>{`v${APP_VERSION}`}</Text>}
    </FooterWrapper>
  );
}
