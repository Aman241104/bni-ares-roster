import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreditStrip from "@/components/CreditStrip";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1">{children}</main>
      <CreditStrip />
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
