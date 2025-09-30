"use client";

import { useState } from "react";
import { recommendAIOpponent, type RecommendAIOpponentOutput } from "@/ai/flows/recommend-ai-opponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ExperienceLevel = "beginner" | "intermediate" | "expert";

export function AiRecommender() {
  const [experience, setExperience] = useState<ExperienceLevel | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendAIOpponentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExperienceChange = async (value: string) => {
    const level = value as ExperienceLevel;
    setExperience(level);
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await recommendAIOpponent({ experienceLevel: level });
      setRecommendation(result);
    } catch (e) {
      console.error(e);
      setError("추천을 가져오지 못했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-recommender" className="py-12 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">당신에게 맞는 상대를 찾아보세요</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Yinsh는 서로 다른 플레이 스타일을 가진 고급 AI 상대들을 제공합니다. 어디서 시작할지 모르겠나요?
            경험 수준을 선택하면 완벽한 상대를 추천해드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>경험 수준을 선택하세요</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={handleExperienceChange} value={experience || ""}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="text-lg cursor-pointer">초보자</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6 mb-4">추상 전략 게임이나 Yinsh가 처음이신 분</p>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="text-lg cursor-pointer">중급자</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6 mb-4">몰 번 게임을 해보시고 기본 전략을 이해하는 분</p>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="expert" />
                  <Label htmlFor="expert" className="text-lg cursor-pointer">전문가</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">진짜 도전을 찾는 숙련한 플레이어</p>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 min-h-[260px] flex items-center justify-center">
            <CardContent className="p-6 text-center w-full">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />}
              {error && <p className="text-destructive">{error}</p>}
              {!isLoading && !recommendation && !error && (
                <p className="text-muted-foreground">여기에 AI 추천이 나타납니다.</p>
              )}
              {recommendation && (
                <div className="animate-in fade-in duration-500">
                  <CardDescription>추천 상대</CardDescription>
                  <p className="text-4xl font-bold text-accent my-2">{recommendation.opponentName}</p>
                  <Separator className="my-4" />
                  <p className="text-muted-foreground">{recommendation.rationale}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
