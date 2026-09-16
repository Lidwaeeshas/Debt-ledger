import { useEffect, useState } from "react";
import DebtMainDetails from "../debtsProfiles";
import axios from "axios";

function DebtList() {
  const demoDebts = [
    {
      id: 1,
      name: "John Doe",
      outstanding_balance: "$500",
      debt_status: "Pending",
      due_in: "5 days",
      phoneNumber: "08032961535",
      liability: "atamfa",
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
  const [debts, setDebts] = useState([]);

  const getDebts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/debts", {
        withCredentials: true,
      });
      setDebts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <input type="text" placeholder="Search debtors..." />
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
            phoneNumber={debt.phoneNumber}
            liability={debt.liability}
            description={debt.description}
          />
        ))}
      </div>
    </div>
  );
}

export default DebtList;
