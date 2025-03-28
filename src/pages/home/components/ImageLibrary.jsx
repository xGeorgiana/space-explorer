import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function ImageLibrary() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://images-api.nasa.gov/search?q=&media_type=image"
        );
        setImages(response.data.collection.items);
      } catch (error) {
        console.error("An error ocurred: ", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="cards">
      {images ? (
        images.map((item, index) => (
          <Card
            key={index}
            title={item.data[0].title}
            media={item.links ? item.links[0].href : ""}
            media_type={item.data[0].media_type}
            description={item.data[0].description}
          />
        ))
      ) : (
        <p>Images are loading..</p>
      )}
    </div>
  );
}

export default ImageLibrary;
