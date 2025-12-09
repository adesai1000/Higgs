/**
 * Recalculates monthly statistics from incomes and expenses
 */
export function recalculateMonthlyStats(data) {
  const monthly = {};

  // Process all incomes by month
  if (data.incomes && Array.isArray(data.incomes)) {
    data.incomes.forEach((income) => {
      const month = income.date ? income.date.slice(0, 7) : null;
      if (!month) return;

      if (!monthly[month]) {
        monthly[month] = {
          incomeCents: 0,
          expenseCents: 0,
          netWorthCents: 0,
          byCategory: {},
        };
      }

      monthly[month].incomeCents += income.amountCents || 0;
    });
  }

  // Process all expenses by month
  if (data.expenses && Array.isArray(data.expenses)) {
    data.expenses.forEach((expense) => {
      const month = expense.date ? expense.date.slice(0, 7) : null;
      if (!month) return;

      if (!monthly[month]) {
        monthly[month] = {
          incomeCents: 0,
          expenseCents: 0,
          netWorthCents: 0,
          byCategory: {},
        };
      }

      monthly[month].expenseCents += expense.amountCents || 0;

      // Track by category
      if (expense.category) {
        monthly[month].byCategory[expense.category] =
          (monthly[month].byCategory[expense.category] || 0) +
          (expense.amountCents || 0);
      }
    });
  }

  // Calculate net worth for each month
  // Net worth = sum of all assets + sum of all investments - sum of all loans
  const totalAssetsCents = calculateTotalAssets(data);
  const totalInvestmentsCents = calculateTotalInvestments(data);
  const totalLoansCents = calculateTotalLoans(data);

  // For each month, calculate net worth chronologically
  // Start with base net worth (assets + investments - loans)
  // Then add income and subtract expenses for each month in order
  const months = Object.keys(monthly).sort();
  
  // Base net worth = assets + investments - loans
  let runningNetWorth = totalAssetsCents + totalInvestmentsCents - totalLoansCents;

  // Process months chronologically
  months.forEach((month) => {
    // Start with the running net worth from previous months
    // Add income and subtract expenses for this month
    runningNetWorth += monthly[month].incomeCents;
    runningNetWorth -= monthly[month].expenseCents;
    monthly[month].netWorthCents = runningNetWorth;
  });

  // If no months exist yet, create current month with base net worth
  if (months.length === 0) {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7);
    monthly[currentMonth] = {
      incomeCents: 0,
      expenseCents: 0,
      netWorthCents: totalAssetsCents + totalInvestmentsCents - totalLoansCents,
      byCategory: {},
    };
  }

  return monthly;
}

/**
 * Calculates total value of all assets
 */
export function calculateTotalAssets(data) {
  if (!data.assets || !Array.isArray(data.assets)) {
    return 0;
  }

  return data.assets.reduce((total, asset) => {
    return total + (asset.valueCents || 0);
  }, 0);
}

/**
 * Calculates total remaining principal of all loans
 */
export function calculateTotalLoans(data) {
  if (!data.loans || !Array.isArray(data.loans)) {
    return 0;
  }

  return data.loans.reduce((total, loan) => {
    return total + (loan.principalRemainingCents || 0);
  }, 0);
}

/**
 * Calculates total value of all investments
 * Investment value = quantity * buyPriceCents
 */
export function calculateTotalInvestments(data) {
  if (!data.investments || !Array.isArray(data.investments)) {
    return 0;
  }

  return data.investments.reduce((total, investment) => {
    const quantity = investment.quantity || 0;
    const buyPriceCents = investment.buyPriceCents || 0;
    return total + (quantity * buyPriceCents);
  }, 0);
}

/**
 * Recalculates and updates all statistics in the data object
 */
export function recalculateAllStats(data) {
  if (!data) return data;

  // Recalculate monthly stats
  data.monthly = recalculateMonthlyStats(data);

  return data;
}
