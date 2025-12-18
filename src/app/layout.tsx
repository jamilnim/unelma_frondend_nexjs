import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import Providers from "./Providers";
import ThemeProvider from "../component/Theme/ThemeProvider";
import ScrollToTop from "../component/ScrollToTop/ScrollToTop";

export const metadata = {
  title: "Case Study App",
  description: "Portfolio case study management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <Header />
            <Providers>{children}</Providers>
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
