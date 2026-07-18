import type { Metadata } from "next";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryAlbum, GalleryImage } from "@/types/database";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from BNI Ares meetings, business events, visitor days, socials, fun events, and KYM sessions.",
};

export const revalidate = 60;

export type AlbumWithImages = GalleryAlbum & { gallery_images: GalleryImage[] };

export default async function GalleryPage() {
  const { data } = await supabase
    .from("gallery_albums")
    .select("*, gallery_images(*)")
    .eq("status", "active")
    .order("display_order");

  const albums = (data as AlbumWithImages[] | null) ?? [];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Moments" title="Gallery" description="A look back at meetings, events, and the moments that make this chapter." />
        <div className="mt-10">
          <GalleryGrid albums={albums} />
        </div>
      </Container>
    </Section>
  );
}
