import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./pages/Saved";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Navbar onClick={Home.handleArticleScrape}/>
        <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/saved" component={Saved} />
        </Wrapper>
    </div>
  </Router>
);

export default App;