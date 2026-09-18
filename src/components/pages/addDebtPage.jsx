import DebtForm from "../addDebtForm";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddDebt() {
  const [payload, setPayload] = useState({});
  const { payloads } = useParams();

  payloads ? setPayload(payloads) : payload;
  const trader_id = 2;

  const handlePayload = (field, value) => {
    setPayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaving = async (e) => {
    e.preventDefault();
    const myData = {
      debtor_name: payload.costumerName,
      recievable: payload.totalAmount,
      debtor_phoneNumber: payload.phoneNumber,
      liability: payload.productDescription,
      due_date: payload.dueDate,
      guarantor: payload.guarantor === "eh" ? true : false,
      guarantor_name: payload.guarantorName,
      addtional_description: payload.additionalDescription,
      trader_id: Number(trader_id),
    };
    try {
      const res = await axios.post("http://127.0.0.1:8000/save-debt", myData, {
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="add-debt-container">
      <div>
        <h2>Enter Debt Details</h2>
      </div>
      <form onSubmit={handleSaving} className="debt-form">
        <DebtForm
          text="Customer Name"
          value={payload.costumerName ?? ""}
          htmlFor="costomer-naame"
          onClick={() => console.log("comming soon")}
          onChange={(e) => handlePayload("costumerName", e.target.value)}
        />
        <DebtForm
          text="Phone Number"
          value={payload.phoneNumber ?? ""}
          htmlFor="phone-number"
          onChange={(e) => handlePayload("phoneNumber", e.target.value)}
          type="phoneNumber"
        />
        <DebtForm
          text="Amount"
          value={payload.totalAmount ?? ""}
          htmlFor="costomer-naame"
          type="number"
          onChange={(e) => handlePayload("totalAmount", e.target.value)}
        />
        <div className="product-description">
          <label htmlFor="product-description">Liability</label>
          <textarea
            className="product-description"
            placeholder="what products does he take"
            id="product-description"
            value={payload.productDescription ?? ""}
            onChange={(e) =>
              handlePayload("productDescription", e.target.value)
            }
          ></textarea>
        </div>
        <DebtForm
          text="Repayment Date"
          span="agreed date for repayment"
          value={payload.dueDate ?? ""}
          htmlFor="due-date"
          onChange={(e) => handlePayload("dueDate", e.target.value)}
          type="date"
        />

        <div className="guarantor-box">
          <h3>Does this debt requirees guarantor ?</h3>
          <label htmlFor="eh">Yes</label>
          <input
            type="radio"
            name="guarantor"
            id="eh"
            value="eh"
            onChange={(e) => handlePayload("guarantor", e.target.value)}
          />
          <label htmlFor="aa">No</label>
          <input
            value="aa"
            id="aa"
            type="RADIO"
            name="guarantor"
            onChange={(e) => handlePayload("guarantor", e.target.value)}
          />
          {payload.guarantor === "eh" && (
            <DebtForm
              text="Guarantor Name"
              value={payload.guarantorName ?? ""}
              htmlFor="guarantor"
              onChange={(e) => handlePayload("guarantorName", e.target.value)}
            />
          )}
        </div>

        <div className="debt-description">
          <label htmlFor="additional-info">Additional Details</label>
          <textarea
            className="textarea-debt-box"
            placeholder="Additional details regarding the debt"
            id="additional-info"
            value={payload.additionalDescription ?? ""}
            onChange={(e) =>
              handlePayload("additionalDescription", e.target.value)
            }
          ></textarea>
        </div>
        <button className="save-details" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddDebt;
