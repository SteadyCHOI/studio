import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Overview() {
  const boardImage = PlaceHolderImages.find(p => p.id === 'yinsh-board');
  const piecesImage = PlaceHolderImages.find(p => p.id === 'yinsh-pieces');

  return (
    <section id="overview" className="py-12 md:py-24 bg-card/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">What is YINSH?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Part of the legendary GIPF project, YINSH is a game of pure strategy where players aim to remove three of their rings from the board. The twist? To remove a ring, you must first form a row of five markers of your color.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-primary">Simple Rules, Deep Strategy</h3>
              <p className="mt-2 text-foreground/80">
                Each turn, you place a marker and move a ring. This simple action creates a dynamic and ever-changing game state. Every move is a trade-off: strengthening your position might also create opportunities for your opponent.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary">A Game of Constant Tension</h3>
              <p className="mt-2 text-foreground/80">
                As you form rows and remove rings, you also lose a piece from the board, reducing your power. This unique mechanic ensures the game remains tense and balanced until the very end. Who will be the first to claim three rings and victory?
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {boardImage && (
                <Image
                  src={boardImage.imageUrl}
                  alt={boardImage.description}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  data-ai-hint={boardImage.imageHint}
                />
            )}
            {piecesImage && (
                <Image
                  src={piecesImage.imageUrl}
                  alt={piecesImage.description}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  data-ai-hint={piecesImage.imageHint}
                />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
