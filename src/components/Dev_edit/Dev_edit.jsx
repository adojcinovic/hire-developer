import "./Dev_edit.css";
import { useContext, useState } from "react";
import { developersContext } from "../../App";
import axios from "axios";

const Dev_edit = (props) => {
  const { developers, setDevelopers, shouldFetch, setShouldFetch } = useContext(
    developersContext
  );
  const { setEditOpen, pickedId } = props;
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const dev = developers.find((element) => element.id === pickedId);
  const [editedDev, setEditedDev] = useState(dev);
  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("Success");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email.");
    }
  };

  const submit = () => {
    axios
      .put(
        `https://618129148bfae60017adfe77.mockapi.io/developers/${pickedId}`,
        editedDev
      )
      .then((response) => {
        if (response.statusText === "OK") {
          setShouldFetch(!shouldFetch);
          setEditOpen(false);
        }
      });
  };

  return (
    <div className="modal">
      <p onClick={() => setEditOpen(false)} className="close">
        close
      </p>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={dev.name}
          placeholder="Enter name..."
          onChange={(event) => {
            setEditedDev({ ...editedDev, name: event.target.value });
            console.log(editedDev);
          }}
        />
        <label htmlFor="language">Language: </label>
        <input
          type="text"
          name="language"
          id="language"
          s
          defaultValue={dev.language}
          placeholder="Enter a language..."
          onChange={(event) => {
            setEditedDev({ ...editedDev, language: event.target.value });
          }}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          className="email"
          defaultValue={dev.email.toLowerCase()}
          placeholder="Enter a valid email..."
          onChange={(event) => {
            validateEmail(event);
            setEditedDev({ ...editedDev, email: event.target.value });
          }}
        />
        <div className={`message ${isValid ? "success" : "error"}`}>
          {message}
        </div>
        <label htmlFor="phone">Phone: </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter a phone number..."
          defaultValue={dev.phone}
          onChange={(event) => {
            setEditedDev({ ...editedDev, phone: event.target.value });
          }}
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          defaultValue={dev.location}
          placeholder="Enter country..."
          onChange={(event) => {
            setEditedDev({ ...editedDev, location: event.target.value });
          }}
        />
        <label htmlFor="price">Price per hour in $: </label>
        <input
          type="text"
          id="price"
          defaultValue={`${dev.price}`}
          placeholder="Enter a price in USD..."
          onChange={(event) => {
            setEditedDev({ ...editedDev, price: event.target.value });
          }}
        />
        <label htmlFor="technology">technology: </label>
        <input
          type="text"
          id="technology"
          defaultValue={dev.technology}
          placeholder="Enter a technology..."
          onChange={(event) => {
            setEditedDev({ ...editedDev, technology: event.target.value });
          }}
        />
        <label htmlFor="experience">Experience</label>
        <input
          type="text"
          id="experience"
          defaultValue={dev.years_of_experience}
          placeholder="How many years of experience?"
          onChange={(event) => {
            setEditedDev({
              ...editedDev,
              years_of_experience: event.target.value,
            });
          }}
        />
      </div>
      <p
        className="submit"
        onClick={() => {
          submit();
        }}
      >
        submit
      </p>
    </div>
  );
};

export default Dev_edit;
