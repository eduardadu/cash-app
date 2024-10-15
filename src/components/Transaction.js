import React from "react";
import { useWallet } from "../context/WalletProvider.js";
import { useCategories } from "../context/CategoryProvider.js";

function Transaction({ data }) {
  const { name, amount, date, id } = data;
  const { deleteTransaction, setOverlay, setSelectedTransaction } = useWallet();
  const { getCategory } = useCategories();

  const selectedCategory = getCategory(data.category);

  const handleEdit = (e) => {
    e.preventDefault();
    setSelectedTransaction(data);
    setOverlay(true);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    deleteTransaction(id);
  };

  //date - move to a helper
  var newDate = new Date(date);
  const month = newDate.toLocaleString("en-GB", { month: "short" }).slice(0, 3);
  const day = newDate.toLocaleString("en-GB", { day: "numeric" });
  var styledDate = day + " " + month;

  return (
    <>
      <div className="transaction " key={data.id}>
        <div className="transaction-info p-1">
          <div className="transaction-info p-1">
            <div className="date mr-2">{styledDate}</div>

            <div className="category" style={{ backgroundColor: selectedCategory?.color }}>
              <img src={`../icons/${selectedCategory?.icon}.png`} alt="icon" />
            </div>

            <div className="ml-2">{name}</div>
          </div>

          <div className={`amount ${data.type === "Expense" ? "expense" : "earning"}`}>
            <span>{data.type === "Expense" ? "-" : "+"}</span>
            {amount}
          </div>
        </div>

        <div className="config-buttons">
          <button onClick={handleEdit}>
            <img src="../images/edit.svg" alt="edit" />
          </button>
          <button onClick={handleDelete}>
            <img src="../images/delete.svg" alt="delete" />
          </button>
        </div>
      </div>
      <></>
    </>
  );
}

export default Transaction;
