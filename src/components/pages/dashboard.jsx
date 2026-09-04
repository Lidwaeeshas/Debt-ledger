import { useState } from "react";
import Card from "../card";
import DashboardHeader from "../header";


function Dashboard() {
  const cards = [
    {id: 1, icon: 'fa-solid fa-money-bill-trend-up', description: 'Total Daily Revenue', value: '$45,231.89' },
    {id: 2, icon: 'fa-solid fa-box', description: 'Daily Sales', value: '+2350' },
    {id: 3, icon: 'fa-solid fa-users', description: 'Total People Who Owe You', value: '+12,234' },
    {id: 4, icon: 'fa-solid fa-warehouse', description: 'Total Items In Stock', value: '+573' }
  ]

  return (
    <div className="dashboard">
    <DashboardHeader headerObject={{ alias: 'JD', name: 'John Doe' }} />
     <div>
        
        <span className="dashboard-analytics-section">Analytics</span>
         {
      cards.map(card => (
        <Card key={card.id} cardObject={card} />
      ))
      }
     </div>

    </div>
  );
}

export default Dashboard;



