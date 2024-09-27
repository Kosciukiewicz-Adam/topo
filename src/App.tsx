import React from "react";
import Homepage from "./pages/Homepage.tsx";
import "./styles/App.scss"
import { ParallaxProvider } from 'react-scroll-parallax';

const App: React.FC = (): JSX.Element => {
  return (
    <ParallaxProvider>
      <div className="App">
        <Homepage />
      </div>
    </ParallaxProvider>
  );
}

export default App;
