import React from "react";
import Banner from "./components/Banner.tsx";
import "./styles/App.scss"

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Banner></Banner>
    </div>
  );
}

export default App;
