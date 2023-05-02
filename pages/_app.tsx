import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/layout";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";

const font = Outfit({ weight: ["400"], subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <main className={font.className}>
        {Component.getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </SessionProvider>
  );
}
