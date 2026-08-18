import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ijmyvtnyytehjxprpwdc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Next 16 added a private-IP guard on image optimization (see the v16
    // upgrade guide). On IPv6-only networks (e.g. tethered to a phone
    // hotspot), the Supabase hostname resolves through NAT64 to a
    // 64:ff9b::/96 address, which the guard misclassifies as "private" and
    // blocks with a 400. Safe to disable here: remotePatterns above already
    // restricts fetches to the one trusted Supabase domain, so this flag
    // isn't opening up SSRF to arbitrary internal targets — it's just
    // letting that one allowed domain resolve over NAT64.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
