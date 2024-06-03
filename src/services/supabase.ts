import { createClient } from '@supabase/supabase-js';
import type { GenericFunction } from '@supabase/supabase-js/dist/module/lib/types';

import { encode } from 'src/utils/codec';
import { DEFAULT_COLORS } from '~/config/colors';
import type { SpecialData } from '~/types/special';

type SpecialItem = {
  name: string;
  date_of_birth: string;
  primary_color: string | null;
  secondary_color: string | null;
  background_color: string | null;
  text_color: string | null;
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
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SECRET,
);

export async function fetchSpecialData(): Promise<SpecialData> {
  const { data, error } = await supabase.from('special').select('*');

  if (!data || !data.length || error) {
    // eslint-disable-next-line no-console
    if (error) console.log('ERROR fetch special data:', error);
    return {};
  }

  const special: SpecialData = {};

  for (const item of data) {
    const name = encode(item.name);
    const dob = encode(item.date_of_birth);
    const runningTexts = (item.running_texts || []).map(runningText =>
      encode(runningText),
    );

    special[name] = {
      dob,
      primary: item.primary_color || DEFAULT_COLORS.primary,
      secondary: item.secondary_color || DEFAULT_COLORS.secondary,
      background: item.background_color || DEFAULT_COLORS.background,
      text: item.text_color || DEFAULT_COLORS.text,
      confettiLive: item.confetti_live || 1,
      runningTexts,
    };
  }

  return special;
}
