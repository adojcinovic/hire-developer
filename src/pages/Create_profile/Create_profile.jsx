import "./Create_profile.css";
import { useState } from "react";
import { useContext } from "react";
import { developersContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Create_profile = () => {
  let history = useHistory();
  const { shouldFetch, setShouldFetch } = useContext(developersContext);

  const [newDev, setNewDev] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profile_pic: "https://cdn.fakercloud.com/avatars/nbirckel_128.jpg",
    price: "",
    technology: "",
    years_of_experience: "",
    language: "",
    hired: { startDate: 1, endDate: 1 },
    selected: false,
  });

  const submitNew = () => {
    axios
      .post(`https://618129148bfae60017adfe77.mockapi.io/developers/`, newDev)
      .then(() => {
        setShouldFetch(!shouldFetch);
        history.push("/");
      });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await submitNew();
    } catch (error) {
      alert("Oops! Something went wrong... :( Please try again.");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewDev({ ...newDev, [name]: value });
  };

  const {
    name,
    email,
    phone,
    location,
    price,
    years_of_experience,
    technology,
    language,
  } = newDev;

  return (
    <>
      <Link to="/" className="link">
        Home
      </Link>
      <form action="post" onSubmit={submitForm}>
        <div className="new-dev">
          <h2>Create new developer</h2>
          <label htmlFor="name">Name: </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Enter name..."
            value={name}
            onChange={handleInput}
          />
          <label htmlFor="language">Language: </label>
          <select
            required
            name="language"
            id="language"
            value={language}
            onChange={handleInput}
          >
            <option value="">--Please choose a language--</option>
            <option value="Serbian">Serbian</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="English">English</option>
          </select>
          <label htmlFor="email">Email: </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter a valid email..."
            value={email}
            onChange={handleInput}
          />
          <label htmlFor="phone">Phone: </label>
          <input
            required
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter a phone number..."
            value={phone}
            onChange={handleInput}
          />
          <label htmlFor="location">Location: </label>
          <input
            required
            type="text"
            name="location"
            id="location"
            placeholder="Enter country..."
            value={location}
            onChange={handleInput}
          />
          <label htmlFor="price">Price per hour in $: </label>
          <input
            required
            type="text"
            id="price"
            name="price"
            placeholder="Enter a price in USD..."
            value={price}
            onChange={handleInput}
          />
          <label htmlFor="technology">technology: </label>
          <select
            required
            name="technology"
            id="technology"
            value={technology}
            onChange={handleInput}
          >
            <option value="">--Please choose technology--</option>
            <option value="php">php</option>
            <option value=".NET">.NET</option>
            <option value="python">python</option>
            <option value="javascript">javascript</option>
            <option value="flutter">flutter</option>
            <option value="JAVA">JAVA</option>
          </select>
          <label htmlFor="experience">Experience</label>
          <input
            required
            type="text"
            id="experience"
            placeholder="How many years of experience?"
            name="years_of_experience"
            value={years_of_experience}
            onChange={handleInput}
          />
          <button className="submit" type="submit">
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Create_profile;
