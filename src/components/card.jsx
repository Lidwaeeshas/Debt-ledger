function Card({ cardObject }) {
  return (
    <div
      className="card-container"
      style={
        cardObject.description === `Total Amount Owed To You`
          ? { gridArea: `card-1` }
          : cardObject.description === `Total  Debtors`
            ? { gridArea: `card-2` }
            : cardObject.description === `Total Items In Stock`
              ? { gridArea: `card-3` }
              : cardObject.description === `Accounts Receivable`
                ? { gridArea: `card-4` }
                : undefined
      }
    >
      <div
        className={`card ${cardObject.description === `Total Daily Revenue` ? `card-revenue` : cardObject.description === `Outstanding Debtors` ? `card-debtors` : cardObject.description === `Total Items In Stock` ? `card-stock` : undefined}`}
      >
        <span className="card-icon">
          <i
            className={cardObject.icon}
            style={
              cardObject.icon === `fa-solid fa-users`
                ? { color: `#F09595` }
                : cardObject.icon === `fa-solid fa-arrow-trend-down`
                  ? { color: `#F09595` }
                  : undefined
            }
          ></i>
        </span>
        <span className="card-description">{cardObject.description}</span>
        <div
          className="card-value"
          style={
            cardObject.description === `Total Daily Revenue`
              ? { color: `green` }
              : cardObject.description === `Outstanding Debtors`
                ? { color: `#F09595` }
                : undefined
          }
        >
          {cardObject.value}
        </div>
      </div>
    </div>
  );
}

export default Card;
