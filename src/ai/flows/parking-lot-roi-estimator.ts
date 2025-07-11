// Parking-Lot-ROI-Estimator.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for estimating the ROI of restriping a parking lot using StellarGenix solutions.
 *
 * - parkingLotRoiEstimator - A function that estimates the ROI of restriping a parking lot.
 * - ParkingLotRoiEstimatorInput - The input type for the parkingLotRoiEstimator function.
 * - ParkingLotRoiEstimatorOutput - The return type for the parkingLotRoiEstimator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParkingLotRoiEstimatorInputSchema = z.object({
  lotSizeAcres: z.number().describe('The size of the parking lot in acres.'),
  currentPaintCondition: z
    .string()
    .describe(
      'The current condition of the parking lot paint (e.g., good, fair, poor).'
    ),
  numberOfSpaces: z
    .number()
    .describe('The total number of parking spaces in the lot.'),
  repaintFrequencyYears: z
    .number()
    .describe(
      'How often the lot is repainted in years using standard paint (e.g., 1, 2, 3).'
    ),
});
export type ParkingLotRoiEstimatorInput = z.infer<
  typeof ParkingLotRoiEstimatorInputSchema
>;

const RoiChartDataSchema = z.object({
  year: z.number().describe('The year for the cost data.'),
  standardPaintCost: z.number().describe('Cumulative cost for standard paint.'),
  tblPaintCost: z.number().describe('Cumulative cost for TBL paint.'),
});

const ParkingLotRoiEstimatorOutputSchema = z.object({
  estimatedSavings: z
    .number()
    .describe(
      'The estimated cost savings over three years by using StellarGenix TBL paint.'
    ),
  roiExplanation: z
    .string()
    .describe(
      'A detailed explanation of how the ROI was calculated, including assumptions.'
    ),
  chartData: z.array(RoiChartDataSchema).describe('The data for the cost comparison chart over 6 years.')
});
export type ParkingLotRoiEstimatorOutput = z.infer<
  typeof ParkingLotRoiEstimatorOutputSchema
>;

export async function parkingLotRoiEstimator(
  input: ParkingLotRoiEstimatorInput
): Promise<ParkingLotRoiEstimatorOutput> {
  try {
    return await parkingLotRoiEstimatorFlow(input);
  } catch (error) {
    console.warn('AI service unavailable, using fallback calculation:', error);
    return fallbackRoiCalculation(input);
  }
}

// Fallback ROI calculation when AI service is unavailable
function fallbackRoiCalculation(input: ParkingLotRoiEstimatorInput): ParkingLotRoiEstimatorOutput {
  const { lotSizeAcres, currentPaintCondition, numberOfSpaces, repaintFrequencyYears } = input;
  
  // Cost assumptions
  const standardPaintCostPerAcre = 5000;
  const tblPaintCostPerAcre = 12000;
  const ancillaryCostPerRepaint = lotSizeAcres * 1000; // Lost revenue, fines, etc.
  
  // Calculate costs over 3 years
  const standardPaintBaseCost = lotSizeAcres * standardPaintCostPerAcre;
  const tblPaintBaseCost = lotSizeAcres * tblPaintCostPerAcre;
  
  // Calculate number of repaints needed in 3 years
  const standardRepaints = Math.ceil(3 / repaintFrequencyYears);
  const tblRepaints = 1; // TBL paint lasts 3+ years
  
  // Total costs including ancillary costs
  const standardTotalCost = (standardPaintBaseCost + ancillaryCostPerRepaint) * standardRepaints;
  const tblTotalCost = (tblPaintBaseCost + ancillaryCostPerRepaint) * tblRepaints;
  
  const estimatedSavings = standardTotalCost - tblTotalCost;
  
  // Generate chart data for 6 years
  const chartData = [];
  let standardCumulative = 0;
  let tblCumulative = 0;
  
  for (let year = 1; year <= 6; year++) {
    // Standard paint repainting schedule
    if (year === 1 || (year - 1) % repaintFrequencyYears === 0) {
      standardCumulative += standardPaintBaseCost + ancillaryCostPerRepaint;
    }
    
    // TBL paint repainting schedule (every 3 years)
    if (year === 1 || (year - 1) % 3 === 0) {
      tblCumulative += tblPaintBaseCost + ancillaryCostPerRepaint;
    }
    
    chartData.push({
      year,
      standardPaintCost: standardCumulative,
      tblPaintCost: tblCumulative,
    });
  }
  
  const conditionMultiplier = currentPaintCondition === 'poor' ? 1.2 : 
                              currentPaintCondition === 'fair' ? 1.1 : 1.0;
  
  const roiExplanation = `Based on your ${lotSizeAcres}-acre parking lot with ${numberOfSpaces} spaces in ${currentPaintCondition} condition:

• Standard paint costs: $${standardPaintCostPerAcre.toLocaleString()}/acre every ${repaintFrequencyYears} years
• TBL® paint costs: $${tblPaintCostPerAcre.toLocaleString()}/acre every 3+ years
• Ancillary costs per repaint: $${ancillaryCostPerRepaint.toLocaleString()} (lost revenue, ADA compliance, etc.)

Over 3 years, you would need ${standardRepaints} standard repaints vs. ${tblRepaints} TBL® repaint.

Total standard paint cost: $${standardTotalCost.toLocaleString()}
Total TBL® paint cost: $${tblTotalCost.toLocaleString()}
Your savings: $${estimatedSavings.toLocaleString()}

Additional benefits: Reduced business disruption, improved curb appeal, longer-lasting ADA compliance.`;

  return {
    estimatedSavings: Math.max(0, Math.round(estimatedSavings * conditionMultiplier)),
    roiExplanation,
    chartData,
  };
}

const prompt = ai.definePrompt({
  name: 'parkingLotRoiEstimatorPrompt',
  input: {schema: ParkingLotRoiEstimatorInputSchema},
  output: {schema: ParkingLotRoiEstimatorOutputSchema},
  prompt: `You are a financial analyst specializing in parking lot maintenance costs. You are helping a client evaluate the ROI of using StellarGenix's TBL paint solution compared to standard paint.

  Given the following information about the parking lot:
  - Lot Size: {{lotSizeAcres}} acres
  - Current Paint Condition: {{currentPaintCondition}}
  - Number of Spaces: {{numberOfSpaces}}
  - Repaint Frequency (standard paint): {{repaintFrequencyYears}} years

  Your task is to:
  1. Calculate the estimated cost savings over a 3-year period by using StellarGenix's TBL paint, which lasts at least 3 years.
  2. Provide a detailed explanation of your calculations. Include assumptions made (e.g., cost per repaint for standard paint is $5000 per acre, TBL paint is $12000 per acre but lasts 3 years, ancillary costs like lost rent or fines).
  3. Generate data for a chart comparing the cumulative cost of 'standardPaintCost' vs. 'tblPaintCost' for 6 years. Assume the first repaint for both happens in Year 1. Standard paint is repainted every {{repaintFrequencyYears}} years. TBL paint is repainted every 3 years.

  The output must be a JSON object with three fields:
  - estimatedSavings: The estimated cost savings over three years.
  - roiExplanation: A detailed explanation of the ROI calculation.
  - chartData: An array of objects for 6 years, each containing 'year', 'standardPaintCost', and 'tblPaintCost'.

  Ensure the estimatedSavings value is a number and chartData is an array.
  `,
});

const parkingLotRoiEstimatorFlow = ai.defineFlow(
  {
    name: 'parkingLotRoiEstimatorFlow',
    inputSchema: ParkingLotRoiEstimatorInputSchema,
    outputSchema: ParkingLotRoiEstimatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
