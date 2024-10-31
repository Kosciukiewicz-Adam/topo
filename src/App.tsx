import React from "react";
import "./styles/App.scss"
import { ParallaxProvider } from 'react-scroll-parallax';
import { HashRouter, Routes, Route } from "react-router-dom";
import CragPage from "./pages/CragPage/index.tsx";
import CragsList from "./pages/CragsList.tsx";
import Homepage from "./pages/HomePage/index.tsx";


const App: React.FC = (): JSX.Element => {
  return (
    <ParallaxProvider>
      <HashRouter>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/crag/:cragId" Component={CragPage} />
          <Route path="/crags" Component={CragsList} />
          <Route path="/about" Component={() => <>ABOUT</>} />
        </Routes>
      </HashRouter>
    </ParallaxProvider>
  );
}

export default App;
