import "./Home.css";
import { Link } from "react-router-dom";
import Dev_card from "../../components/Dev_card/Dev_card";
import { useContext, useState } from "react";
import { developersContext } from "../../App";
import Modal from "react-modal";
import Dev_info from "../../components/Dev_info/Dev_info";
import { MODAL_STYLE } from "./Modal_style";

Modal.setAppElement("#root");

const Home = (props) => {
  const { developers } = useContext(developersContext);
  const { pickedId, setPickedId } = props;
  console.log(developers);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(setPickedId);

  return (
    <div className="home-page">
      HOME
      <br />
      <Link to={`/Create_profile`}>Create new developer profile</Link>
      <Link to={`/Edit_dev`}>Edit dev</Link>
      <br />
      <div className="developers">
        <Dev_card setModalOpen={setModalOpen} setPickedId={setPickedId} />
      </div>
      <Modal
        isOpen={modalOpen}
        style={MODAL_STYLE}
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <Dev_info setModalOpen={setModalOpen} />
      </Modal>
    </div>
  );
};

export default Home;
