import DebtForm from "../addDebtForm";
import { useState } from "react";
import { v4 } from "uuid";

function AddDebt() {
  const [payload, setPayload] = useState({});

  const getTraderData = () => {
    const rawTraderData = localStorage.getItem("traderData");
  };

  const handlePayload = (field, value) => {
    setPayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSaving = () => {
    const myData = {
      debtor_name: payload.costumerName,
      amount_owes: payload.totalAmount,
      debtor_phoneNumber: payload.phoneNumber,
      debt_description: payload.productDescription,
      due_date: payload.dueDate,
      guarantor: payload.guarantor ?? undefined,
      guarantor_name: payload.guarantorName,
      addtional_description: payload.addtionalDescription,
      id: v4(),
      trader_id: localStorage.getItem("trader_id"),
    };
    const rawDebts = localStorage.getItem("debts");
    const debts = rawDebts ? JSON.parse(rawDebts) : [];
    const updatedDebts = [...debts, myData];
    localStorage.setItem("debts", JSON.stringify(updatedDebts));
    console.log("data saved");
  };

  return (
    <div className="add-debt-container">
      <div>
        <h2>Shigar Da Bayanin Bashi</h2>
      </div>
      <form action="submit" className="debt-form">
        <DebtForm
          text="Sunan Customa"
          value={payload.costumerName ?? ""}
          htmlFor="costomer-naame"
          onClick={() => console.log("comming soon")}
          onChange={(e) => handlePayload("costumerName", e.target.value)}
        />
        <DebtForm
          text="Numbar Wayan Customa"
          value={payload.phoneNumber ?? ""}
          htmlFor="phone-number"
          onChange={(e) => handlePayload("phoneNumber", e.target.value)}
          type="phoneNumber"
        />
        <DebtForm
          text="Adadin Kudin Da Ake Bin Customa"
          value={payload.totalAmount ?? ""}
          htmlFor="costomer-naame"
          type="number"
          onChange={(e) => handlePayload("totalAmount", e.target.value)}
        />
        <div className="product-description">
          <label htmlFor="product-description">Wasu Kaya Ya Amsa</label>
          <textarea
            className="product-description"
            placeholder="rubuta kayan da ya amsa"
            id="product-description"
            value={payload.productDescription}
            onChange={(e) =>
              handlePayload("productDescription", e.target.value)
            }
          ></textarea>
        </div>
        <DebtForm
          text="Yaushe Zai Biya"
          span="yaushe akayi da shi zai biya"
          value={payload.dueDate ?? ""}
          htmlFor="due-date"
          onChange={(e) => handlePayload("dueDate", e.target.value)}
          type="date"
        />

        <div className="guarantor-box">
          <h3>Yana Da Garanto ?</h3>
          <label htmlFor="eh">Eh</label>
          <input
            type="radio"
            name="guarantor"
            id="eh"
            value="eh"
            onChange={(e) => handlePayload("guarantor", e.target.value)}
          />
          <label htmlFor="aa">Aa</label>
          <input
            value="aa"
            id="aa"
            type="RADIO"
            name="guarantor"
            onChange={(e) => handlePayload("guarantor", e.target.value)}
          />
          {payload.guarantor === "eh" && (
            <DebtForm
              text="Sunan Garanto"
              value={payload.guarantorName ?? ""}
              htmlFor="guarantor"
              onChange={(e) => handlePayload("guarantorName", e.target.value)}
            />
          )}
        </div>

        <div className="debt-description">
          <label htmlFor="additional-info">Karin Bayani</label>
          <textarea
            className="textarea-debt-box"
            placeholder="Karin bayani akan bashin"
            id="additional-info"
            value={payload.addtionalDescription}
            onChange={(e) =>
              handlePayload("addtionalDescription", e.target.value)
            }
          ></textarea>
        </div>
        <button className="save-details">Yi Saving</button>
      </form>
    </div>
  );
}

export default AddDebt;
