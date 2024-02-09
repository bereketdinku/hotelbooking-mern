import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";
import ThemeProvider from "@/theme-provider";
import Container from "@/components/Container";
import LocationFilter from "@/components/LocationFilter";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking",
  description: "Booking Hotel ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
<html lang="en" suppressHydrationWarning>
    
     
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
       <Toaster/>
        <main className="flex flex-col min-h-screen bg-secondary">
        <NavBar/>
        <LocationFilter/>
        <section className="flex-grow">
       <Container>
       {children}

       </Container>

        </section>
        </main>
        </ThemeProvider>
        
       </body>
    </html>
    </ClerkProvider>
    
  );
}
