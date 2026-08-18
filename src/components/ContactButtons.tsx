"use client";
import { Phone, Mail, Globe } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

interface Props {
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  website?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  size?: "sm" | "md";
}

const ICON_SIZE = { sm: 15, md: 17 };

export default function ContactButtons({
  phone,
  whatsapp,
  email,
  website,
  linkedin,
  instagram,
  facebook,
  size = "sm",
}: Props) {
  const iconSize = ICON_SIZE[size];
  const btnClass =
    size === "sm"
      ? "flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-brand-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      : "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-brand-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  const items = [
    phone && { href: `tel:${phone}`, icon: <Phone size={iconSize} />, label: "Call" },
    whatsapp && {
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hi! I saw your profile on the BNI Ares website — can we connect / schedule a 1-2-1?"
      )}`,
      icon: <WhatsAppIcon size={iconSize} />,
      label: "WhatsApp",
    },
    email && { href: `mailto:${email}`, icon: <Mail size={iconSize} />, label: "Email" },
    website && { href: website, icon: <Globe size={iconSize} />, label: "Website" },
    linkedin && { href: linkedin, icon: <LinkedinIcon size={iconSize} />, label: "LinkedIn" },
    instagram && { href: instagram, icon: <InstagramIcon size={iconSize} />, label: "Instagram" },
    facebook && { href: facebook, icon: <FacebookIcon size={iconSize} />, label: "Facebook" },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={btnClass}
          aria-label={item.label}
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
