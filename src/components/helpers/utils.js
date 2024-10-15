//group transactions by year and month
export const groupTransactionsByYearAndMonth = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear(); // Get the year as a number (e.g., 2024)
    const month = date.toLocaleString("en-GB", { month: "long" });

    // Initialize year group if not exists
    if (!acc[year]) {
      acc[year] = {};
    }
    // Initialize month group if not exists
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    // Add the transaction to the appropriate year and month
    acc[year][month].push(transaction);
    return acc;
  }, {});
};
