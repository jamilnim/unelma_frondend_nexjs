"use client";

import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
