import localFont from "next/font/local";
import "@/styles/globals.scss";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import { UserProvider } from "@/context/user-context";
import getUser from "@/services/get-user";
import { CartProvider } from "@/context/cart-context";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Organic Tea House – Handcrafted Tea Sets & Premium Teas",
  description:
    "Discover handmade tea sets and organic premium teas at e-store.zkrstic.com. Experience authentic flavors and natural wellness from our organic tea house.",
  authors: [{ name: "Zoran Krstic" }],
  openGraph: {
    title: "Organic Tea House – Handcrafted Tea Sets & Premium Teas",
    description:
      "Discover handmade tea sets and organic premium teas at e-store.zkrstic.com. Experience authentic flavors and natural wellness from our organic tea house.",
    url: "https://e-store.zkrstic.com",
    siteName: "Organic Tea House",
    images: [
      {
        url: "https://e-store.zkrstic.com/images/home/screenshot-home.png",
        width: 1200,
        height: 630,
        alt: "Screenshot of Organic Tea House homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organic Tea House – Handcrafted Tea Sets & Premium Teas",
    description:
      "Discover handmade tea sets and organic premium teas at e-store.zkrstic.com. Experience authentic flavors and natural wellness from our organic tea house.",
    images: ["https://e-store.zkrstic.com/images/home/screenshot-home.png"],
  },
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider initallUser={user?.success ? user.data : null}>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <div id="reusablePortal" />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
