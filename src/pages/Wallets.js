import React, { useMemo, useCallback } from "react";
import { useWallet } from "../context/WalletProvider.js";
import Overlay from "../components/Overlay.js";
import Grid from "../components/Grid.js";
import { useAuth } from "../context/AuthContext.js";

function Wallets() {
  const {
    selectedWallet,
    getTotal,
    getExpensesFromStartOfLastMonth,
    getEarningsFromStartOfLastMonth,
    overlay,
    setOverlay,
  } = useWallet();
  const { setAuth } = useAuth();

  const handleOverlay = useCallback(() => setOverlay(true), [setOverlay]);

  // Memoize expensive calculations
  const total = useMemo(() => getTotal(), [getTotal]);
  const lastMonthExpenses = useMemo(
    () => getExpensesFromStartOfLastMonth(),
    [getExpensesFromStartOfLastMonth]
  );
  const lastMonthEarnings = useMemo(
    () => getEarningsFromStartOfLastMonth(),
    [getEarningsFromStartOfLastMonth]
  );

  if (!selectedWallet) {
    return <div>Loading wallet data...</div>;
  }

  return (
    <>
      <section id="selected-wallet" className="wrapper wallet mt-4 ml-5">
        <div className="details p-2 pl-3 pr-3">
          <h1>{selectedWallet.name || "Unnamed Wallet"}</h1>
          <section id="summary" className="summary">
            <h2 className="total">{total || "0"}</h2>
            <div className="last-month">
              <h4 className="month">Last month</h4>
              <div>
                <span className="amount expense">-{lastMonthExpenses || "0"}</span>
                <span className="amount earning ml-2">+{lastMonthEarnings || "0"}</span>
              </div>
            </div>
          </section>
        </div>

        <Grid />

        <button
          className="btn-primary add"
          onClick={handleOverlay}
          aria-label="Add new transaction"
        >
          <img className="mr-1" alt="Add new transaction" src="../images/add.svg" />
          <span className="mr-1">Add</span>
        </button>

        {overlay && <Overlay />}
      </section>

      <button className="logout" onClick={() => setAuth(false)}>
        Logout
      </button>
    </>
  );
}

export default Wallets;
