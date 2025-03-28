import "./Home.css";
import galaxy from "../../assets/videos/galaxy.mp4";
import images from "../../assets/images/images.ico";
import satellite from "../../assets/images/satellite.ico";
import videos from "../../assets/images/videos.ico";
import weather from "../../assets/images/weather.ico";
import AstronomyPicture from "./components/AstronomyPicture";
import MarsWeather from "./components/MarsWeather";
import ImageLibrary from "./components/ImageLibrary";
import VideoLibrary from "./components/VideoLibrary";
import { useEffect, useRef, useState } from "react";
import spaceExplorerLogo from "../../assets/images/space-explorer-logo.png";

function Home() {
  const videoRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("astronomy");

  const handleItemChange = (tab) => {
    setSelectedItem(tab);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <main>
      <video autoPlay loop muted className="background-video" ref={videoRef}>
        <source src={galaxy} type="video/mp4" />
      </video>
      <section className="container">
        <div className="left-part">
          <img src={spaceExplorerLogo} alt="Logo" className="logo" />
          <div className="nav-items">
            <button
              className={`item ${selectedItem === "astronomy" ? "active" : ""}`}
              onClick={() => handleItemChange("astronomy")}
            >
              <img src={satellite} alt="Satellite Icon" className="ico" />
              <h2>Astronomy Picture of the Day</h2>
            </button>
            <button
              className={`item ${selectedItem === "weather" ? "active" : ""}`}
              onClick={() => handleItemChange("weather")}
            >
              <img src={weather} alt="Weather Icon" className="ico" />
              <h2>Mars Weather</h2>
            </button>
            <button
              className={`item ${selectedItem === "images" ? "active" : ""}`}
              onClick={() => handleItemChange("images")}
            >
              <img src={images} alt="Images Icon" className="ico" />
              <h2>Image Library</h2>
            </button>
            <button
              className={`item ${selectedItem === "videos" ? "active" : ""}`}
              onClick={() => handleItemChange("videos")}
            >
              <img src={videos} alt="Video Icon" className="ico" />
              <h2>Video Library</h2>
            </button>
          </div>
        </div>

        <div className="right-part">
          {selectedItem === "astronomy" && <AstronomyPicture />}
          {selectedItem === "weather" && <MarsWeather />}
          {selectedItem === "images" && <ImageLibrary />}
          {selectedItem === "videos" && <VideoLibrary />}
        </div>
      </section>
    </main>
  );
}

export default Home;
