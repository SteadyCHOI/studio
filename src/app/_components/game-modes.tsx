import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Globe, Zap } from "lucide-react";

const modes = [
  {
    icon: Bot,
    title: "봇 플레이",
    description: "다양한 난이도와 플레이 스타일을 가진 AI 상대를 맞아 실력을 닦으세요.",
  },
  {
    icon: Users,
    title: "로컬 멀티플레이어",
    description: "같은 기기에서 친구와 번갈아 가며 대결하세요. 대면 대결에 완벽합니다.",
  },
  {
    icon: Globe,
    title: "온라인 멀티플레이어",
    description: "전 세계 플레이어들과 경쟁하세요. 리더보드에서 오르며 자신의 실력을 증명하세요.",
  },
  {
    icon: Zap,
    title: "블리츠 모드",
    description: "짧은 타이머로 빠르게 진행되는 모드입니다. 빠르게 생각하고, 더 빠르게 움직이세요. 짧고 강렬한 게임을 즐기는 분들을 위해.",
  },
];

export function GameModes() {
  return (
    <section id="game-modes" className="py-12 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">플레이 방법</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            빠른 솔로 게임을 원하시든 친구와의 경쟁적인 대결을 원하시든, Yinsh에는 당신에게 맞는 모드가 있습니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modes.map((mode, index) => (
            <Card key={index} className="text-center hover:bg-card/80 transition-colors duration-300 flex flex-col">
              <CardHeader>
                <div className="mx-auto bg-accent/20 rounded-full p-3 w-fit">
                  <mode.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="mt-4">{mode.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mode.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
