import "./Home.css";
import { Link } from "react-router-dom";
import Dev_card from "../../components/Dev_card/Dev_card";
import { useContext } from "react";
import { developersContext } from "../../App";

const Home = () => {
  const { developers } = useContext(developersContext);
  console.log(developers);

  return (
    <div className="home-page">
      HOME
      <br />
      <Link to={`/Create_profile`}>Create new developer profile</Link>
      <br />
      <div className="developers">
        <Dev_card />
      </div>
    </div>
  );
};

export default Home;
