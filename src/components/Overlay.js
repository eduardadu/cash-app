import { useState } from "react";
import { useCategories } from "../context/CategoryProvider.js";
import CategorySelector from "./CategorySelector.js";
import { useWallet } from "../context/WalletProvider.js";

function Overlay() {
  const {
    addTransaction,
    editTransaction,
    setOverlay,
    setSelectedTransaction,
    selectedTransaction,
  } = useWallet();

  //should edit existing or add
  const task = selectedTransaction ? "Edit" : "Add";

  const { getCategory } = useCategories();

  // Set initial values based on the transaction prop if it exists
  const [description, setDescription] = useState(selectedTransaction?.name || "");
  const [notes, setNotes] = useState(selectedTransaction?.notes || "");
  const [amount, setAmount] = useState(selectedTransaction?.amount || 0);
  const [date, setDate] = useState(
    selectedTransaction?.date || new Date().toISOString().substring(0, 10)
  );

  const [errorMessage, setErrorMessage] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    getCategory(selectedTransaction?.category)
  );

  const [isExpense, setIsExpense] = useState(selectedTransaction?.type === "Expense" || true);

  const handleAddClick = () => {
    // Ensure all fields are filled
    if (description && selectedCategory && date && amount) {
      const editedTransaction = {
        id: selectedTransaction?.id || new Date().getTime(),
        name: description,
        type: isExpense ? "Expense" : "Earning",
        category: selectedCategory.id,
        date: date,
        amount: parseFloat(amount),
        notes: notes,
      };

      task === "Add" ? addTransaction(editedTransaction) : editTransaction(editedTransaction); // Ensure it updates based on id

      handleClose();
    } else {
      setErrorMessage(true);
    }
  };

  const handleClose = () => {
    setSelectedTransaction("");
    setOverlay(false);
  };

  const handleToggle = () => {
    setIsExpense((prev) => !prev);
  };

  return (
    <>
      <div className="overlay">
        <div className="overlay-wrapper p-2">
          <h2 className="mb-3">{task} Transaction</h2>

          <div className="switch-group">
            <span
              className="switch-earning"
              style={!isExpense ? { color: "#208C40" } : { color: "#EEA299" }}
            >
              Income
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isExpense}
                onChange={handleToggle}
                id="expenseToggle"
              />
              <span className="slider" />
            </label>
            <span
              className="switch-expense"
              style={isExpense ? { color: "#933F0E" } : { color: "#208C40" }}
            >
              Expense
            </span>
          </div>

          <div className="details-group">
            <div className="detail-input">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                min="0.00"
                step="0.01"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="detail-input">
              <label htmlFor="description">Name</label>
              <input
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="detail-input">
              <label htmlFor="dates">Dates</label>
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="detail-input">
              <label htmlFor="notes">Notes</label>
              <input
                id="notes"
                type="text"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <CategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {errorMessage && (
              <div className="error-message p-1 mt-1">
                Please be sure to fill everything and add the new category if you have one
              </div>
            )}
          </div>

          <div className="btn-group">
            <button className="btn-outlined-primary " onClick={handleClose}>
              Cancel
            </button>

            <button className="btn-primary" onClick={handleAddClick}>
              {task}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overlay;
