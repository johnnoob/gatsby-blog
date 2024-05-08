import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyComponent() {
  const [value, setValue] = useState("");
  const handleTransfer = () => {
    axios
      .post("/api/contentful", {
        text: value,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <button onClick={handleTransfer}>點擊傳輸</button>
    </div>
  );
}

export default MyComponent;
