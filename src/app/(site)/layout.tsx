import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
