import React, { useState, useEffect } from "react";
import "./App.css"

const Card = ({ item, handleDelete, handleEdit }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [isEditing, setIsEditing] = useState(false);
  const [cardHeight, setCardHeight] = useState("80px");
  const [isChanged, setIsChanged] = useState(false);

  const handleFieldChange = (field, value) => {
    setIsChanged(true);
    setEditedItem(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const fullName = `${editedItem.first} ${editedItem.last}`;

  const handleFullNameChange = value => {
    setIsChanged(true);
    const [firstName, ...rest] = value.split(" "); 
    const lastName = rest.join(" ");
    handleFieldChange("first", firstName);
    handleFieldChange("last", lastName);
  };

  const toggleEdit = () => {
    const userAge = calculateAge(item.dob);
    if (userAge >= 18) {
      setIsEditing(!isEditing);
      if (!isEditing) {
        setEditedItem({ ...item });
      }
    } else {
      alert("You can only edit if you are an adult!");
    }
  };

  const saveEdit = () => {
    handleEdit(item.id, editedItem);
    setIsEditing(false);
    setIsChanged(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedItem({ ...item });
    setIsChanged(false);
  };

  useEffect(() => {
    setIsChanged(!isEqual(item, editedItem));
  }, [item, editedItem]);

  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const toggleCardHeight = () => {
    setCardHeight(cardHeight === "80px" ? "auto" : "80px");
  };

  const calculateAge = dob => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const [age, setAge] = useState(calculateAge(item.dob));

  const handleAgeChange = value => {
    const parsedAge = parseInt(value);
    if (!isNaN(parsedAge)) {
      setAge(parsedAge);
      const currentYear = new Date().getFullYear();
      handleFieldChange("dob", (currentYear - parsedAge).toString());
    } else {
      alert("Select The Age Or Press CTRL + A");
    }
  };

  return (
    <div id="card" key={item.id} style={{ height: cardHeight }}>
      <div id="lineMain">
        <div id="line">
          <div id="imgContainer">
            <div id="imgCont">
              <img src={item.picture} alt={item.name} />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={fullName}
                onChange={e => handleFullNameChange(e.target.value)}
              />
            ) : (
              <h2>{item.first + " " + item.last}</h2>
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
              value={age}
              onChange={e => handleAgeChange(e.target.value)}
            />
          ) : (
            <span>{`${age} Year`}</span>
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
            value={editedItem.description}
            onChange={e => handleFieldChange("description", e.target.value)}
          />
        ) : (
          <span>{item.description}</span>
        )}
      </div>
      <div id="methods">
        {isEditing && (
          <>
            <h1 onClick={cancelEdit}><i className="ri-close-line"></i></h1>
            {isChanged && <h1 onClick={saveEdit}><i className="ri-check-line"></i></h1>}
          </>
        )}
        {!isEditing && (
          <>
            <h1 onClick={() => handleDelete(item.id)}><i className="ri-delete-bin-6-line"></i></h1>
            <h1 onClick={toggleEdit}><i className="ri-pencil-line"></i></h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
