import React, { useState } from "react";
import Card from "./Card";
import "./App.css";
import celebrities from "./celebrities.json";

const App = () => {
  const [data, setData] = useState(celebrities);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = e => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredData = celebrities.filter(
      item =>
        item.first.toLowerCase().includes(searchTerm) ||
        item.last.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  };

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
        {data.length > 0 ? (
          data.map(item => (
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
