import React, { useState } from "react";
import Card from "./Card";
import "../src/App.css";

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: `John Doe`,
      Age: `19 Years`,
      gender: `Rather Not To Say`,
      country: `India`,
      Description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit...`,
    },
    {
      id: 2,
      name: `John Doe`,
      Age: `19 Years`,
      gender: `Rather Not To Say`,
      country: `India`,
      Description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit...`,
    },
    {
      id: 3,
      name: `John Doe`,
      Age: `19 Years`,
      gender: `Rather Not To Say`,
      country: `India`,
      Description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit...`,
    },
  ]);

  const handleDelete = id => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmDelete) {
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
      alert("The card has been deleted");
    } else {
      alert("Delete operation cancelled");
    }
  };

  const handleEdit = (id, newData) => {
    setData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, ...newData } : item))
    );
  };

  return (
    <div id="wrapperContainer">
      {data.map(item => (
        <Card
          key={item.id}
          item={item}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default App;
