import './globals.css';
import {StoreProvider} from "./StoreProvider";

export const metadata = {
  title: 'Case Study App',
  description: 'Portfolio case study management',
};

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
