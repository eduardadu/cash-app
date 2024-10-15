//group transactions by year and month
export const groupTransactionsByYearAndMonth = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-GB", { month: "long" });

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    // Add the transaction to the appropriate year and month
    acc[year][month].push(transaction);
    return acc;
  }, {});
};

export const roundToTwo = (num) => {
  return Math.round(Number(num) * 100) / 100;
};
