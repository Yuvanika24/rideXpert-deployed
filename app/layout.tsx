import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavBar from "@/components/NavBar";
// import { dark } from '@clerk/themes';

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Taxi",
  description: "Book my taxi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: [dark]
    // }}
    >
      <html lang="en">
        <body className={notoSans.className}>
        
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <NavBar/>
            </SignedIn>
       
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}


