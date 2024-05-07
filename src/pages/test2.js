import React, { useState } from "react";
import axios from "axios";

const Test2 = () => {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const handleTransfer = () => {
    axios
      .post("/api/contentful", {
        firstName: name.firstName,
        lastName: name.lastName,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return (
    <main>
      <input
        type="text"
        placeholder="輸入名字"
        name="firstName"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="輸入姓氏"
        name="lastName"
        onChange={handleChange}
      />
      <button onClick={handleTransfer}>傳送請求</button>
    </main>
  );
};

export default Test2;
