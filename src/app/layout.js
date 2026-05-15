import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata = {
  title: "Daniel Abner | Portfolio",
  description: "Daniel Abner's Portfolio - Fullstack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
