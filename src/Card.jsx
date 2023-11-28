import React, { useState } from "react";
import "./App.css";

const Card = ({ item, handleDelete, handleEdit }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [isEditing, setIsEditing] = useState(false);
  const [cardHeight, setCardHeight] = useState("80px");

  const handleFieldChange = (field, value) => {
    setEditedItem(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedItem({ ...item });
    }
  };

  const saveEdit = () => {
    handleEdit(item.id, editedItem);
    setIsEditing(false);
  };

  const toggleCardHeight = () => {
    setCardHeight(cardHeight === "80px" ? "auto" : "80px");
  };

  return (
    <div id="card" key={item.id} style={{ height: cardHeight }}>
      <div id="lineMain">
        <div id="line">
          <div id="imgContainer">
            <div id="imgCont">
              <img
                src="https://media.istockphoto.com/id/1163048590/photo/vampire-dracula-3d-cartoon-character-using-a-pair-of-infra-red-binoculars-3d-illustration.jpg?s=1024x1024&w=is&k=20&c=VUDieZefaDcv4SZ8VOAIyL3HdZCKm3N9kQ0yjsadZZQ="
                alt={item.name}
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedItem.name}
                onChange={e => handleFieldChange("name", e.target.value)}
              />
            ) : (
              <h2>{item.name}</h2>
            )}
          </div>
          <div id="icon" onClick={toggleCardHeight}>
            <h1>+</h1>
          </div>
        </div>
      </div>
      <div id="ageGenderCountry">
        <div id="age">
          <label>Age</label>
          {isEditing ? (
            <input
              type="text"
              value={editedItem.Age}
              onChange={e => handleFieldChange("Age", e.target.value)}
            />
          ) : (
            <span>{item.Age}</span>
          )}
        </div>
        <div id="genderMain">
          <label htmlFor="userType">Gender</label>
          {isEditing ? (
            <select
              id="userType"
              value={editedItem.gender}
              onChange={e => handleFieldChange("gender", e.target.value)}
            >
              <option value="Rather Not To Say">Rather Not To Say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="TransGender">TransGender</option>
            </select>
          ) : (
            <span>{editedItem.gender}</span>
          )}
        </div>

        <div id="country">
          <label>Country</label>
          {isEditing ? (
            <input
              type="text"
              value={editedItem.country}
              onChange={e => handleFieldChange("country", e.target.value)}
            />
          ) : (
            <span>{item.country}</span>
          )}
        </div>
      </div>
      <div id="description">
        <label>Description</label>
        {isEditing ? (
          <input
            type="text"
            value={editedItem.Description}
            onChange={e => handleFieldChange("Description", e.target.value)}
          />
        ) : (
          <span>{item.Description}</span>
        )}
      </div>
      <div id="methods">
        {isEditing ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button onClick={toggleEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
