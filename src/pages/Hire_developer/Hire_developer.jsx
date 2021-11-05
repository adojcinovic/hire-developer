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

  const checkAvailability = () => {
    if (moment(startDate).isAfter() && moment(endDate).isAfter(startDate)) {
      const array = [...availableDevelopers];
      developers.filter((developer) => {
        if (developer.hired.length === 0) {
          array.push(developer);
          setAvailableDevelopers(array);
        } else {
          developer.hired.filter((element) => {
            if (
              moment(element.startDate).isAfter(startDate) &&
              moment(element.endDate).isBefore(endDate)
            ) {
              array.push(developer);
              setAvailableDevelopers(array);
            }
          });
        }
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
          <button>hire selected</button>
        </div>
        {availableDevelopers.length > 0 && (
          <div className="available-developers">
            <Available_dev availableDevelopers={availableDevelopers} />
          </div>
        )}
      </div>
    </>
  );
};

export default Hire_developer;
