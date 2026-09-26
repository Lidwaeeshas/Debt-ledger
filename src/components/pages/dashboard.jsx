import Card from "../card";
import DashboardHeader from "../header";
import QuickActionsBtn from "../actionsBtn";
import DebtMainDetails from "../debtsProfiles";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DueCard from "../dueCard";
import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  
  const [totalRecievable,setTotalRecievable] = useState("-")
  const [totalDebts,setTotalDebts] = useState("-")
  const [overdueAmount,setOverdueAmount] = useState("-")
  const [debtors,setDebtors] = useState("-")
  
  const base = axios.create({
    baseUrl:"https://debt-ledger-dxzv.onrender.com"
    })
  const navigate = useNavigate();
  useRef(
    try{
    const response = await axios.get("/all-deebts")
    const data = response.data
    
    setTotalRecievable(data.totalRecievable)
    setTotalDebts(data.totalDebts)
    setDebtors(data.debtorsData)
    
    }else(error){
    throw new error(response.data.error);
    }
  )
  const cards = [
    {
      id: 1,
      icon: "fa-solid fa-money-bill-trend-up",
      description: "Total Amount Owed To You",
      value: {totalRecievable},
    },
    {
      id: 2,
      icon: "fa-solid fa-users",
      description: "Total  Debtors",
      value: {`₦ ${totalDebts}`},
    },
    {
      id: 3,
      icon: "fa-solid fa-warehouse",
      description: "Overdue Amount",
      value: {`₦ ${overdueAmount}`},
    },
  ];

  const quickActions = [
    { id: 1, icon: "fa-solid fa-plus", description: "New Debt" },
    { id: 2, icon: "fa-solid fa-pen-to-square", description: "Update Debt" },
    { id: 3, icon: "fa-solid fa-trash", description: "Delete Debt" },
    {
      id: 4,
      icon: "fa-solid fa-file-invoice-dollar",
      description: "View Debts",
    },
  ];

  const [showMore, setShowMore] = useState(false);
  const visibleDebts = showMore ? debtors : debtors.slice(0, 3);

 
  const handleQuickAction = (description) => {
    if (description === "New Debt") navigate("/add-debt");
    if (description === "Update Debt") {
      navigate("/debts");
    }
    if (description === "View Debts") {
      navigate("debts");
    }
    if (description === "Generate Report") window.print();
  };

  return (
    <div className="dashboard">
      <DashboardHeader headerObjecst={{ alias: "JD", name: "John Doe" }} />

      <div className="dashboard-quick-actions">
        <span className="dashboard-category-label">Quick Actions</span>

        <div className="quick-actions-btn-container">
          {quickActions.map((action) => (
            <QuickActionsBtn
              key={action.id}
              icon={action.icon}
              description={action.description}
              onClick={() => handleQuickAction(action.description)}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="dashboard-category-label">Analytics</span>

        {/* due box */}

        <div className="due-container">
          <h2>
            <i
              className="fa-solid fa-triangle-exclamation"
              aria-hidden="true"
            ></i>
            Due now / overdue
          </h2>

          <div className="due-list">
            {visibleDebts.map((debtors, index) => {
              return (
                <DueCard
                  key={index}
                  name={debtors.name}
                  amount={debtors.amount}
                  due_time={debtors.due_time}
                />
              );
            })}
          </div>
          {debtors.length > 3 && (
            <button
              className="see-more-btn"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "See Less" : "See More"}
            </button>
          )}
        </div>

        <div className="dashboard-analytics-section">
          {cards.map((card) => (
            <Card key={card.id} cardObject={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
