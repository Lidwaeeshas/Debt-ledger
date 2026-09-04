

function Card({cardObject}) {
    
    return (
        <div className="card-container">
            <div className="card">
                <span className="card-icon">
                    <i className= {cardObject.icon} style={cardObject.icon === `fa-solid fa-users` ? {color:`red`} : undefined}></i>
                </span>
                <span className="card-description">{cardObject.description}</span>
                <div className="card-value">{cardObject.value}</div>
            </div>
        </div>
    );
}

export default Card;