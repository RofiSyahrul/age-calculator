import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

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

interface Setting {
  dob: string;
  primary: string;
  secondary: string;
  background: string;
  white: string;
  confettiLive: string;
  runningTexts: string[];
}

type Special = Record<string, Setting>;

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
    special[item.name] = {
      dob: JSON.stringify(
        item.date_of_birth || '1997-06-18T00:00:00+07:00',
      ),
      primary: JSON.stringify(item.primary_color || '#366091'),
      secondary: JSON.stringify(item.secondary_color || '#4aabc5'),
      background: JSON.stringify(item.background_color || '#151f22'),
      white: JSON.stringify(item.text_color || '#daecf2'),
      confettiLive: JSON.stringify(item.confetti_live || 1),
      runningTexts: (item.running_texts || []).map(runningText =>
        JSON.stringify(runningText),
      ),
    };
  });

  return special;
}
