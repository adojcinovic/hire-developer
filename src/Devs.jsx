import "./Devs.css";
import React, { useEffect, useState } from "react";

function Devs() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch("https://618129148bfae60017adfe77.mockapi.io/developers")
      .then((res) => res.json())
      .then((data) => setDevelopers(data));
  }, []);
  console.log(developers);

  return (
    <div>
      {developers.map((developer) => {
        return <p>{developer.name}</p>;
      })}
    </div>
  );
}

export default Devs;
