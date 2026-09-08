import Card from "../card";
import DashboardHeader from "../header";
import QuickActionsBtn from "../actionsBtn";
import DebtMainDetails from "../debtsProfiles";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const cards = [
    {
      id: 1,
      icon: "fa-solid fa-money-bill-trend-up",
      description: "Total Daily Revenue",
      value: "$45,231.89",
    },
    {
      id: 2,
      icon: "fa-solid fa-users",
      description: "Outstanding Debtors",
      value: "+12,234",
    },
    {
      id: 3,
      icon: "fa-solid fa-warehouse",
      description: "Total Items In Stock",
      value: "+573",
    },
    {
      id: 4,
      icon: "fa-solid fa-arrow-trend-down",
      description: "Accounts Receivable",
      value: "$100,231.89",
    },
  ];

  const quickActions = [
    { id: 1, icon: "fa-solid fa-plus", description: "Add New Item" },
    { id: 2, icon: "fa-solid fa-pen-to-square", description: "Update Item" },
    { id: 3, icon: "fa-solid fa-trash", description: "Delete Item" },
    {
      id: 4,
      icon: "fa-solid fa-file-invoice-dollar",
      description: "Generate Invoice",
    },
  ];

  const [isRecording, setIsRecording] = useState(false);
  const handleVoiceRecord = () => {
    console.log("hello");
  };
  return (
    <div className="dashboard">
      <DashboardHeader headerObject={{ alias: "JD", name: "John Doe" }} />

      <div className="voice-board">
        <div className="voice-board-header">
          <h3>Voice Record Keeping</h3>
          <span className={`voice-status ${isRecording ? "live" : ""}`}>
            {isRecording ? "Recording…" : "Idle"}
          </span>
        </div>

        <div className="voice-board-body">
          <button
            className={`voice-mic-btn ${isRecording ? "recording" : ""}`}
            onClick={handleVoiceRecord}
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
          <p className="voice-hint">
            {isRecording ? "Tap to stop" : "Tap to start recording"}
          </p>
        </div>
      </div>

      <div className="dashboard-quick-actions">
        <span className="dashboard-category-label">Quick Actions</span>

        <div className="quick-actions-btn-container">
          {quickActions.map((action) => (
            <QuickActionsBtn
              key={action.id}
              icon={action.icon}
              description={action.description}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="dashboard-category-label">Analytics</span>
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
