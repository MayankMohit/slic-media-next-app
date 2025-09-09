export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-80">
        © {new Date().getFullYear()} Slic Media. All rights reserved.
      </div>
    </footer>
  );
}
