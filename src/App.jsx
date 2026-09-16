import "./App.css";
import Dashboard from "./components/pages/dashboard";
import AddItem from "./components/pages/addNewItemPage";
import AddDebt from "./components/pages/addDebtPage";
import DebtList from "./components/pages/debtListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-debt" element={<AddDebt />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/debts" element={<DebtList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
