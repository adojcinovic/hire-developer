import "./Available_dev.css";

const Available_dev = (props) => {
  const { availableDevelopers } = props;

  return availableDevelopers.map((developer) => {
    return (
      <div key={developer.id} className="available">
        <img src={developer.profile_pic} alt="avatar" />
        <div className="info">
          <p className="name">{developer.name}</p>
          <a href={`mailto: ${developer.email?.toLowerCase()}`}>
            {developer.email.toLowerCase()}
          </a>
          <p>Price: ${developer.price}</p>
          <p>Language: {developer.language}</p>
          <p>Location: {developer.location}</p>
          <p>Technology: {developer.technology}</p>
          <input
            type="checkbox"
            name="hired"
            id="hired"
            onChange={() => {
              developer.selected = !developer.selected;
            }}
          />
        </div>
      </div>
    );
  });
};

export default Available_dev;
