import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Listpage from "./components/Listpage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/list/:id">
          <Listpage />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
