#!/usr/bin/env python3
"""
Parking Lot ROI Calculator for StellarGenix
Calculates cost savings when switching from standard paint to TBL paint.
"""

import json
import sys
from typing import Dict, List, Any


def calculate_roi(
    lot_size_acres: float,
    current_paint_condition: str,
    number_of_spaces: int,
    repaint_frequency_years: int
) -> Dict[str, Any]:
    """
    Calculate ROI for switching to TBL paint.
    
    Args:
        lot_size_acres: Size of parking lot in acres
        current_paint_condition: Current condition (good, fair, poor)
        number_of_spaces: Total number of parking spaces
        repaint_frequency_years: How often standard paint needs repainting
    
    Returns:
        Dictionary with estimated savings, explanation, and chart data
    """
    
    # Cost assumptions based on industry standards
    STANDARD_PAINT_COST_PER_ACRE = 5000
    TBL_PAINT_COST_PER_ACRE = 12000
    ANCILLARY_COST_PER_ACRE = 1000  # Lost revenue, compliance costs, etc.
    TBL_PAINT_LIFESPAN = 3  # TBL paint lasts 3+ years
    
    # Condition multipliers
    condition_multipliers = {
        'good': 1.0,
        'fair': 1.1,
        'poor': 1.2
    }
    
    condition_multiplier = condition_multipliers.get(current_paint_condition.lower(), 1.1)
    
    # Base costs per repaint
    standard_paint_base = lot_size_acres * STANDARD_PAINT_COST_PER_ACRE
    tbl_paint_base = lot_size_acres * TBL_PAINT_COST_PER_ACRE
    ancillary_cost = lot_size_acres * ANCILLARY_COST_PER_ACRE
    
    # Calculate 3-year costs
    years_analyzed = 3
    standard_repaints_3yr = max(1, years_analyzed // repaint_frequency_years + (1 if years_analyzed % repaint_frequency_years > 0 else 0))
    tbl_repaints_3yr = 1  # TBL lasts 3+ years
    
    # Total costs including ancillary costs and condition adjustments
    standard_total_3yr = (standard_paint_base + ancillary_cost) * standard_repaints_3yr * condition_multiplier
    tbl_total_3yr = (tbl_paint_base + ancillary_cost) * tbl_repaints_3yr
    
    estimated_savings = max(0, standard_total_3yr - tbl_total_3yr)
    
    # Generate chart data for 6 years
    chart_data = []
    standard_cumulative = 0
    tbl_cumulative = 0
    
    for year in range(1, 7):
        # Standard paint schedule
        if year == 1 or (year - 1) % repaint_frequency_years == 0:
            standard_cumulative += (standard_paint_base + ancillary_cost) * condition_multiplier
        
        # TBL paint schedule (every 3 years)
        if year == 1 or (year - 1) % TBL_PAINT_LIFESPAN == 0:
            tbl_cumulative += tbl_paint_base + ancillary_cost
        
        chart_data.append({
            "year": year,
            "standardPaintCost": round(standard_cumulative),
            "tblPaintCost": round(tbl_cumulative)
        })
    
    # Generate detailed explanation
    cost_per_space_standard = standard_total_3yr / number_of_spaces if number_of_spaces > 0 else 0
    cost_per_space_tbl = tbl_total_3yr / number_of_spaces if number_of_spaces > 0 else 0
    
    explanation = f"""ROI Analysis for {lot_size_acres}-acre parking lot ({number_of_spaces} spaces):

COST BREAKDOWN (3-Year Period):
• Standard Paint: ${STANDARD_PAINT_COST_PER_ACRE:,}/acre every {repaint_frequency_years} years
• TBL® Paint: ${TBL_PAINT_COST_PER_ACRE:,}/acre every {TBL_PAINT_LIFESPAN}+ years
• Ancillary Costs: ${ANCILLARY_COST_PER_ACRE:,}/acre per repaint
• Condition Adjustment: {condition_multiplier:.1f}x multiplier for {current_paint_condition} condition

REPAINT SCHEDULE:
• Standard Paint: {standard_repaints_3yr} repaints needed in 3 years
• TBL® Paint: {tbl_repaints_3yr} repaint needed in 3 years

TOTAL COSTS:
• Standard Paint Total: ${standard_total_3yr:,.0f}
• TBL® Paint Total: ${tbl_total_3yr:,.0f}
• Your 3-Year Savings: ${estimated_savings:,.0f}

COST PER SPACE:
• Standard: ${cost_per_space_standard:.0f} per space over 3 years
• TBL®: ${cost_per_space_tbl:.0f} per space over 3 years

ADDITIONAL BENEFITS:
• Reduced business disruption from fewer repaints
• Enhanced curb appeal and property value
• Improved ADA compliance longevity
• Lower environmental impact"""

    return {
        "estimatedSavings": round(estimated_savings),
        "roiExplanation": explanation,
        "chartData": chart_data
    }


def main():
    """Main function to handle command line execution."""
    if len(sys.argv) != 5:
        print("Usage: python roi_calculator.py <lot_size_acres> <condition> <num_spaces> <repaint_frequency>")
        sys.exit(1)
    
    try:
        lot_size_acres = float(sys.argv[1])
        current_paint_condition = sys.argv[2]
        number_of_spaces = int(sys.argv[3])
        repaint_frequency_years = int(sys.argv[4])
        
        result = calculate_roi(
            lot_size_acres,
            current_paint_condition,
            number_of_spaces,
            repaint_frequency_years
        )
        
        print(json.dumps(result, indent=2))
        
    except ValueError as e:
        print(f"Error: Invalid input parameters - {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
