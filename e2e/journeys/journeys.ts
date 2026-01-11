import journey1 from "../../static/journeys/1.json" with { type: "json" };
import journeyIncomeTaxCalculator from "../../static/journeys/income-tax-calculator.json" with { type: "json" };
import journeyRegisterCompanyService from "../../static/journeys/register_company_service.json" with { type: "json" };
import journeyAlcoholDutiesCalculator from "../../static/journeys/alcohol-duties-calculator.json" with { type: "json" };
import journey1d4e36d1A8de48bcB7bb8748404872e1 from "../../static/journeys/1d4e36d1-a8de-48bc-b7bb-8748404872e1.json" with { type: "json" };

// Map of journey ID -> journey JSON
export const journeys: Record<string, any> = {
    "1": journey1,
    "income-tax-calculator": journeyIncomeTaxCalculator,
    "register_company_service": journeyRegisterCompanyService,
    "alcohol-duties-calculator": journeyAlcoholDutiesCalculator,
    "1d4e36d1-a8de-48bc-b7bb-8748404872e1": journey1d4e36d1A8de48bcB7bb8748404872e1,
};
