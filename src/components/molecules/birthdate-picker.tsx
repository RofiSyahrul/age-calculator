import { useEffect, useMemo } from 'react';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import styled from 'styled-components';

import { appAction, useAppState } from 'src/store';
import colorVars from 'src/utils/color-vars';

const BirthdatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0.5rem 0rem;

  transition: inherit;
  transition-property: opacity;
  opacity: 1;

  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${colorVars.primary};
  box-shadow: ${props => props.theme.shadow.medium};

  &[aria-hidden='true'] {
    opacity: 0;
  }

  > label {
    margin-right: 0.25rem;
    color: ${colorVars.white};
  }
`;

const maxDate = new Date();
const minDate = new Date('1930-01-01T00:00:00+07:00');

export default function BirthdatePicker() {
  const { birthDate, isPickerShown } = useAppState();

  const birthDateValue = useMemo(() => {
    if (typeof birthDate === 'string') return new Date(birthDate);
    return birthDate;
  }, [birthDate]);

  useEffect(() => {
    const inputElements = document.getElementsByClassName(
      'react-date-picker__inputGroup__input',
    );
    for (let index = 0; index < inputElements.length; index++) {
      const inputElement = inputElements.item(index);
      if (inputElement) {
        inputElement.setAttribute('disabled', 'true');
      }
    }
  }, []);

  return (
    <BirthdatePickerWrapper aria-hidden={!isPickerShown}>
      <label>Date of Birth</label>
      <DatePicker
        clearIcon={null}
        format='dd-MM-y'
        maxDate={maxDate}
        minDate={minDate}
        onChange={appAction.changeBirthDate}
        value={birthDateValue}
      />
    </BirthdatePickerWrapper>
  );
}
