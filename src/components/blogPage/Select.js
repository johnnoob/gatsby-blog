import React from "react";

const Select = ({ handleSelect, isAscending }) => {
  return (
    <select onChange={handleSelect}>
      <option value={false}>新至舊</option>
      <option value={true}>舊至新</option>
    </select>
  );
};

export default Select;
