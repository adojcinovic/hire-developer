import "./Dev_card.css";
import { useContext } from "react";
import { developersContext } from "../../App";

const Dev_card = (props) => {
  const { developers } = useContext(developersContext);
  const { setModalOpen, setPickedId } = props;

  return developers.map((element) => {
    return (
      <div className="dev-card">
        <div className="top">
          <img src={element.profile_pic} alt="" />
          <div className="details">
            <p>name: {element.name}</p>
            <p>language: {element.language}</p>
            <p>technology: {element.technology} </p>
            <p>ID: {element.id}</p>
          </div>
        </div>
        <div className="options">
          <p onClick={() => setModalOpen(true)}>show details</p>
          <p onClick={() => setPickedId(element.id)}>edit</p>
          <p className="delete">delete</p>
        </div>
      </div>
    );
  });
};

export default Dev_card;
