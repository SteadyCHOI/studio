import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Overview } from "./_components/overview";
import { GameModes } from "./_components/game-modes";
import { AiRecommender } from "./_components/ai-recommender";
import { SubscriptionForm } from "./_components/subscription-form";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Overview />
        <GameModes />
        <AiRecommender />
        <div className="py-12 md:py-24">
            <div className="container mx-auto">
                <SubscriptionForm />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
