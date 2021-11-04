import "./Dev_card.css";
import { useContext } from "react";
import { developersContext } from "../../App";
import axios from "axios";

const Dev_card = (props) => {
  const { developers } = useContext(developersContext);
  const { setDevelopers } = useContext(developersContext);
  const { setModalOpen, setEditOpen, setPickedId, pickedId } = props;
  console.log(setDevelopers);

  const deleteDev = (id) => {
    axios
      .delete(`https://618129148bfae60017adfe77.mockapi.io/developers/${id}`)
      .then((response) => {
        if (response.statusText === "OK") {
          setDevelopers(developers.filter((element) => element.id !== id));
        }
      })
      .catch((error) => console.log(error));
  };

  return developers.map((element) => {
    return (
      <div className="dev-card">
        <div className="top">
          <img src={element.profile_pic} alt="" />
          <div className="details">
            <p>name: {element.name}</p>
            <p>language: {element.language}</p>
            <p>technology: {element.technology} </p>
          </div>
        </div>
        <div className="options">
          <p
            onClick={() => {
              setModalOpen(true);
              setPickedId(element.id);
            }}
            className="hover show-details"
          >
            show details
          </p>
          <p
            onClick={() => {
              setPickedId(element.id);
              setEditOpen(true);
            }}
            className="hover edit"
          >
            edit
          </p>
          <p
            className="delete hover"
            onClick={() => {
              console.log(element.id);

              setPickedId(element.id);
              deleteDev(element.id);
            }}
          >
            delete
          </p>
        </div>
      </div>
    );
  });
};

export default Dev_card;
