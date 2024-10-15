import { useState, useEffect } from "react";
import { useCategories } from "../context/CategoryProvider.js";
import CategorySelector from "./CategorySelector.js";
import { useWallet } from "../context/WalletProvider.js";
import { roundToTwo } from "./helpers/utils.js";

function Overlay() {
  const {
    addTransaction,
    editTransaction,
    setOverlay,
    setSelectedTransaction,
    selectedTransaction,
  } = useWallet();

  const task = selectedTransaction ? "Edit" : "Add";
  const { getCategory } = useCategories();

  // State variables
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isExpense, setIsExpense] = useState(true);

  // Set initial values based on the selected transaction
  useEffect(() => {
    if (selectedTransaction) {
      setDescription(selectedTransaction.name);
      setNotes(selectedTransaction.notes);
      setAmount(selectedTransaction.amount);
      setDate(selectedTransaction.date);
      setSelectedCategory(getCategory(selectedTransaction.category));
      setIsExpense(selectedTransaction.type === "Expense");
    }
  }, [selectedTransaction, getCategory]);

  const handleAddClick = () => {
    // Ensure all fields are filled
    if (description && selectedCategory && date && amount) {
      const editedTransaction = {
        id: selectedTransaction?.id || new Date().getTime(),
        name: description,
        type: isExpense ? "Expense" : "Earning",
        category: selectedCategory.id,
        date,
        amount: roundToTwo(parseFloat(amount)),
        notes,
      };

      // Add or edit the transaction based on the task type
      task === "Add" ? addTransaction(editedTransaction) : editTransaction(editedTransaction);
      handleClose();
    } else {
      setErrorMessage(true);
    }
  };

  const handleClose = () => {
    setSelectedTransaction(null);
    setOverlay(false);
  };

  const handleToggle = () => {
    setIsExpense((prev) => !prev);
  };

  return (
    <div className="overlay">
      <div className="overlay-wrapper p-2">
        <h2 className="mb-3">{task} Transaction</h2>

        <div className="switch-group">
          <span className={`switch-earning ${!isExpense ? "active" : ""}`}>Income</span>
          <label className="switch">
            <input type="checkbox" checked={isExpense} onChange={handleToggle} id="expenseToggle" />
            <span className="slider" />
          </label>
          <span className={`switch-expense ${isExpense ? "active" : ""}`}>Expense</span>
        </div>

        <div className="details-group">
          <InputField
            id="amount"
            label="Amount"
            type="number"
            min="0.00"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
          <InputField
            id="description"
            label="Name"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputField
            id="date"
            label="Dates"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <InputField
            id="notes"
            label="Notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {errorMessage && (
            <div className="error-message p-1 mt-1">
              Please ensure all fields are filled in correctly.
            </div>
          )}
        </div>

        <div className="btn-group">
          <button className="btn-outlined-primary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleAddClick}>
            {task}
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable input component for better organization
const InputField = ({ id, label, type, ...props }) => (
  <div className="detail-input">
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} {...props} />
  </div>
);

export default Overlay;
