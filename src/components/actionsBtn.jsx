function QuickActionsBtn({ icon, description, onClick }) {
  return (
    <button className="quick-actions-btn" type="button" onClick={onClick}>
      <span className="quick-actions-btn-icon">
        <i className={icon}></i>
      </span>

      <span className="quick-actions-btn-description">{description}</span>
    </button>
  );
}

export default QuickActionsBtn;
