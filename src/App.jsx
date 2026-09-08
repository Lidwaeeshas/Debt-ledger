import "./App.css";
import Dashboard from "./components/pages/dashboard";
import AddItem from "./components/pages/addNewItemPage";
import AddDebt from "./components/pages/addDebtPage";
import DebtMainDetails from "./components/debtsProfiles";
import { useState, useEffect } from "react";

function App() {
  const demoDebts = [
    {
      id: 1,
      name: "John Doe",
      outstanding_balance: "$500",
      debt_status: "Pending",
      due_in: "5 days",
    },
    {
      id: 2,
      name: "Mary Johnson",
      outstanding_balance: "$1,200",
      debt_status: "Overdue",
      due_in: "10 days",
    },
    {
      id: 3,
      name: "Ahmed Musa",
      outstanding_balance: "$300",
      debt_status: "Paid",
      due_in: "0 days",
    },
    {
      id: 4,
      name: "Sophia Williams",
      outstanding_balance: "$750",
      debt_status: "Pending",
      due_in: "2 weeks",
    },
  ];

  function DebtorSearch({ onSearch }) {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
      }
    };
  }

  return (
    <div>
      <div>
        <div className="debt-profile">
          <div className="debt-profile-header">
            <h2>Debtors</h2>
            <p>People who owe you money</p>
          </div>
          <div className="searchbar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search debtors..."
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {demoDebts.map((debt) => (
          <DebtMainDetails
            key={debt.id}
            id={debt.id}
            name={debt.name}
            outstanding_balance={debt.outstanding_balance}
            debt_status={debt.debt_status}
            due_in={debt.due_in}
          />
        ))}
      </div>{" "}
      {/* <Dashboard /><AddDebt></AddDebt> */}
    </div>
  );
}

export default App;
