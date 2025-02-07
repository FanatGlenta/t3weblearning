import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import SessionProviderWrapper from "~/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full`}>
      <body className="flex h-full flex-col">
        <SessionProviderWrapper>
          <main className="flex-1 bg-gray-100">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
