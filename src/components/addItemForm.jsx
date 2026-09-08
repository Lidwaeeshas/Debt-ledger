import { useState } from "react";
import SubField from "./subfield";

function AddNewItem({ category = "provision" }) {
  const [unitType, setUnitType] = useState("");
  const [subFields, setSubFields] = useState({});

  const formatDisplayNumber = (value) => {
    if (value === "" || value === null || value === undefined) return "";

    const digitsOnly = value.toString().replace(/\D/g, "");
    if (!digitsOnly) return "";

    return Number(digitsOnly).toLocaleString("en-US");
  };

  const handleNumericInput = (field, value) => {
    const cleanValue = value.replace(/\D/g, "");
    handleSubFields(field, cleanValue);
  };

  const handleSubFields = (field, value) => {
    setSubFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <form className="add-item-form">
        <label htmlFor="itemName" className="form-label">
          Item Name:
        </label>
        <input
          className="form-input"
          type="text"
          id="itemName"
          name="itemName"
          autoComplete="off"
          required
        />

        <label htmlFor="unitType" className="form-label">
          Unit Type:
        </label>
        <select
          className="form-select"
          id="unitType"
          name="unitType"
          value={unitType}
          onChange={(e) => setUnitType(e.target.value)}
          required
        >
          <option value="">Select Unit Type</option>
          {category === "masarufi" && (
            <>
              <option value="Mudu">Mudu</option>
              <option value="Bag">Bag</option>
            </>
          )}
          {category === "provision" && (
            <>
              <option value="Cartons">Cartons</option>
              <option value="Pieces">Pieces</option>
            </>
          )}
          {category === "texttiles" && (
            <>
              <option value="Yards">Yards</option>
              <option value="Rolls">Rolls</option>
            </>
          )}
        </select>

        {category === "masarufi" && (
          <div>
            {unitType === "Mudu" && (
              <div>
                <SubField
                  text="Number Of Mudus"
                  inputClassName="subfield-input"
                  labelClassName="subfield-label"
                  value={formatDisplayNumber(subFields.numberOfMudus ?? "")}
                  htmlFor="number-of-mudus"
                  inputId="number-of-mudus"
                  type="text"
                  placeholder="12"
                  onChange={(e) =>
                    handleNumericInput("numberOfMudus", e.target.value)
                  }
                />

                {Number(subFields.numberOfMudus) > 0 && (
                  <SubField
                    text="How much You Buy The Mudus"
                    inputClassName="subfield-input"
                    labelClassName="subfield-label"
                    value={formatDisplayNumber(subFields.priceOfMudus ?? "")}
                    htmlFor="mudu-price"
                    inputId="mudu-price"
                    type="text"
                    placeholder="12,000"
                    onChange={(e) =>
                      handleNumericInput("priceOfMudus", e.target.value)
                    }
                  />
                )}

                {Number(subFields.priceOfMudus) > 0 && (
                  <SubField
                    text="Selling Price Per Mudu"
                    inputClassName="subfield-input"
                    labelClassName="subfield-label"
                    value={formatDisplayNumber(
                      subFields.sellingPricePerMudu ?? "",
                    )}
                    htmlFor="sellingPricePerMudu"
                    inputId="sellingPricePerMudu"
                    type="text"
                    placeholder="20,000"
                    onChange={(e) =>
                      handleNumericInput("sellingPricePerMudu", e.target.value)
                    }
                  />
                )}
              </div>
            )}

            {unitType === "Bag" && (
              <div className="subField">
                <SubField
                  text="Bag Price"
                  inputClassName="subfield-input"
                  labelClassName="subfield-label"
                  value={formatDisplayNumber(subFields.bagPrice ?? "")}
                  htmlFor="bag-price"
                  inputId="bag-price"
                  type="text"
                  placeholder="20,000"
                  onChange={(e) =>
                    handleNumericInput("bagPrice", e.target.value)
                  }
                />

                {Number(subFields.bagPrice) > 0 && (
                  <SubField
                    text="Number Of Bags"
                    inputClassName="subfield-input"
                    labelClassName="subfield-label"
                    value={formatDisplayNumber(subFields.numberOfBags ?? "")}
                    htmlFor="bag-number"
                    inputId="bag-number"
                    type="text"
                    placeholder="20"
                    onChange={(e) =>
                      handleNumericInput("numberOfBags", e.target.value)
                    }
                  />
                )}

                {Number(subFields.numberOfBags) > 0 && (
                  <SubField
                    text="Mudus Per Bag"
                    inputClassName="subfield-input"
                    labelClassName="subfield-label"
                    value={formatDisplayNumber(subFields.mudusPerBag ?? "")}
                    htmlFor="mudus-per-bag"
                    inputId="mudus-per-bag"
                    type="text"
                    placeholder="50"
                    onChange={(e) =>
                      handleNumericInput("mudusPerBag", e.target.value)
                    }
                  />
                )}

                {Number(subFields.mudusPerBag) > 0 && (
                  <SubField
                    text="Selling Price Per Bag"
                    inputClassName="subfield-input"
                    labelClassName="subfield-label"
                    value={formatDisplayNumber(
                      subFields.sellingPricePerBag ?? "",
                    )}
                    htmlFor="selling-price-per-bag"
                    inputId="selling-price-per-bag"
                    type="text"
                    placeholder="20"
                    onChange={(e) =>
                      handleNumericInput("sellingPricePerBag", e.target.value)
                    }
                  />
                )}
              </div>
            )}
          </div>
        )}

        {category === "provision" && (
          <div>
            {unitType === "Cartons" && (
              <SubField
                text="Number Of Cartons"
                inputClassName="subfield-input"
                labelClassName="subfield-label"
                value={formatDisplayNumber(subFields.numberOfCartons ?? "")}
                htmlFor="number-of-cartons"
                inputId="number-of-cartons"
                type="text"
                placeholder="20"
                onChange={(e) =>
                  handleNumericInput("numberOfCartons", e.target.value)
                }
              />
            )}
            {Number(subFields.numberOfCartons) > 0 && (
              <SubField
                text="How Much Do You Buy A Carton"
                inputClassName="subfield-input"
                labelClassName="subfield-label"
                value={formatDisplayNumber(subFields.buyingPriceOfCarton ?? "")}
                htmlFor="buying-price-of-a-carton"
                inputId="buying-price-of-a-carton"
                type="text"
                placeholder="20"
                onChange={(e) =>
                  handleNumericInput("buyingPriceOfCarton", e.target.value)
                }
              />
            )}
            {Number(subFields.buyingPriceOfCarton) > 0 && (
              <SubField
                text="How Much Will You Sell A Carton"
                inputClassName="subfield-input"
                labelClassName="subfield-label"
                value={formatDisplayNumber(
                  subFields.sellingPriceOfCarton ?? "",
                )}
                htmlFor="selling-price-of-a-carton"
                inputId="selling-price-of-a-carton"
                type="text"
                placeholder="20"
                onChange={(e) =>
                  handleNumericInput("sellingPriceOfCarton", e.target.value)
                }
              />
            )}
          </div>
        )}

        <label htmlFor="itemDescription" className="form-label">
          Item Description:
        </label>
        <textarea
          className="form-textarea"
          id="itemDescription"
          name="itemDescription"
          required
        ></textarea>

        <button type="submit" className="form-button">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddNewItem;
