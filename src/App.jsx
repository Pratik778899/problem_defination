import React, { useState } from "react";
import Card from "./Card";
import "./App.css";

const App = () => {
  const initialData = [
    {
      id: 1,
      name: `Hello World`,
      Age: `19 Years`,
      gender: `Rather Not To Say`,
      country: `India`,
      Description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit...`,
      searchQuery: "",
    },
    {
      id: 2,
      name: `Vicky`,
      Age: `19 Years`,
      gender: `Rather Not To Say`,
      country: `India`,
      Description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit...`,
      searchQuery: "",
    },
    {
      id: 3,
      name: `Munawar`,
      Age: `19 Years`,
      gender: `Rather Not To Say`,
      country: `India`,
      Description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit...`,
      searchQuery: "",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = e => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
    const updatedData = initialData.map(item => ({
      ...item,
      searchQuery: newSearchTerm,
    }));
    setData(updatedData);
  };

  // const handleDelete = id => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this card?"
  //   );
  //   if (confirmDelete) {
  //     const updatedData = data.filter(item => item.id !== id);
  //     setData(updatedData);
  //     alert("The card has been deleted");
  //   } else {
  //     alert("Delete operation cancelled");
  //   }
  // };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDelete = id => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedData = data.filter(item => item.id !== idToDelete);
    setData(updatedData);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (id, newData) => {
    setData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, ...newData } : item))
    );
  };

  const filteredData = data.filter(
    item => !searchTerm || item.name.toLowerCase().includes(item.searchQuery)
  );

  return (
    <>
      <div id="searchMain">
        <div id="search">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div id="wrapperContainer">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <Card
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <h1>No User Found</h1>
        )}
      </div>
      {showDeleteModal && (
        <div id="delete-main-container">
          <div className="deleteMain">
            <p>Are you sure you want to delete this card?</p>
            <div className="delete-modal">
              <button onClick={cancelDelete}>cancel</button>
              <button onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
