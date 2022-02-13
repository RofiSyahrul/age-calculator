// adapted from react-calendar/dist/Calendar.css
import { css } from 'styled-components';

import colorVars from 'src/utils/color-vars';

export const calendarStyle = css`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: ${colorVars.background};
    border: 1px solid ${colorVars.white};
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: ${colorVars.secondary};
  }
  .react-calendar__navigation button:disabled {
    filter: opacity(35%);
    cursor: not-allowed;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${colorVars.primary};
    filter: opacity(80%);
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    color: ${colorVars.secondary};
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    color: ${colorVars.secondary};
  }

  .react-calendar__tile:disabled {
    filter: opacity(35%);
    cursor: not-allowed;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${colorVars.primary};
    filter: opacity(80%);
  }

  .react-calendar__tile--hasActive,
  .react-calendar__tile--active {
    background: ${colorVars.primary};
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    filter: brightness(85%);
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: var(--calendar-neighboring-month);
  }
`;
