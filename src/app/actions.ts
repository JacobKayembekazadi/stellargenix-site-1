'use server';

import { aiChatbot, type AIChatbotInput } from '@/ai/flows/ai-chatbot-for-faq';
import { parkingLotRoiEstimator, type ParkingLotRoiEstimatorInput } from '@/ai/flows/parking-lot-roi-estimator';

export async function submitRoiRequest(input: ParkingLotRoiEstimatorInput) {
  try {
    const result = await parkingLotRoiEstimator(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to estimate ROI. Please try again.' };
  }
}

export async function submitChatMessage(input: AIChatbotInput) {
  try {
    const result = await aiChatbot(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get a response. Please try again.' };
  }
}
