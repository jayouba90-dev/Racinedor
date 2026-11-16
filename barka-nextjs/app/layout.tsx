import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BARKA — Le bon goût, naturellement",
  description: "Découvrez les farines et céréales BARKA : farine de cossettes d’igname, farine pour enfants et flocons d’avoine.",
  openGraph: {
    title: "BARKA — Le bon goût, naturellement",
    description: "Des essentiels alimentaires sélectionnés avec soin.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
