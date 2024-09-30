import React from "react";
import Homepage from "./pages/Homepage.tsx";
import "./styles/App.scss"
import { ParallaxProvider } from 'react-scroll-parallax';
import { HashRouter, Routes, Route } from "react-router-dom";

const App: React.FC = (): JSX.Element => {
  return (
    <ParallaxProvider>
      <HashRouter>
        <Routes>
          <Route path="/" Component={Homepage} />

        </Routes>
      </HashRouter>
    </ParallaxProvider>
  );
}

export default App;
