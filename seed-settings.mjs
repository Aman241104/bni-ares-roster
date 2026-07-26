import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing environment variables.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  const { data, error } = await supabase
    .from('settings')
    .update({
      stat_total_members: 45,
      stat_business_passed: "100 Cr+",
      stat_total_referrals: 2500,
      stat_visitors_hosted: 1500,
      stat_years_chapter: 5,
      faqs: [
        {
          q: "What is BNI Ares?",
          a: "BNI Ares is Ahmedabad's leading business networking chapter where trusted relationships and quality referrals help businesses grow together."
        },
        {
          q: "How do I become a member?",
          a: "You can visit one of our meetings as a guest. If your business category is open, you can submit an application which will be reviewed by our Membership Committee."
        },
        {
          q: "What is expected of members?",
          a: "Members are expected to attend weekly meetings, bring qualified referrals, and actively participate in chapter activities to support fellow members."
        }
      ]
    })
    .eq('id', 1)
    .select()

  if (error) {
    console.error("Error updating settings:", error)
  } else {
    console.log("Settings updated successfully:", data)
  }
}

seed()
