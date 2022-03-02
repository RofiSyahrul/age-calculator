import { createClient } from '@supabase/supabase-js';

import { encode } from 'src/utils/codec';
import { colors, defaultDob } from 'src/utils/constants';

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SECRET ?? '',
);

type SpecialItem = {
  name: string;
  date_of_birth: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  confetti_live: number;
  running_texts: string[] | null;
};

export async function fetchSpecialData(): Promise<Special> {
  const columns: Array<keyof SpecialItem> = [
    'background_color',
    'confetti_live',
    'date_of_birth',
    'name',
    'primary_color',
    'running_texts',
    'secondary_color',
    'text_color',
  ];

  const { data, error } = await supabase
    .from<SpecialItem>('special')
    .select(columns.join());

  if (!data || !data.length || error) {
    // eslint-disable-next-line no-console
    if (error) console.log('ERROR fetch special data:', error);
    return {};
  }

  const special: Special = {};

  data.forEach(item => {
    const name = encode(item.name);
    const dob = encode(item.date_of_birth || defaultDob);
    const runningTexts = (item.running_texts || []).map(runningText =>
      encode(runningText),
    );
    special[name] = {
      dob,
      primary: item.primary_color || colors.primary,
      secondary: item.secondary_color || colors.secondary,
      background: item.background_color || colors.background,
      white: item.text_color || colors.white,
      confettiLive: item.confetti_live || 1,
      runningTexts,
    };
  });

  return special;
}
