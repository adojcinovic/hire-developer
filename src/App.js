import "./App.css";
import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import Create_profile from "./pages/Create_profile/Create_profile";
import Hire_developer from "./pages/Hire_developer/Hire_developer";
import axios from "axios";

export const developersContext = React.createContext();

const DevelopersProvider = developersContext.Provider;

function App() {
  const [developers, setDevelopers] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [pickedId, setPickedId] = useState(null);

  console.log(developers);

  const getData = () => {
    axios
      .get("https://618129148bfae60017adfe77.mockapi.io/developers/")
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, [shouldFetch]);

  return (
    <Router>
      <Switch>
        <DevelopersProvider
          value={{ developers, setDevelopers, shouldFetch, setShouldFetch }}
        >
          <Route exact path="/">
            <Home
              developers={developers}
              setPickedId={setPickedId}
              pickedId={pickedId}
            />
          </Route>
          <Route exact path="/create_profile" component={Create_profile} />
          <Route exact path="/hire_developer">
            <Hire_developer />
          </Route>
        </DevelopersProvider>
      </Switch>
    </Router>
  );
}

export default App;
