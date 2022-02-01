import React, { useMemo } from 'react';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { DatePicker } from '@material-ui/pickers/DatePicker/DatePicker';
import DayjsUtils from '@date-io/dayjs';
import { Box } from 'goods-core';
import { useAppContext } from 'src/context';

const BirthdatePicker: React.FC = () => {
  const {
    states: { birthDate, colors },
    actions: { changeBirthDate },
  } = useAppContext();

  const styles = useMemo(
    () => ({ style: { color: colors.white } }),
    [colors],
  );

  return (
    <Box w my='xxs' fAlign='center' fJustify='center'>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <DatePicker
          InputProps={styles}
          InputLabelProps={styles}
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
    </Box>
  );
};

export default BirthdatePicker;
