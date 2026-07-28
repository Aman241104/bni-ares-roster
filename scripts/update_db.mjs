import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSettings() {
  const { error: settingsError } = await supabase
    .from('settings')
    .update({ 
      meeting_time: 'Come before 7:30 AM, Meeting starts 8:00 AM sharp'
    })
    .eq('id', 1);
  if (settingsError) console.error('Error updating settings:', settingsError);

  // Update FAQ
  const { data: currentSettings } = await supabase.from('settings').select('faqs').eq('id', 1).single();
  if (currentSettings?.faqs) {
    const updatedFaqs = currentSettings.faqs.map(faq => {
      if (faq.question === 'What time does the meeting start?') {
        return {
          question: 'What time does the meeting start?',
          answer: 'We recommend arriving before 7:30 AM for open networking. The formal meeting starts at 8:00 AM sharp.'
        };
      }
      return faq;
    });
    const { error: faqError } = await supabase
      .from('settings')
      .update({ faqs: updatedFaqs })
      .eq('id', 1);
    if (faqError) console.error('Error updating faqs:', faqError);
  }
  console.log('Update finished.');
}
updateSettings();
