import axios from "axios";
import { useEffect, useState } from "react";

function AstronomyPicture() {
  const [apod, setApod] = useState(null);
  const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  useEffect(() => {
    const fetchDataApod = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        setApod(response.data);
      } catch (error) {
        console.error("Error fetching APOD:", error);
      }
    };
    fetchDataApod();
  }, []);

  return (
    <>
      <h1 className="astronomy-title">
        {apod ? apod.title : "Title is loading"}
      </h1>
      <div className="astronomy-div-image">
        <img
          src={apod ? apod.url : "Image is loading"}
          className="astronomy-image"
          alt="Astronomy Picture of the Day"
        />
      </div>
      <p className="astronomy-explanation">
        {apod ? apod.explanation : "Explanation is loading"}
      </p>
    </>
  );
}
export default AstronomyPicture;
