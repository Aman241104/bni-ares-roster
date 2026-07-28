import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const membersData = JSON.parse(fs.readFileSync('/tmp/members.json', 'utf8'));

async function updateMembers() {
  const { data: members, error } = await supabase.from('members').select('id, name');
  if (error) throw error;
  
  let updatedCount = 0;
  for (const m of membersData) {
    const member = members.find(db_m => db_m.name.toLowerCase().includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(db_m.name.toLowerCase()));
    if (member) {
      await supabase.from('members').update({
        referral_expectations: m.referral_expectations.substring(0, 1000)
      }).eq('id', member.id);
      updatedCount++;
    } else {
      console.log('Not found in DB:', m.name);
    }
  }
  console.log(`Updated ${updatedCount} members.`);
}
updateMembers();
