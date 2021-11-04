import "./Dev_info.css";
import { useContext } from "react";
import { developersContext } from "../../App";

const Dev_info = (props) => {
  const { developers } = useContext(developersContext);
  const { setModalOpen, pickedId } = props;
  const dev = developers.find((element) => element.id === pickedId);
  return (
    <div className="modal">
      <p onClick={() => setModalOpen(false)} className="close">
        close
      </p>
      <div className="top">
        <img src={dev.profile_pic} alt="profile_pic" />
        <h3>Name: {dev.name}</h3>
      </div>
      <div className="details">
        <p>
          <b>Language:</b> {dev.language}
        </p>
        <p>
          <b>Email: </b>{" "}
          <a href={`mailto: ${dev.email.toLowerCase()}`}>
            {dev.email.toLowerCase()}
          </a>
        </p>
        <p>
          <b>Phone:</b> {dev.phone}
        </p>
        <p>
          <b>Location:</b> {dev.location}
        </p>
        <p>
          <b>Price per hour:</b> ${dev.price}
        </p>
        <p>
          <b>Technology:</b> {dev.technology}
        </p>
        <p>
          <b>Experience:</b> {dev.years_of_experience} years
        </p>
      </div>
    </div>
  );
};

export default Dev_info;
