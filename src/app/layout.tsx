import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getSongsByUserId from "@/actions/getSongsByUserId";

import { Figtree } from "next/font/google";
const font = Figtree({ subsets: ["latin"] });
interface Props {
  children: React.ReactNode;
}

export const revalidate = 0;

export default async function RootLayout({ children }: Props) {
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
