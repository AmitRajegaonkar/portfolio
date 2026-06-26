export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-3 py-8 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-muted-foreground">
          {"// Amit Rajegaonkar · 2025"}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built by a builder, not a template.
        </p>
      </div>
    </footer>
  );
}
