"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";
import ProfilePopup from "@/components/ProfilePopup";
import type { Member } from "@/types/database";

export default function MemberCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          <Avatar
            name={member.name}
            photoUrl={member.photo_url}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          {member.company_logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.company_logo_url}
              alt={member.company ?? ""}
              className="absolute bottom-2 right-2 h-9 w-9 rounded-lg bg-white object-contain p-1 shadow-md"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div>
            <h3 className="font-heading text-base font-bold text-ink">{member.name}</h3>
            {member.company && <p className="text-sm text-zinc-600">{member.company}</p>}
          </div>
          {member.business_category && (
            <span className="w-fit rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
              {member.business_category}
            </span>
          )}
          {member.description && (
            <p className="line-clamp-2 text-sm text-zinc-500" title={member.description}>{member.description}</p>
          )}
          <div className="mt-auto pt-2">
            <ContactButtons
              phone={member.phone}
              whatsapp={member.whatsapp}
              email={member.email}
              website={member.website}
              linkedin={member.linkedin}
              instagram={member.instagram}
              facebook={member.facebook}
            />
          </div>
        </div>
      </div>

      {open && (
        <ProfilePopup
          onClose={() => setOpen(false)}
          person={{
            name: member.name,
            photoUrl: member.photo_url,
            subtitle: member.company,
            tag: member.business_category,
            description: member.description,
            phone: member.phone,
            whatsapp: member.whatsapp,
            email: member.email,
            website: member.website,
            linkedin: member.linkedin,
            instagram: member.instagram,
            facebook: member.facebook,
            profileHref: `/members/${member.id}`,
          }}
        />
      )}
    </>
  );
}
