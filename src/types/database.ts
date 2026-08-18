export type Status = "active" | "hidden";

export type CoordinatorTeam =
  | "lt_team"
  | "mc_committee"
  | "visitor_host"
  | "chapter_coordinator"
  | "extended_leadership";

export type GalleryCategory =
  | "meetings"
  | "business_events"
  | "visitor_days"
  | "socials"
  | "fun_events"
  | "kym";

export interface Member {
  id: string;
  name: string;
  photo_url: string | null;
  company: string | null;
  company_logo_url: string | null;
  designation: string | null;
  business_category: string | null;
  description: string | null;
  referral_expectations: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  linkedin: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  google_maps_link: string | null;
  status: Status;
  display_order: number;
  created_at: string;
}

export interface Coordinator {
  id: string;
  name: string;
  photo_url: string | null;
  position: string | null;
  team: CoordinatorTeam;
  company: string | null;
  phone: string | null;
  email: string | null;
  linkedin: string | null;
  instagram: string | null;
  facebook: string | null;
  description: string | null;
  responsibilities: string | null;
  display_order: number;
  status: Status;
  created_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  priority: number;
  status: Status;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string | null;
  event_date: string | null;
  cover_image_url: string | null;
  display_order: number;
  status: Status;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface VisitorRegistration {
  id: string;
  name: string;
  company: string | null;
  business_category: string | null;
  mobile: string;
  email: string | null;
  city: string | null;
  invited_by: string | null;
  referral_interest: string | null;
  message: string | null;
  status: "new" | "contacted";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  status: "new" | "contacted";
  created_at: string;
}

export interface Testimonial {
  id: string;
  member_name: string;
  company: string | null;
  quote_text: string;
  display_order: number;
  status: Status;
  created_at: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Settings {
  id: 1;
  meeting_venue: string | null;
  meeting_maps_link: string | null;
  meeting_time: string | null;
  dress_code: string | null;
  visitor_fee: string | null;
  qr_code_url: string | null;
  upi_id: string | null;
  bank_details: string | null;
  stat_total_members: number;
  stat_business_passed: string | null;
  stat_total_referrals: number;
  stat_visitors_hosted: number;
  stat_years_chapter: number;
  contact_phone: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_linkedin: string | null;
  faqs: Faq[];
  updated_at: string;
}
