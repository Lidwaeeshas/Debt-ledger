import { useState } from "react";

function DueCard({ name, amount, due_time }) {
  return (
    <div>
      <div className="due-details-row">
        <span>{name}</span>
        <div className="due-amount-date">
          <span>{amount}</span>
          <span>{due_time}</span>
        </div>
      </div>
    </div>
  );
}

export default DueCard;
