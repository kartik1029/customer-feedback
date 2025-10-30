import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Feedback System",
  description: "Manage customer feedback efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
