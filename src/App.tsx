import React from "react";
import "./styles/App.scss"
import { HashRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "./sharedComponents";
import CragsList from "./pages/CragsList";
import CragPage from "./pages/CragPage";
import Homepage from "./pages/HomePage";

const App: React.FC = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/crag/:cragId" Component={CragPage} />
        <Route path="/crags" Component={CragsList} />
        <Route path="*" Component={() => <ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
