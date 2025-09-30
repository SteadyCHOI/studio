import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Overview() {
  const boardImage = PlaceHolderImages.find(p => p.id === 'yinsh-board');
  const piecesImage = PlaceHolderImages.find(p => p.id === 'yinsh-pieces');

  return (
    <section id="overview" className="py-12 md:py-24 bg-card/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Yinsh란 무엇인가요?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            전설적인 GIPF 프로젝트의 일부인 Yinsh는 플레이어가 보드에서 자신의 링 3개를 제거하는 것을 목표로 하는 순수 전략 게임입니다. 반전은? 링을 제거하려면 먼저 자신의 색깔 마커 5개로 한 줄을 만들어야 합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-primary">간단한 규칙, 깊은 전략</h3>
              <p className="mt-2 text-foreground/80">
                매 턴마다 마커를 놓고 링을 움직입니다. 이 간단한 행동이 역동적이고 끊임없이 변화하는 게임 상황을 만들어냅니다. 모든 수는 절충안입니다: 자신의 위치를 강화하는 것이 상대방에게도 기회를 만들어줄 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary">지속적인 긴장감의 게임</h3>
              <p className="mt-2 text-foreground/80">
                줄을 만들고 링을 제거하면서 보드에서 말을 잃게 되어 힘이 줄어듭니다. 이 독특한 메커니즘은 게임이 마지막까지 긴장감 있고 균형 잡힌 상태를 유지하도록 보장합니다. 누가 먼저 3개의 링을 차지하고 승리할까요?
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
