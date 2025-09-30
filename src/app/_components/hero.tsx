import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'yinsh-hero');

  return (
    <section className="relative h-[75vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div className="relative z-10 p-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
          전략의 예술, 새롭게 정의되다.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
          모던 클래식 추상 전략 게임 Yinsh를 모바일에서 경험해보세요.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#subscribe">출시 알림 받기 <ArrowDown className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
