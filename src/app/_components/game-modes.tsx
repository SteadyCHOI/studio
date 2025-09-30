import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Globe, Zap } from "lucide-react";

const modes = [
  {
    icon: Bot,
    title: "Bot Play",
    description: "Hone your skills against a variety of AI opponents with different difficulty levels and playstyles.",
  },
  {
    icon: Users,
    title: "Local Multiplayer",
    description: "Challenge a friend on the same device with our pass-and-play mode. Perfect for a face-to-face match.",
  },
  {
    icon: Globe,
    title: "Online Multiplayer",
    description: "Compete against players from around the world. Climb the leaderboards and prove your mastery.",
  },
  {
    icon: Zap,
    title: "Blitz Mode",
    description: "A fast-paced variant with a shorter timer. Think fast, move faster. For those who enjoy a quick, intense game.",
  },
];

export function GameModes() {
  return (
    <section id="game-modes" className="py-12 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Ways to Play</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Whether you want a quick solo game or a competitive match against a friend, Yinsh has a mode for you.
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
