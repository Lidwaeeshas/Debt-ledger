

function DashboardHeader({headerObject}){
    return(
        <div className="dashboard-header">
            <div className="header-line-one">
                <h2>Dashboard</h2>
                <div className="alias">{headerObject?.alias || 'UK'}</div>
            </div>
            <div>Welcome Back {headerObject?.name || 'Unknown'} 👋</div>
        </div>
    )
}

export default DashboardHeader;