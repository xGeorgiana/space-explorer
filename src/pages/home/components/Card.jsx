import { useState } from "react";

function Card({ title, media, media_type, description }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailsState = () => {
    setShowDetails((previousState) => !previousState);
  };

  return (
    <div className="card">
      <div className="card-title">
        <h3>{title.length > 40 ? title.slice(0, 40) + "..." : title}</h3>
      </div>
      <div className="card-media">
        {media_type === "image" ? (
          <img src={media} alt="" />
        ) : (
          <video src={media}></video>
        )}
      </div>
      <button className="card-button" onClick={toggleDetailsState}>
        Details
      </button>
      {showDetails && (
        <div className="overlay">
          <div className="details">
            <h2>{title}</h2>
            <div className="details-div-image">
              {media_type === "image" ? (
                <img src={media} alt="" />
              ) : (
                <video controls src={media}></video>
              )}
            </div>
            <p>{description}</p>
            <button onClick={toggleDetailsState}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Card;
