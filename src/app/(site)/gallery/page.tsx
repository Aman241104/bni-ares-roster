import type { Metadata } from "next";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Container, Section } from "@/components/Section";
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
    <>
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="absolute inset-0">
          <Image src="/images/social-gala-night.jpg" alt="BNI Ares Gallery" aria-hidden="true" fill priority className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-400">Life at BNI Ares</p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Memories. Relationships. Opportunities.
          </h1>
          <p className="mt-6 text-lg text-zinc-300">
            Every Wednesday tells a different story — new introductions, new businesses, new opportunities, new
            friendships.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mt-12">
            <GalleryGrid albums={albums} />
          </div>
        </Container>
      </Section>
    </>
  );
}
