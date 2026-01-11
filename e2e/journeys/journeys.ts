import journey1 from "../../static/journeys/1.json" with { type: "json" };
import journeyIncomeTaxCalculator from "../../static/journeys/income-tax-calculator.json" with { type: "json" };
import journeyRegisterCompanyService from "../../static/journeys/register_company_service.json" with { type: "json" };

// Map of journey ID -> journey JSON
export const journeys: Record<string, any> = {
    "1": journey1,
    "income-tax-calculator": journeyIncomeTaxCalculator,
    "register_company_service": journeyRegisterCompanyService,
};
