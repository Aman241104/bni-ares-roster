import Link from "next/link";
import { Container, Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-lg text-center">
        <p className="font-heading text-6xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Page Not Found</h1>
        <p className="mt-2 text-zinc-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Back Home
        </Link>
      </Container>
    </Section>
  );
}
