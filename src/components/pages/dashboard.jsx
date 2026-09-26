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
  const [totalDebts,settotalDebts] = useState("-")
  
  const base = axios.create({
    baseUrl:"https://debt-ledger-dxzv.onrender.com"
    })
  const navigate = useNavigate();
  useRef(
    try{
    const response = await axios.get("/all-deebts")
    const data = response.data
    setTotalRecievable(data.totalRecievable)
    
    }else{}
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
      value: "500",
    },
    {
      id: 3,
      icon: "fa-solid fa-warehouse",
      description: "Overdue Amount",
      value: "₦ 573,000",
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

  const debtors = [
    { name: "John Adeyemi", amount: "$1,200", due_time: "• 3d overdue" },
    { name: "Grace O.", amount: "$430", due_time: "• due today" },
    { name: "Tunde K.", amount: "$800", due_time: "• due tomorrow" },
    { name: "Sarah M.", amount: "$150", due_time: "• due in 2 days" },
    { name: "Sarah M.", amount: "$150", due_time: "• due in 2 days" },
  ];

  const [showMore, setShowMore] = useState(false);
  const visibleDebts = showMore ? debtors : debtors.slice(0, 3);

  const audioChunks = useRef([]);
  const mediaRecoder = useRef(null);
  const [startRecording, setStartRecording] = useState(false);

  const startedRecording = async () => {
    console.log("started recording");
    audioChunks.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecoder.current = new MediaRecorder(stream);
      mediaRecoder.current.ondataavailable = (e) => {
        if (!e.data.size > 0) return;
        audioChunks.current.push(e.data);
      };
      mediaRecoder.current.start();
      setStartRecording(true);
    } catch (error) {
      console.log(String(error));
    }
  };
  const stopRecording = () => {
    if (!mediaRecoder.current) return;
    mediaRecoder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      const form = new FormData();
      form.append("audio", blob, "user_voice.webm");
      mediaRecoder.current.stream?.getTracks().forEach((track) => track.stop());
      mediaRecoder.current = null;
      setStartRecording(false);
      try {
        const res = await fetch(`${API_URL}/audio`, {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || `Audio upload failed: ${res.status}`);
        }
        navigate(`/add-debt/${data.json}`);
      } catch (error) {
        console.log(error);
      }
    };
    mediaRecoder.current.stop();
  };

  const handleRecord = () => {
    if (startRecording) {
      stopRecording();
    } else {
      startedRecording();
    }
  };

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

      <div className="voice-board">
        <div className="voice-board-header">
          <h3>Voice Record Keeping</h3>
          <span className={`voice-status ${startRecording ? "live" : ""}`}>
            {startRecording ? "Recording…" : "Idle"}
          </span>
        </div>

        <div className="voice-board-body">
          <button
            className={`voice-mic-btn ${startRecording ? "recording" : ""}`}
            onClick={handleRecord}
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
          <p className="voice-hint">
            {startRecording ? "Tap to stop" : "Tap to start recording"}
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
            {visibleDebts.map((debtor, index) => {
              return (
                <DueCard
                  key={index}
                  name={debtor.name}
                  amount={debtor.amount}
                  due_time={debtor.due_time}
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
