// src/app/layout.jsx
import "./globals.css";
import Providers from "./provider.jsx";
import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";

export const metadata = {
  title: "Unelma Platforms Careers",
  description: "Explore opportunities at Unelma Platforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
