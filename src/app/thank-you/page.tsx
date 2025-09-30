import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Header } from './_components/header';
import { Footer } from './_components/footer';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg animate-in fade-in-50 zoom-in-95 duration-500">
          <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground">Thank You!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            You're on the list! We'll send you an email as soon as Yinsh is available for download.
          </p>
          <Button asChild variant="link" className="mt-8 text-accent text-lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
