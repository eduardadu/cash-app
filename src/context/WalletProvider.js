import React, { createContext, useContext, useState } from "react";
import walletsData from "../dummy-backend/wallets.js";

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [walletList, setWalletList] = useState(walletsData);
  const [selectedWalletId, setSelectedWalletId] = useState(walletsData[0]?.id || null);

  // Get the selected wallet based on selectedWalletId
  const selectedWallet = walletList.find((wallet) => wallet.id === selectedWalletId);

  // Show or hide Transaction Overlay
  const [overlay, setOverlay] = useState(false);

  // Transaction selected for editing
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Helper function to update the wallet inside the walletList
  const updateWallet = (updatedWallet) => {
    setWalletList((prevWalletList) =>
      prevWalletList.map((wallet) => (wallet.id === selectedWalletId ? updatedWallet : wallet))
    );
  };

  // Add a new transaction
  const addTransaction = (transaction) => {
    const newTransaction = { id: Date.now(), ...transaction };
    const updatedWallet = {
      ...selectedWallet,
      transactions: [...selectedWallet.transactions, newTransaction],
    };
    updateWallet(updatedWallet); // Update walletList with the updated wallet
  };

  const editTransaction = (updatedTransaction) => {
    const updatedTransactions = selectedWallet.transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    const updatedWallet = {
      ...selectedWallet,
      transactions: updatedTransactions,
    };

    updateWallet(updatedWallet); // Update walletList with the edited transaction
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    const updatedTransactions = selectedWallet.transactions.filter((t) => t.id !== id);
    const updatedWallet = {
      ...selectedWallet,
      transactions: updatedTransactions,
    };
    updateWallet(updatedWallet); // Update walletList after deleting the transaction
  };

  // Get transactions of selected wallet
  const transactions = selectedWallet.transactions || null;

  // Get earnings for the current wallet
  const getEarnings = () => {
    return transactions
      .filter((t) => t.type === "Earning")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  };

  // Get expenses for the current wallet
  const getExpenses = () => {
    return transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  };

  // Helper function to get the start of the last month and today's date
  const getLastMonthRange = () => {
    const today = new Date();
    const lastMonthStart = new Date();

    // Set lastMonthStart to the first day of last month
    lastMonthStart.setDate(1);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

    return { lastMonthStart, today };
  };

  const getEarningsFromStartOfLastMonth = () => {
    const { lastMonthStart, today } = getLastMonthRange();
    return transactions
      .filter(
        (t) =>
          t.type === "Earning" && new Date(t.date) >= lastMonthStart && new Date(t.date) <= today
      )
      .reduce((sum, t) => Number(sum) + Number(t.amount), 0);
  };

  // Get expenses from last month to today
  const getExpensesFromStartOfLastMonth = () => {
    const { lastMonthStart, today } = getLastMonthRange();
    return transactions
      .filter(
        (t) =>
          t.type === "Expense" && new Date(t.date) >= lastMonthStart && new Date(t.date) <= today
      )
      .reduce((sum, t) => Number(sum) + Number(t.amount), 0);
  };
  // Get total balance for the current wallet
  const getTotal = () => {
    const earnings = getEarnings();
    const expenses = getExpenses();
    return earnings - expenses;
  };

  return (
    <WalletContext.Provider
      value={{
        walletList,
        setWalletList,
        selectedWalletId,
        setSelectedWalletId,
        selectedWallet,
        addTransaction,
        editTransaction,
        deleteTransaction,
        transactions,
        getTotal,
        overlay,
        setOverlay,
        selectedTransaction,
        setSelectedTransaction,
        getEarningsFromStartOfLastMonth,
        getExpensesFromStartOfLastMonth,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
