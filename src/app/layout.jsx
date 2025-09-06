
import "./globals.css";

export const metadata = {
  title: "Slic Media",
  description: "Slic Media - Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
