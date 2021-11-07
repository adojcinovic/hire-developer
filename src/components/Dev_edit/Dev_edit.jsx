import "./Dev_edit.css";
import { useContext, useState } from "react";
import { developersContext } from "../../App";
import axios from "axios";

const Dev_edit = (props) => {
  const { developers, shouldFetch, setShouldFetch } = useContext(
    developersContext
  );
  const { setEditOpen, pickedId } = props;
  const dev = developers.find((element) => element.id === pickedId);
  const [editedDev, setEditedDev] = useState(dev);
  const {
    name,
    email,
    phone,
    location,
    price,
    years_of_experience,
    technology,
    language,
  } = dev;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEditedDev({ ...editedDev, [name]: value });
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

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await submit();
    } catch (error) {
      alert("Oops! Something went wrong... :( Please try again.");
    }
  };

  return (
    <div className="modal">
      <p onClick={() => setEditOpen(false)} className="close">
        close
      </p>
      <form method="post" onSubmit={submitForm}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            placeholder="Enter name..."
            onChange={handleInput}
          />
          <label htmlFor="language">Language: </label>
          <input
            required
            type="text"
            name="language"
            id="language"
            s
            defaultValue={language}
            placeholder="Enter a language..."
            onChange={handleInput}
          />
          <label htmlFor="email">Email: </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="email"
            defaultValue={email.toLowerCase()}
            placeholder="Enter a valid email..."
            onChange={handleInput}
          />
          <label htmlFor="phone">Phone: </label>
          <input
            required
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter a phone number..."
            defaultValue={phone}
            onChange={handleInput}
          />
          <label htmlFor="location">Location: </label>
          <input
            required
            type="text"
            id="location"
            name={location}
            defaultValue={location}
            placeholder="Enter country..."
            onChange={handleInput}
          />
          <label htmlFor="price">Price per hour in $: </label>
          <input
            required
            type="text"
            id="price"
            name={price}
            defaultValue={`$${price}`}
            placeholder="Enter a price in USD..."
            onChange={handleInput}
          />
          <label htmlFor="technology">technology: </label>
          <input
            required
            type="text"
            id="technology"
            name={technology}
            defaultValue={technology}
            placeholder="Enter a technology..."
            onChange={handleInput}
          />
          <label htmlFor="experience">Experience</label>
          <input
            required
            type="text"
            id="experience"
            name={years_of_experience}
            defaultValue={years_of_experience}
            placeholder="How many years of experience?"
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Dev_edit;
