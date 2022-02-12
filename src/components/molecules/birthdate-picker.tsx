import React from 'react';

import DayjsUtils from '@date-io/dayjs';
import { DatePicker } from '@material-ui/pickers/DatePicker/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import styled from 'styled-components';

import { useAppContext } from 'src/context';
import colorVars from 'src/utils/color-vars';

const inputAndLabelProps = {
  style: { color: colorVars.white },
};

const BirthdatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0rem;
`;

export default function BirthdatePicker() {
  const {
    states: { birthDate },
    actions: { changeBirthDate },
  } = useAppContext();

  return (
    <BirthdatePickerWrapper>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <DatePicker
          InputProps={inputAndLabelProps}
          InputLabelProps={inputAndLabelProps}
          className='birthdate-picker'
          disableFuture
          maxDateMessage="Date of birth can't use a future date"
          autoOk
          variant='inline'
          inputVariant='standard'
          label='Date of Birth'
          format='MMMM Do, YYYY'
          value={birthDate}
          onChange={changeBirthDate}
          style={{ width: '100%' }}
        />
      </MuiPickersUtilsProvider>
    </BirthdatePickerWrapper>
  );
}
