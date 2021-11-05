import "./Available_dev.css";

const Available_dev = (props) => {
  const { availableDevelopers } = props;
  console.log(availableDevelopers);

  return availableDevelopers.map((developer) => {
    return (
      <div className="available">
        <img src={developer.profile_pic} alt="avatar" />
        <p className="name">Name: {developer.name}</p>
        <p>email: {developer.email?.toLowerCase()}</p>
        <p>Price: ${developer.price}</p>
        <p>Language: {developer.language}</p>
        <p>Location: {developer.location}</p>
        <p>Technology: {developer.technology}</p>
      </div>
    );
  });
};

export default Available_dev;
