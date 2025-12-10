import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Neelay Jain Portfolio",
  description:
    "Mechanical Engineer building intelligent machines & AI-powered systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#080A10] text-[#E0E4EB]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
