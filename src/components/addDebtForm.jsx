import { useRef, useState } from "react";

function DebtForm({
  text,
  htmlFor,
  value,
  onChange,
  span,
  type,
  required,
  onClick,
}) {
  const audioChunks = useRef([]);
  const mediaRecoder = useRef(null);

  const startRecording = async () => {
    audioChunks.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecoder.current = new MediaRecorder(stream);
      mediaRecoder.current.ondataavailable = (e) => {
        if (!e.data.size > 0) return;
        audioChunks.current.push(e.data);
      };
      mediaRecoder.current.start();
    } catch (error) {
      console.log(String(error));
    }
  };
  const stopRecording = (fiield) => {
    if (!mediaRecoder.current) return;
    mediaRecoder.current.stop();
    mediaRecoder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      const form = new FormData();
      form.append("file", blob, "user_voice.webm");
      try {
        const res = await fetch("/audio", {
          method: "POST",
          body: form,
        });
        if (data && data.text) {
          field.value = data.text;
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

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
        <button className="mic-btn-add-debt" onClick={onClick} type="button">
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
    </div>
  );
}

export default DebtForm;
