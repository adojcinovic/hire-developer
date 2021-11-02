import "./Dev_card.css";
import { useContext } from "react";
import { developersContext } from "../../App";

const Dev_card = () => {
  const { developers } = useContext(developersContext);
  console.log(developers);

  return developers.map((element) => {
    return (
      <div className="dev-card">
        <div className="top">
          <img src={element.profile_pic} alt="" />
          <div className="bottom">
            <p>name: {element.name}</p>
            <p>language: {element.language}</p>
            <p>technology: {element.technology} </p>
          </div>
        </div>
      </div>
    );
  });
};

export default Dev_card;
