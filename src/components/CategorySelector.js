import React, { useState } from "react";
import { useCategories } from "../context/CategoryProvider.js";

function CategorySelector({ selectedCategory, setSelectedCategory }) {
  const { categories, setCategories, imageGallery } = useCategories();
  const optionsList = [...categories, { name: "Add New" }];

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#000000",
    icon: "",
    id: Date.now(),
  });

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "Add New") {
      setShowNewCategoryInput(true); // Show input for new category
    } else {
      setShowNewCategoryInput(false); // Hide input if an existing category is selected
      const selected = categories.find((category) => category.name === selectedValue);
      setSelectedCategory(selected || { name: "", color: "", icon: "", id: "" }); // Set the selected category as an object
    }
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategory?.name !== "") {
      setCategories((prevCategories) => [...prevCategories, newCategory]); // Add the new category directly

      setSelectedCategory(newCategory); // Set the new category as selected
      setNewCategory({ name: "", color: "", icon: "", id: Date.now() }); // Clear the new category input
      setShowNewCategoryInput(false); // Hide the input field
    }
  };

  //New Category Handlers
  const handleChangeNewCategoryName = (e) => {
    const newName = e.target.value;
    setNewCategory((prevNew) => ({
      ...prevNew,
      name: newName,
    }));
  };

  const handleChangeNewCategoryColor = (e) => {
    const newColor = e.target.value;
    setNewCategory((prevNew) => ({
      ...prevNew,
      color: newColor,
    }));
  };

  const handleChangeNewIcon = (newIcon) => {
    setNewCategory((prevNew) => ({
      ...prevNew,
      icon: newIcon,
    }));
  };

  return (
    <>
      <div className="detail-input">
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory?.name} onChange={handleCategoryChange}>
          <option value=""></option>
          {optionsList.map((opt, index) => (
            <option key={index} value={opt.name}>
              {opt.name}
              <div
                style={{ backgroundColor: selectedCategory?.color, width: "2rem", height: "2rem" }}
              ></div>
            </option>
          ))}
        </select>
      </div>

      {showNewCategoryInput && (
        <div className="mt-3 details-group">
          <div className="detail-input">
            <label htmlFor="category">New Category</label>
            <input type="text" value={newCategory.name} onChange={handleChangeNewCategoryName} />
          </div>
          <div className="detail-input">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="head"
              name="head"
              value={newCategory.color}
              onChange={handleChangeNewCategoryColor}
            />
          </div>

          {imageGallery(handleChangeNewIcon, newCategory.icon)}

          <button className="btn-primary btn-small mt-1" onClick={handleNewCategorySubmit}>
            Add Category
          </button>
        </div>
      )}
    </>
  );
}

export default CategorySelector;
