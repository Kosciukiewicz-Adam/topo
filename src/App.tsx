import React from "react";
import Homepage from "./pages/Homepage.tsx";
import "./styles/App.scss"
import { ParallaxProvider } from 'react-scroll-parallax';
import { HashRouter, Routes, Route } from "react-router-dom";

const App: React.FC = (): JSX.Element => {
  return (
    <HashRouter basename="/app">
      <ParallaxProvider>
        <Routes>
          <Route path="/" >
            <Homepage />
          </Route>
          <Route path="/topo:regionId" >
            <div className="route">AAAAA</div>
          </Route>
        </Routes>
      </ParallaxProvider>
    </HashRouter>
  );
}

export default App;
