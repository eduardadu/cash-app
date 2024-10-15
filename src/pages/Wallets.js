import React from "react";
//import { useAppContext } from "../context/AppContext.js";
import { useWallet } from "../context/WalletProvider.js";
import Overlay from "../components/Overlay.js";
import Grid from "../components/Grid.js";

function Wallets() {
  const {
    selectedWallet,
    getTotal,
    getExpensesFromStartOfLastMonth,
    getEarningsFromStartOfLastMonth,
    overlay,
    setOverlay,
  } = useWallet();
  const handleOverlay = () => setOverlay(true);

  return (
    <>
      <section id="selected-wallet" className="wrapper wallet mt-4 ml-5">
        <div className="details p-2 pl-3 pr-3">
          <h1>{selectedWallet.name}</h1>
          <section id="summary" className="summary">
            <h2 className="total">{getTotal()}</h2>
            <div className="last-month">
              <h4 className="month ">Last month</h4>
              <div>
                <span className="amount expense">-{getExpensesFromStartOfLastMonth()}</span>
                <span className="amount earning ml-2">+{getEarningsFromStartOfLastMonth()}</span>
              </div>
            </div>
          </section>
        </div>

        <Grid />

        <button className="btn-primary add" onClick={handleOverlay}>
          <img className="mr-1" alt="add" src="../images/add.svg" />
          <span className="mr-1">Add</span>
        </button>

        {overlay && <Overlay />}
      </section>
    </>
  );
}

export default Wallets;
