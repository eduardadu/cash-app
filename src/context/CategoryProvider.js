import React, { createContext, useContext, useState } from "react";
import { categoriesList } from "../dummy-backend/categories.js";

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(categoriesList);

  const getCategory = (id) => {
    return categories.find((cat) => Number(cat.id) === id);
  };

  const images = require.context("../../public/icons/", true);
  const imageList = images.keys().map((imagePath) => ({
    src: images(imagePath),
    name: imagePath.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, ""), // Extract file name without extension
  }));

  const imageGallery = (setNewIcon, newCategory) => {
    return (
      <div className="icons-box">
        {imageList.map((image, index) => (
          <div
            className={`${newCategory === image.name && "icon-selected"}`}
            key={index}
            onClick={() => setNewIcon(image.name)}
          >
            <img src={image.src} alt={`icon-${image.name}`} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <CategoryContext.Provider value={{ categories, setCategories, getCategory, imageGallery }}>
      {children}
    </CategoryContext.Provider>
  );
};
