import React from "react";
import Transaction from "./Transaction.js";
import { useWallet } from "../context/WalletProvider.js";
import { groupTransactionsByYearAndMonth } from "./helpers/utils.js";

function Grid() {
  const { transactions } = useWallet();

  // Sort transactions by date
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  const groupedTransactions = groupTransactionsByYearAndMonth(transactions);

  const transactionElements =
    Object.keys(groupedTransactions).length > 0 ? (
      Object.keys(groupedTransactions)
        .sort((a, b) => b - a)
        .map((year, indexY) => (
          <div className="year-group" key={`year-${year}-${indexY}`}>
            {indexY !== 0 && <h4 className="year">{year}</h4>}
            {Object.keys(groupedTransactions[year]).map((month, indexM) => (
              <div className="month-group" key={`month-${year}-${month}-${indexM}`}>
                <h5 className="month pl-1">{month}</h5>
                <div className="group-wrapper">
                  {groupedTransactions[year][month].map((trans) => (
                    <Transaction data={trans} key={trans.id || `trans-${trans.is}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))
    ) : (
      <div className="mb-4">No transactions yet.</div>
    );

  return (
    <>
      <section className="transactions-wrapper p-1">{transactionElements}</section>
    </>
  );
}

export default Grid;
