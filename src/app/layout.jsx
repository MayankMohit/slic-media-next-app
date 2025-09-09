import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import SmoothScrollProvider from "./_components/SmoothScrollProvider";

export const metadata = {
  title: "Slic Media",
  description: "Slic Media - Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SmoothScrollProvider options={{ lerp: 0.08, smoothWheel: true }}>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
