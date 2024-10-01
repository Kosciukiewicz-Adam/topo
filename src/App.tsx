import React from "react";
import Homepage from "./pages/Homepage.tsx";
import "./styles/App.scss"
import { ParallaxProvider } from 'react-scroll-parallax';
import { HashRouter, Routes, Route } from "react-router-dom";
import Crag from "./pages/Crag.tsx";

const App: React.FC = (): JSX.Element => {
  return (
    <ParallaxProvider>
      <HashRouter>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/crag/:cragId" Component={Crag} />
        </Routes>
      </HashRouter>
    </ParallaxProvider>
  );
}

export default App;
