import type { Metadata } from "next";
import { Alegreya_Sans_SC} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Announcement from "@/components/Announcement";
import WhatsApp from "@/components/WhatsApp";

const inter = Alegreya_Sans_SC({weight:"700",subsets: ["latin"]});
// Available subsets: `cyrillic`, `cyrillic-ext`, `greek`, `greek-ext`, `latin`, `latin-ext`, `vietnamese`

export const metadata: Metadata = {
  title: "Robotech space",
  description: "Mechatronics Engineering Space,We integrate cutting-edge technologies for precision and innovation in spacecraft design, robotics, and control systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body

        className={cn(
          "min-h-screen font-sans antialiased bg-slate-200",
          inter.className
        )}
      >
        <Layout>
        <Announcement/>

          <Navbar />
          {children}
          <WhatsApp />
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
