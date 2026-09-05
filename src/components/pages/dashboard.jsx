import Card from "../card";
import DashboardHeader from "../header";
import QuickActionsBtn from "../actionsBtn";


function Dashboard() {
  const cards = [
    {id: 1, icon: 'fa-solid fa-money-bill-trend-up', description: 'Total Daily Revenue', value: '$45,231.89' },
    {id: 2, icon: 'fa-solid fa-users', description: 'Outstanding Debtors', value: '+12,234' },
    {id: 3, icon: 'fa-solid fa-warehouse', description: 'Total Items In Stock', value: '+573' },
    {id: 4, icon: 'fa-solid fa-arrow-trend-down', description: 'Accounts Receivable', value: '$100,231.89' }
  ]

  const quickActions = [
    {id: 1, icon: 'fa-solid fa-plus', description: 'Add New Item'},
    {id: 2, icon: 'fa-solid fa-pen-to-square', description: 'Update Item'},
    {id: 3, icon: 'fa-solid fa-trash', description: 'Delete Item'},
    {id: 4, icon: 'fa-solid fa-file-invoice-dollar', description: 'Generate Invoice'}
  ]


  return (
    <div className="dashboard">
    <DashboardHeader headerObject={{ alias: 'JD', name: 'John Doe' }} />
    

      <div className="dashboard-quick-actions">
        <span className="dashboard-category-label">Quick Actions</span>

         <div className="quick-actions-btn-container">
            {quickActions.map(action => (
                <QuickActionsBtn key={action.id} icon={action.icon} description={action.description} />
            ))}
        </div>
    </div>

    <div>
        <span className="dashboard-category-label">Analytics</span>
        <div className="dashboard-analytics-section">
        
         {cards.map(card => (
        <Card key={card.id} cardObject={card} />
      ))}
     </div>
    </div>

    </div>
  );
}

export default Dashboard;



