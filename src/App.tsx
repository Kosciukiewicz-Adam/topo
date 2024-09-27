import React from "react";
import Banner from "./components/Banner.tsx";
import "./styles/App.scss"
import { ParallaxProvider } from 'react-scroll-parallax';

const App: React.FC = (): JSX.Element => {
  return (
    <ParallaxProvider>
      <div className="App">
        <Banner></Banner>
      </div>
    </ParallaxProvider>
  );
}

export default App;
