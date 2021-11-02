import "./App.css";
import Devs from "./Devs";
import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import Create_profile from "./pages/Create_profile/Create_profile";
import Create_team from "./pages/Hire_dev/Hire_dev";
import Edit_dev from "./pages/Edit_dev/Edit_dev";

export const developersContext = React.createContext();

const DevelopersProvider = developersContext.Provider;

function App() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch("https://618129148bfae60017adfe77.mockapi.io/developers")
      .then((res) => res.json())
      .then((data) => setDevelopers(data));
  }, []);
  console.log(developers);

  return (
    <Router>
      <Switch>
        <DevelopersProvider value={{ developers }}>
          <Route exact path="/" component={Home} developers={developers} />
          <Route exact path="/create_profile" component={Create_profile} />
          <Route exact path="/create_team" component={Create_team} />
          <Route exact path="/edit_dev" component={Edit_dev} />
        </DevelopersProvider>
      </Switch>
    </Router>
  );
}

export default App;
