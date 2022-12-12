import { createClient } from '@supabase/supabase-js';
import type { GenericFunction } from '@supabase/supabase-js/dist/module/lib/types';

import { encode } from 'src/utils/codec';
import { colors, defaultDob } from 'src/utils/constants';

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

interface SpecialTable {
  Row: SpecialItem;
  Insert: SpecialItem;
  Update: SpecialItem;
}

interface DatabaseSchema {
  Tables: {
    special: SpecialTable;
  };
  Views: {
    special: SpecialTable;
  };
  Functions: Record<string, GenericFunction>;
}

interface Database {
  public: DatabaseSchema;
}

const supabase = createClient<Database>(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SECRET ?? '',
);

export async function fetchSpecialData(): Promise<Special> {
  const { data, error } = await supabase.from('special').select('*');

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
