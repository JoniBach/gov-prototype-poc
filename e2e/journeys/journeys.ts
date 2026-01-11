// eg import journeyIncomeTaxCalculator from "../../static/journeys/income-tax-calculator.json" with { type: "json" };
import journeyEmploySomeoneFva8e5 from "../../static/journeys/employ-someone-fva8e5.json" with { type: "json" };
import journeyEmploySomeoneHrv_A_ from "../../static/journeys/employ-someone-Hrv_A_.json" with { type: "json" };

// Map of journey ID -> journey JSON
export const journeys: Record<string, any> = {
    // eg "income-tax-calculator": journeyIncomeTaxCalculator,
    "employ-someone-fva8e5": journeyEmploySomeoneFva8e5,
    "employ-someone-Hrv_A_": journeyEmploySomeoneHrv_A_,
};
