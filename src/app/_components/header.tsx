import { Logo } from "./icons";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center gap-4">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Yinsh Launchpad
        </h1>
      </div>
    </header>
  );
}
