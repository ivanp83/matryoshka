"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./header/header";
import StyledJsxRegistry from "./registry";
import { AppProvider } from "./context/app.context";
import MobileAsideNav from "./components/aside/mobileAside";

const inter = Inter({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />

      <StyledJsxRegistry>
        <AppProvider>
          <body className={inter.className}>
            <div id="root-loader" />
            <Header />
            <MobileAsideNav />
            <main>{children}</main>
          </body>
        </AppProvider>
      </StyledJsxRegistry>
    </html>
  );
}
