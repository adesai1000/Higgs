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

export function createSeedData(name = "User") {
  const today = new Date();
  const month = today.toISOString().slice(0, 7); // "YYYY-MM"

  return {
    version: 1,
    user: { id: "u1", name, createdAt: today.toISOString().slice(0, 10) },
    categories: CATEGORIES,

    // Income: salary + freelance + dividends
    incomes: [
      {
        id: "inc1",
        date: `${month}-01`,
        amountCents: 1500000,
        source: "Software Engineer Salary",
        note: "Monthly paycheck",
      },
      {
        id: "inc2",
        date: `${month}-10`,
        amountCents: 200000,
        source: "Freelance Project",
        note: "Web app project",
      },
      {
        id: "inc3",
        date: `${month}-15`,
        amountCents: 50000,
        source: "Dividends",
        note: "Stock payouts",
      },
    ],

    // Expenses by category
    expenses: [
      {
        id: "exp1",
        date: `${month}-03`,
        amountCents: 400000,
        category: "Housing",
        note: "Mortgage payment",
      },
      {
        id: "exp2",
        date: `${month}-05`,
        amountCents: 25000,
        category: "Utilities",
        note: "Electricity and water",
      },
      {
        id: "exp3",
        date: `${month}-06`,
        amountCents: 60000,
        category: "Transportation",
        note: "Car fuel and maintenance",
      },
      {
        id: "exp4",
        date: `${month}-07`,
        amountCents: 45000,
        category: "Groceries",
        note: "Supermarket shopping",
      },
      {
        id: "exp5",
        date: `${month}-08`,
        amountCents: 30000,
        category: "Dining Out",
        note: "Weekend restaurant",
      },
      {
        id: "exp6",
        date: `${month}-10`,
        amountCents: 20000,
        category: "Health & Medical",
        note: "Insurance premium",
      },
      {
        id: "exp7",
        date: `${month}-11`,
        amountCents: 15000,
        category: "Entertainment",
        note: "Netflix, concerts",
      },
      {
        id: "exp8",
        date: `${month}-12`,
        amountCents: 20000,
        category: "Shopping",
        note: "Clothes and accessories",
      },
      {
        id: "exp9",
        date: `${month}-13`,
        amountCents: 10000,
        category: "Education",
        note: "Online course",
      },
      {
        id: "exp10",
        date: `${month}-15`,
        amountCents: 50000,
        category: "Loan Repayment",
        note: "Car loan EMI",
      },
      {
        id: "exp11",
        date: `${month}-18`,
        amountCents: 25000,
        category: "Travel",
        note: "Weekend getaway",
      },
      {
        id: "exp12",
        date: `${month}-20`,
        amountCents: 10000,
        category: "Miscellaneous",
        note: "Misc items",
      },
    ],

    // Investments
    investments: [
      { id: "inv1", symbol: "AAPL", quantity: 50, buyPriceCents: 17500 },
      { id: "inv2", symbol: "MSFT", quantity: 30, buyPriceCents: 32000 },
      { id: "inv3", symbol: "TSLA", quantity: 20, buyPriceCents: 25000 },
      { id: "inv4", symbol: "VOO", quantity: 40, buyPriceCents: 40000 },
    ],

    // Loans
    loans: [
      { id: "loan1", name: "Mortgage", principalRemainingCents: 25000000 },
      { id: "loan2", name: "Car Loan", principalRemainingCents: 1200000 },
    ],

    // Assets
    assets: [
      {
        id: "asset1",
        name: "Primary Home",
        type: "House",
        valueCents: 85000000,
      },
      {
        id: "asset2",
        name: "Savings Account",
        type: "Cash",
        valueCents: 15000000,
      },
      { id: "asset3", name: "Car", type: "Vehicle", valueCents: 2500000 },
      {
        id: "asset4",
        name: "Luxury Watch",
        type: "Luxury",
        valueCents: 1200000,
      },
    ],

    // Monthly rollup used by the Home page
    monthly: {
      [month]: {
        incomeCents: 1750000,
        expenseCents: 665000,
        netWorthCents: 100000000, // ≈ $1M
        byCategory: {
          Housing: 400000,
          Utilities: 25000,
          Transportation: 60000,
          Groceries: 45000,
          "Dining Out": 30000,
          "Health & Medical": 20000,
          Entertainment: 15000,
          Shopping: 20000,
          Education: 10000,
          "Loan Repayment": 50000,
          Travel: 25000,
          Miscellaneous: 10000,
        },
      },
    },

    activity: [],
  };
}
