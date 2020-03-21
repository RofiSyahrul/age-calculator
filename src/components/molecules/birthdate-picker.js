import React, { useMemo } from 'react';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { useAppContext } from 'src/context';
import Wrapper from '../atoms/wrapper';

const BirthdatePicker = () => {
  const {
    states: { birthDate, colors },
    actions: { changeBirthDate }
  } = useAppContext();

  const styles = useMemo(() => ({ style: { color: colors.white } }), [
    colors
  ]);

  return (
    <Wrapper width="100%" margin="8px 0">
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
          style={{ width: '100%' }}
        />
      </MuiPickersUtilsProvider>
    </Wrapper>
  );
};

export default BirthdatePicker;
