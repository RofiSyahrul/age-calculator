import React from 'react';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { useAppContext } from 'src/context';
import { colors } from 'src/utils/constants';
import Wrapper from './wrapper';

const styles = { style: { color: colors.white } };

const BirthdatePicker = () => {
  const {
    states: { birthDate },
    actions: { changeBirthDate }
  } = useAppContext();

  return (
    <Wrapper position="absolute" top="0" right="0" padding="16px">
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <DatePicker
          InputProps={styles}
          InputLabelProps={styles}
          KeyboardButtonProps={styles}
          disableFuture
          maxDateMessage="Date of birth can't use a future date"
          autoOk
          variant="inline"
          inputVariant="standard"
          label="Date of Birth"
          format="MMMM Do, YYYY"
          InputAdornmentProps={{ position: 'start' }}
          value={birthDate}
          onChange={changeBirthDate}
        />
      </MuiPickersUtilsProvider>
    </Wrapper>
  );
};

export default BirthdatePicker;
