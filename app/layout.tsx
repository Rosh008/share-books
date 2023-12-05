import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="cmyk" lang="en">
      <body className={`${inter.className} w-screen h-screen`}>{children}</body>
    </html>
  );
}
