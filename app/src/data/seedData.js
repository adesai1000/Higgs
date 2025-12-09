export const CATEGORIES = [
  "Housing",
  "Utilities",
  "Transportation",
  "Groceries",
  "Dining Out",
  "Health & Medical",
  "Entertainment",
  "Shopping",
  "Education",
  "Loan Repayment",
  "Family & Children",
  "Gifts & Donations",
  "Travel",
  "Miscellaneous",
];

import { recalculateAllStats } from "./calculations";

export function createSeedData(name = "User") {
  const today = new Date();
  const month = today.toISOString().slice(0, 7); // "YYYY-MM"

  const data = {
    version: 1,
    user: { id: "u1", name, createdAt: today.toISOString().slice(0, 10) },
    categories: CATEGORIES,

    // Start with empty arrays - everything starts at 0
    incomes: [],
    expenses: [],
    investments: [],
    loans: [],
    assets: [],
    monthly: {},
    activity: [],
  };

  // Recalculate stats to initialize monthly data
  return recalculateAllStats(data);
}
