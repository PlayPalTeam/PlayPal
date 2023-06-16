import { createClient } from '@supabase/supabase-js';
import { Database } from 'src/types/database.types';

const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPBASE_ANON, {
  db: {
    schema: 'public'
  }
});

export { supabase };
