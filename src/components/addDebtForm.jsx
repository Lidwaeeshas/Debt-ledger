import { useRef, useState } from "react";

function DebtForm({ text, htmlFor, value, onChange, span, type, required }) {
  return (
    <div className="add-debt-field">
      <label htmlFor={htmlFor} className="add-debt-label">
        {text}
      </label>
      <span className="debt-meta-data">{span}</span>
      <div className="input-mic-container">
        <input
          type={type ?? "text"}
          id={htmlFor}
          value={value}
          onChange={onChange}
          className="add-debt-input"
          required={required}
        />
      </div>
    </div>
  );
}

export default DebtForm;

{
  /**
  
  <button
          className={`mic-btn-add-debt ${startRecording ? "recording" : ""}`}
          onClick={() => handleRecord()}
          type="button"
        >
          <i className="fa-solid fa-microphone"></i>
        </button>
  */
}
