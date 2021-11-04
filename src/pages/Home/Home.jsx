import "./Home.css";
import { Link } from "react-router-dom";
import Dev_card from "../../components/Dev_card/Dev_card";
import { useContext, useState } from "react";
import { developersContext } from "../../App";
import Modal from "react-modal";
import Dev_info from "../../components/Dev_info/Dev_info";
import Dev_edit from "../../components/Dev_edit/Dev_edit";
import { MODAL_STYLE } from "./Modal_style";
import { EDIT_MODAL_STYLE } from "./Modal_style";

Modal.setAppElement("#root");

const Home = (props) => {
  const { developers } = useContext(developersContext);
  const { pickedId, setPickedId } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="home-page">
      <div className="header">
        <h3>HOME</h3>
        <Link to={`/Create_profile`}>
          <button>Create new developer profile</button>
        </Link>
      </div>
      <br />
      <div className="developers">
        <Dev_card
          setModalOpen={setModalOpen}
          setEditOpen={setEditOpen}
          setPickedId={setPickedId}
          pickedId={pickedId}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        style={MODAL_STYLE}
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <Dev_info setModalOpen={setModalOpen} pickedId={pickedId} />
      </Modal>
      <Modal
        isOpen={editOpen}
        style={EDIT_MODAL_STYLE}
        onRequestClose={() => setEditOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <Dev_edit setEditOpen={setEditOpen} pickedId={pickedId} />
      </Modal>
    </div>
  );
};

export default Home;
