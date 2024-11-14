import localFont from "next/font/local";
import "./globals.css";
import "@/styles/login.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Exportando o metadata no Server Component
export const metadata = {
  title: "MedTrack - Acompanhamento Médico",
  description: "Solução para seus problemas de saúde!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Head>
          <title>MedTrack - Acompanhamento Médico</title>
          <meta
            name="description"
            content="Solução para seus problemas de saúde!"
          />
        </Head>
        {children}
      </body>
    </html>
  );
}
