import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertLT() {
  await supabase.from('coordinators').delete().eq('team', 'lt_team');
  const { error } = await supabase.from('coordinators').insert([
    { name: 'Sujal Soni', position: 'President', team: 'lt_team', status: 'active' },
    { name: 'Het Patel', position: 'Vice President', team: 'lt_team', status: 'active' },
    { name: 'Dhaval Thakor', position: 'Secretary Treasurer', team: 'lt_team', status: 'active' }
  ]);
  
  if (error) {
    console.error(error);
  } else {
    console.log('LT inserted successfully.');
  }
}
insertLT();
