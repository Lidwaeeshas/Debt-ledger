import { useState } from "react";

function DebtMainDetails({
  name,
  outstanding_balance,
  debt_status,
  due_in,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [action, setAction] = useState("");
  const [active, setActive] = useState({});

  const handleAction = (action, id) => {
    if (!action) return;
    if (action === "partialPayments") {
      setActive({ type: "partialPayment", id: id });
    } else if (action === "deleteDebt") {
      setActive({ type: "deleteDebt", id: id });
    } else if (action === "markPaid") {
      setActive({ type: "markPaid", id: id });
    }
  };

  return (
    <div>
      <div className="debt-container">
        <div className="debt-main-details" onClick={() => setIsOpen(!isOpen)}>
          <span className="debtor-name">{name}</span>
          <span className="debtor-outstanding-balance">
            {outstanding_balance}
          </span>
          <span className="debt-status">{debt_status}</span>
          <span className="due-in">{due_in}</span>
        </div>
        {isOpen && (
          <div>
            <div className="editable-fields">
              <button
                className="mark-paid"
                onClick={() => handleAction("markPaid", id)}
              >
                <i className="fa-solid fa-mark-circle"></i>Mark Paid
              </button>
              <button
                className="add-partial-payment"
                onClick={() => handleAction("partialPayment", id)}
              >
                <i className="fa-solid fa-clock-rotate-left"></i>Add Partial
                Payment
              </button>
              <button
                className="delete-debt"
                onClick={() => handleAction("markPaid", id)}
              >
                <i className="fa-solid fa-dutsbin"></i>Delete Debt
              </button>
            </div>
            <span className="close-editable" onClick={() => setIsOpen(false)}>
              🔼
            </span>
            <div className="popup-actions">
              {/*partial payment field */}
              {active.type === "partialPayment" && (
                <PartialPayment
                  id={active.id}
                  onClose={() => {
                    setAction("");
                    setActive({});
                  }}
                />
              )}

              {/*delete debt field */}
              {active.type === "deleteDebt" && (
                <Confirmation
                  type="delete"
                  id={active.id}
                  onClose={() => {
                    setAction("");
                    setActive({});
                  }}
                />
              )}

              {/*mark debt as paid  field */}
              {active.type === "markPaid" && (
                <Confirmation
                  type="paid"
                  id={active.id}
                  onClose={() => {
                    setAction("");
                    setActive({});
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DebtMainDetails;
