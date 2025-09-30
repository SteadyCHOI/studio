/**
 * @fileOverview AI opponent recommendation flow.
 *
 * This file defines a Genkit flow to recommend an AI opponent based on the user's experience level.
 *
 * @file Yinsh Launchpad: AI Opponent Recommendation Flow
 *
 * This module exports:
 * - `recommendAIOpponent`: Asynchronous function to suggest an AI opponent based on user experience.
 * - `RecommendAIOpponentInput`: Interface for the input data, defining the user's experience level.
 * - `RecommendAIOpponentOutput`: Interface for the output data, providing an AI opponent recommendation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the AI opponent recommendation flow.
 * Specifies the user's experience level.
 */
const RecommendAIOpponentInputSchema = z.object({
  experienceLevel: z
    .enum(['beginner', 'intermediate', 'expert'])
    .describe('The user\'s experience level with Yinsh or similar games.'),
});

/**
 * Type for the input to the AI opponent recommendation flow.
 */
export type RecommendAIOpponentInput = z.infer<typeof RecommendAIOpponentInputSchema>;

/**
 * Output schema for the AI opponent recommendation flow.
 * Specifies the recommended AI opponent and a brief rationale.
 */
const RecommendAIOpponentOutputSchema = z.object({
  opponentName: z.string().describe('The name of the recommended AI opponent.'),
  rationale: z.string().describe('The rationale for recommending this AI opponent.'),
});

/**
 * Type for the output of the AI opponent recommendation flow.
 */
export type RecommendAIOpponentOutput = z.infer<typeof RecommendAIOpponentOutputSchema>;

/**
 * Asynchronous function to recommend an AI opponent based on user experience.
 * @param input - The user's experience level.
 * @returns A promise resolving to the recommended AI opponent and rationale.
 */
export async function recommendAIOpponent(input: RecommendAIOpponentInput): Promise<RecommendAIOpponentOutput> {
  return recommendAIOpponentFlow(input);
}

/**
 * Prompt definition for the AI opponent recommendation.
 * This prompt uses the user's experience level to suggest an appropriate AI opponent.
 */
const recommendAIOpponentPrompt = ai.definePrompt({
  name: 'recommendAIOpponentPrompt',
  input: {schema: RecommendAIOpponentInputSchema},
  output: {schema: RecommendAIOpponentOutputSchema},
  prompt: `You are an AI that recommends Yinsh AI opponents based on user experience level.

  Given the user's experience level, recommend an AI opponent and briefly explain why it's a good fit.

  Experience Level: {{{experienceLevel}}}
  `,
});

/**
 * Genkit flow for recommending an AI opponent.
 * This flow takes the user's experience level as input and returns an AI opponent recommendation.
 */
const recommendAIOpponentFlow = ai.defineFlow(
  {
    name: 'recommendAIOpponentFlow',
    inputSchema: RecommendAIOpponentInputSchema,
    outputSchema: RecommendAIOpponentOutputSchema,
  },
  async input => {
    const {output} = await recommendAIOpponentPrompt(input);
    return output!;
  }
);
