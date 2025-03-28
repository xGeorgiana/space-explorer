import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function VideoLibrary() {
  const [videos, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://images-api.nasa.gov/search?q=&media_type=video"
        );

        const items = response.data.collection.items;

        const videoJsonUrls = items.map((item) => item.href);

        const videoResponses = await Promise.all(
          videoJsonUrls.map((url) => axios.get(url))
        );

        const videosWithUrls = items.map((item, index) => {
          const videoLinks = videoResponses[index].data;
          const mp4Link = videoLinks.find((link) => link.includes(".mp4"));
          return {
            ...item,
            videoUrl: mp4Link || null,
          };
        });

        setVideo(videosWithUrls);
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="cards">
      {videos ? (
        videos.map((item, index) => (
          <Card
            key={index}
            title={item.data[0].title}
            media={item.videoUrl}
            media_type={item.data[0].media_type}
            description={item.data[0].description}
          />
        ))
      ) : (
        <p>"Videos are loading.."</p>
      )}
    </div>
  );
}
export default VideoLibrary;
