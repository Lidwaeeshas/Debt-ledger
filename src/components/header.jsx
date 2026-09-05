

function DashboardHeader({headerObject}){
    return(
        <div className="dashboard-header">
            <div className="header-line-one">
                <h2>Dashboard</h2>
                <div className="alias">{headerObject?.alias || 'UK'}</div>
            </div>
            <div>Welcome Back, {headerObject?.name || 'Unknown'} <i className="fas fa-hand" style={{ marginLeft: '10px' ,color: '#107ce9'}}></i></div>
        </div>
    )
}

export default DashboardHeader;