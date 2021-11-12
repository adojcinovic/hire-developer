import "./Hire_developer.css";
import moment from "moment";
import { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { developersContext } from "../../App";
import Available_dev from "../../components/Available_dev/Available_dev";
import uuid from "react-uuid";
import axios from "axios";

const Hire_developer = () => {
  const { developers, shouldFetch, setShouldFetch } = useContext(
    developersContext
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableDevelopers, setAvailableDevelopers] = useState([]);
  const [hiredDevelopers, setHiredDevelopers] = useState([]);
  const [hiredSingleDeveloper, setHiredSingleDeveloper] = useState([]);

  useEffect(() => {
    hiredDevelopers.map((developer) => {
      axios
        .put(
          `https://618129148bfae60017adfe77.mockapi.io/developers/${developer.id}`,
          developer
        )
        .then(() => {
          setShouldFetch(!shouldFetch);
        });
    });
  }, [hiredDevelopers]);

  useEffect(() => {
    hiredSingleDeveloper.map((developer) => {
      axios
        .put(
          `https://618129148bfae60017adfe77.mockapi.io/developers/${developer.id}`,
          developer
        )
        .then(() => {
          setShouldFetch(!shouldFetch);
        });
    });
  }, [hiredSingleDeveloper]);

  const checkAvailability = useCallback(() => {
    if (moment(startDate).isAfter() && moment(endDate).isAfter(startDate)) {
      const array = developers.filter((developer) => {
        return developer.hired.every((job) => {
          return (
            moment(startDate).isAfter(job.endDate) ||
            moment(endDate).isBefore(job.startDate)
          );
        });
      });
      console.log(array);

      setAvailableDevelopers(array);
    } else {
      alert(
        "Your start date starts before today, or your end date is before your start date."
      );
    }
  });

  return (
    <>
      <Link to="/">Home</Link>
      <div className="hire-header">
        <div>
          please pick your dates, and note that I fixed the bug with filtering
          available developers in previous commit :)
        </div>
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
              let tempHiredDevelopers = [];
              tempHiredDevelopers = availableDevelopers.filter((developer) => {
                if (developer.selected) {
                  developer.selected = !developer.selected;
                  developer.hired.push({
                    startDate: startDate,
                    endDate: endDate,
                    hiredAs: "team",
                  });
                  return developer;
                }
              });
              setHiredDevelopers(tempHiredDevelopers);
              setAvailableDevelopers([]);
            }}
          >
            hire team of developers
          </button>
          <button
            onClick={() => {
              let tempSingleHiredArray = [];
              tempSingleHiredArray = availableDevelopers.filter((developer) => {
                if (developer.selected) {
                  developer.selected = !developer.selected;
                  developer.hired.push({
                    startDate: startDate,
                    endDate: endDate,
                    hiredAs: "individual",
                  });
                  return developer;
                }
              });
              setHiredSingleDeveloper(tempSingleHiredArray);
              setAvailableDevelopers([]);
            }}
          >
            hire single developer
          </button>
        </div>
        {availableDevelopers.length > 0 && (
          <div className="available-developers">
            <Available_dev
              availableDevelopers={availableDevelopers}
              setAvailableDevelopers={setAvailableDevelopers}
            />
          </div>
        )}
        <hr className="horizontal-line" />
        <div className="currently-hired">
          Below listed developers are hired:
          {developers.map((developer) => {
            if (developer.hired.length > 0)
              return (
                <div key={developer.id} className="hired-dev">
                  <img src={developer.profile_pic} alt="profile_pic" />
                  <p>{developer.name}</p>
                  <p>
                    from:
                    {developer.hired.map((element) => {
                      return <p key={uuid()}>{element.startDate}</p>;
                    })}
                  </p>
                  <p>
                    to:{" "}
                    {developer.hired.map((element) => {
                      return <p key={uuid()}>{element.endDate}</p>;
                    })}
                  </p>
                  <p>
                    hired as:{" "}
                    {developer.hired.map((element) => {
                      return <p key={uuid()}>{element.hiredAs}</p>;
                    })}
                  </p>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default Hire_developer;
