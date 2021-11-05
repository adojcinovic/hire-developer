import "./Create_profile.css";
import { useState } from "react";
import { useContext } from "react";
import { developersContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Create_profile = () => {
  let history = useHistory();
  const { developers, setDevelopers, shouldFetch, setShouldFetch } = useContext(
    developersContext
  );

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [newDev, setNewDev] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profile_pic: "https://cdn.fakercloud.com/avatars/nbirckel_128.jpg",
    price: "",
    technology: "php",
    years_of_experience: null,
    language: "Serbian",
    hired: { startDate: 1, endDate: 1 },
  });
  const emailRegex = /\S+@\S+\.\S+/;

  const submitNew = () => {
    axios
      .post(`https://618129148bfae60017adfe77.mockapi.io/developers/`, newDev)
      .then(() => {
        setShouldFetch(!shouldFetch);
        history.push("/");
      });
  };

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

  return (
    <>
      <Link to="/" className="link">
        Home
      </Link>
      <div className="new-dev">
        <h2>Create new developer</h2>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name..."
          onChange={(event) => {
            setNewDev({ ...newDev, name: event.target.value });
          }}
        />
        <label htmlFor="language">Language: </label>
        <select
          onChange={(event) => {
            setNewDev({ ...newDev, language: event.target.value });
            console.log(newDev);
          }}
          name="language"
          id="language"
        >
          <option value="Serbian">Serbian</option>
          <option value="Bulgarian">Bulgarian</option>
          <option value="English">English</option>
        </select>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter a valid email..."
          onChange={(event) => {
            validateEmail(event);
            setNewDev({ ...newDev, email: event.target.value });
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
          onChange={(event) => {
            setNewDev({ ...newDev, phone: event.target.value });
          }}
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          placeholder="Enter country..."
          onChange={(event) => {
            setNewDev({ ...newDev, location: event.target.value });
          }}
        />
        <label htmlFor="price">Price per hour in $: </label>
        <input
          type="text"
          id="price"
          placeholder="Enter a price in USD..."
          onChange={(event) => {
            setNewDev({ ...newDev, price: event.target.value });
          }}
        />
        <label htmlFor="technology">technology: </label>
        <select
          onChange={(event) => {
            setNewDev({ ...newDev, technology: event.target.value });
          }}
          name="technology"
          id="technology"
        >
          <option value="php">php</option>
          <option value=".NET">.NET</option>
          <option value="python">python</option>
          <option value="javascript">javascript</option>
          <option value="javascript">flutter</option>
          <option value="javascript">JAVA</option>
        </select>
        <label htmlFor="experience">Experience</label>
        <input
          type="text"
          id="experience"
          placeholder="How many years of experience?"
          onChange={(event) => {
            setNewDev({ ...newDev, years_of_experience: event.target.value });
          }}
        />
        <p
          className="submit"
          onClick={() => {
            submitNew();
          }}
        >
          submit
        </p>
      </div>
    </>
  );
};

export default Create_profile;
