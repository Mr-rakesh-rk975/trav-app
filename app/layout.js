import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/user/Header";
import Footer from "./components/user/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel app",
  description: "This is travel app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
