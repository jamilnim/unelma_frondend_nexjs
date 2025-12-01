import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import ScrollToTop from "../component/tools/ScrollToTop";

export const metadata = {
  title: "Case Study App",
  description: "Portfolio case study management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <StoreProvider><Header />{children}<Footer /><ScrollToTop /></StoreProvider>

      </body>
    </html>
  );
}
