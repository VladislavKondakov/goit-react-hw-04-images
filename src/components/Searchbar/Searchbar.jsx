import React, { useState } from "react";
import { Header } from "./Searchbar.styled";

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(value);
     setIsModalOpen(true);
  };

  return (
    <Header className={`searchbar ${isModalOpen ? 'modal-open' : ''}`}>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </Header>
  );
};

export default Searchbar;
