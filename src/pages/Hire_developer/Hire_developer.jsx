import "./Hire_developer.css";
import moment from "moment";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { developersContext } from "../../App";
import Available_dev from "../../components/Available_dev/Available_dev";

const Hire_developer = () => {
  const { developers } = useContext(developersContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableDevelopers, setAvailableDevelopers] = useState([]);
  const [hiredDevelopers, setHiredDevelopers] = useState([]);

  console.log(hiredDevelopers);

  const checkAvailability = () => {
    if (moment(startDate).isAfter() && moment(endDate).isAfter(startDate)) {
      const array = [...availableDevelopers];
      developers.filter((developer) => {
        if (developer.hired.length === 0) {
          array.push(developer);
        } else if (
          moment(developer.hired[0].startDate).isAfter(startDate) &&
          moment(developer.hired[0].endDate).isBefore(endDate)
        ) {
          console.log(developer.hired[0]);
          array.push(developer);
        }
        setAvailableDevelopers(array);
      });
    } else {
      alert(
        "Your start date starts before today, or your end date is before your start date."
      );
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <div className="hire-header">
        <div>please pick your dates</div>
      </div>
      <div className="top">
        <div className="dates">
          <label htmlFor="startDate">start date: </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            onChange={(event) => {
              setAvailableDevelopers([]);
              setStartDate(event.target.value);
            }}
          />
          <label htmlFor="endDate">end date: </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            onChange={(event) => {
              setAvailableDevelopers([]);
              setEndDate(event.target.value);
            }}
          />
          <button
            onClick={() => {
              checkAvailability();
            }}
          >
            check availability
          </button>
          <button
            onClick={() => {
              setHiredDevelopers(
                availableDevelopers.filter((developer) => {
                  if (developer.selected) {
                    developer.hired.push({
                      startDate: startDate,
                      endDate: endDate,
                    });
                    return developer;
                  }
                })
              );
            }}
          >
            hire selected
          </button>
        </div>
        {availableDevelopers.length > 0 && (
          <div className="available-developers">
            <Available_dev
              availableDevelopers={availableDevelopers}
              setHiredDevelopers={setHiredDevelopers}
              setAvailableDevelopers={setAvailableDevelopers}
            />
          </div>
        )}
        <hr className="horizontal-line" />
        <div className="currently-hired">
          Below listed developers are hired at the moment:
          {hiredDevelopers.map((developer) => {
            return (
              <div className="hired-dev">
                <img src={developer.profile_pic} alt="" />
                <p>{developer.name}</p>
                <p>from: {developer.hired[0].startDate}</p>
                <p>to: {developer.hired[0].endDate}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hire_developer;
