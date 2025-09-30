export function Footer() {
  return (
    <footer className="py-6 px-4 md:px-6 mt-12 border-t border-border">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Yinsh. All rights reserved.</p>
      </div>
    </footer>
  );
}
