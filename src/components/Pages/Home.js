import React, { useEffect, useState } from "react";
import "./Home.css";

const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

export const Home = () => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [photoClasses, setPhotoClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState([]); // State to keep track of loaded images

  const togglePopup = (image = null) => {
    setSelectedImage(image);
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isOpen) {
      togglePopup(null);
    } else if (event.key === "ArrowRight" && isOpen) {
      navigateImages(1);
    } else if (event.key === "ArrowLeft" && isOpen) {
      navigateImages(-1);
    }
  };

  const navigateImages = (direction) => {
    if (!selectedImage) return;

    const currentIndex = images.indexOf(selectedImage);
    let newIndex = currentIndex + direction;

    if (newIndex >= images.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = images.length - 1;
    }

    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const classes = images.map((image) => {
      const img = new Image();
      img.src = image;
      return img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";
    });
    setPhotoClasses(classes);

    // Add event listener for ESC key
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const loadImagesSequentially = (index) => {
      if (index >= images.length) return; // Stop when all images are loaded

      setLoadedImages((prevLoadedImages) => [
        ...prevLoadedImages,
        images[index],
      ]);
      setTimeout(() => loadImagesSequentially(index + 1), 100); // Load next image with a small delay
    };

    loadImagesSequentially(0); // Start loading images from the first one
  }, []);

  return (
    <div className="photo-grid">
      {loadedImages.map((image, index) => (
        <div className="photo" key={index}>
          <img
            src={image}
            alt={`Img${index + 1}`}
            className="photo-img"
            onClick={() => togglePopup(image)}
          />
        </div>
      ))}

      {isOpen && selectedImage && (
        <div className="popup" onClick={() => togglePopup(null)}>
          <button className="close-button" onClick={() => togglePopup(null)}>
            &times;
          </button>
          <button className="prev-button" onClick={() => navigateImages(-1)}>
            &larr;
          </button>
          <img src={selectedImage} alt="Selected" className="popup-img" />
          <button className="next-button" onClick={() => navigateImages(1)}>
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
