// src/ai/flows/ai-chatbot-for-faq.ts
'use server';
/**
 * @fileOverview An AI chatbot for answering questions about StellarGenix services.
 *
 * - aiChatbot - A function that handles the chatbot interactions.
 * - AIChatbotInput - The input type for the aiChatbot function.
 * - AIChatbotOutput - The return type for the aiChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotInputSchema = z.object({
  query: z.string().describe('The user query about StellarGenix services.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  input: {schema: AIChatbotInputSchema},
  output: {schema: AIChatbotOutputSchema},
  prompt: `You are an AI chatbot specializing in answering questions about StellarGenix Pavement Solutions. Use the following information about StellarGenix to answer questions.

StellarGenix Pavement Solutions provides precision striping, crack-fill, and seal-coat services for parking lots in Houston and Dallas.

Key benefits include:
- TBL® traffic paint that lasts 2-3x longer than standard paint
- Laser-level layout for precision
- ADA compliance audits and signage
- 72-hour turnaround
- "Stay-Sharp" 1,095-Day Warranty

Here are some frequently asked questions:
- Why TBL® paint vs. standard? TBL paint lasts 2-3x longer, reducing repaint cycles and costs.
- How soon can crews mobilize after PO? Typically within 72 hours.
- What if weather delays? We will reschedule at the earliest opportunity to minimize disruption.
- Payment & financing options? We offer various payment options, including financing for qualified customers.

User Query: {{{query}}}
Chatbot Response:`, 
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
