

function QuickActionsBtn({ icon, description}) {

    return (
            
        <button className="quick-actions-btn">
            <span className="quick-actions-btn-icon">
                <i className={icon}></i>
            </span>
            
            <span className="quick-actions-btn-description">
                {description}
            </span>

        </button>

    );
}

export default QuickActionsBtn;