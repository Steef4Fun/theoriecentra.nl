export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Theoriecentra.nl. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}