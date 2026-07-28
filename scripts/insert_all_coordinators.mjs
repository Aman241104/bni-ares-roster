import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const coordinators = JSON.parse(fs.readFileSync('/tmp/coordinators.json', 'utf8'));

async function updateCoordinators() {
  // First clear all existing coordinators
  const { error: delError } = await supabase.from('coordinators').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // delete all
  if (delError) {
    console.error('Error deleting:', delError);
    return;
  }
  
  // Insert new ones
  const { error: insError } = await supabase.from('coordinators').insert(coordinators);
  if (insError) {
    console.error('Error inserting:', insError);
  } else {
    console.log('Successfully updated coordinators!');
  }
}

updateCoordinators();
