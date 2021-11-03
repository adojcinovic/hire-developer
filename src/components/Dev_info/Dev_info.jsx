import "./Dev_info.css";

const Dev_info = (props) => {
  const { setModalOpen } = props;

  return (
    <div className="modal">
      <p>Kurcina</p>
      <p onClick={() => setModalOpen(false)}>close</p>
    </div>
  );
};

export default Dev_info;
