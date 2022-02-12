import styled from 'styled-components';

export interface ButtonProps {
  $bg?: string;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  outline: none;
  transition: background 0.8s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;

  border-radius: 0.25rem;
  border: none;

  background: ${props => props.$bg || props.theme.color.blue.t50};
  color: ${props => props.theme.color.white.t10};

  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.25rem;
  letter-spacing: 0.03125rem;
  font-family: ${props => props.theme.fontBase};

  background-position: center;

  &:hover {
    background: ${props => props.$bg || props.theme.color.blue.t50}
      radial-gradient(
        circle,
        rgba(0, 0, 0, 0.03) 1%,
        rgba(255, 255, 255, 0.05) 1%
      )
      center/15000%;
    filter: brightness(95%);
  }

  &:active {
    background-size: 100%;
    transition: background 0s;
  }

  &:disabled {
    filter: opacity(35%);
    cursor: not-allowed;
  }
`;

export default Button;
