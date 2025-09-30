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
      setError("Failed to get recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-recommender" className="py-12 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Meet Your Match</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Yinsh features advanced AI opponents with distinct playstyles. Not sure where to start?
            Select your experience level and we'll suggest the perfect opponent for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Experience Level</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={handleExperienceChange} value={experience || ""}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="text-lg cursor-pointer">Beginner</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6 mb-4">New to abstract strategy games or Yinsh.</p>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="text-lg cursor-pointer">Intermediate</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6 mb-4">You've played a few games and understand the basic strategy.</p>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="expert" />
                  <Label htmlFor="expert" className="text-lg cursor-pointer">Expert</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">You're a seasoned player looking for a real challenge.</p>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 min-h-[260px] flex items-center justify-center">
            <CardContent className="p-6 text-center w-full">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />}
              {error && <p className="text-destructive">{error}</p>}
              {!isLoading && !recommendation && !error && (
                <p className="text-muted-foreground">Your AI recommendation will appear here.</p>
              )}
              {recommendation && (
                <div className="animate-in fade-in duration-500">
                  <CardDescription>Recommended Opponent</CardDescription>
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
