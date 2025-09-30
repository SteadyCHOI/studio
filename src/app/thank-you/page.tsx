import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg animate-in fade-in-50 zoom-in-95 duration-500">
          <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground">감사합니다!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            목록에 추가되었습니다! Yinsh를 다운로드할 수 있게 되는 즉시 이메일을 보내드립니다.
          </p>
          <Button asChild variant="link" className="mt-8 text-accent text-lg">
            <Link href="/">홈페이지로 돌아가기</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
