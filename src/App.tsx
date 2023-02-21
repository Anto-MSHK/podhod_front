import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route element={<MainPage />} path="/"></Route>
      <Route element={<TestPage />} path="/redux-test"></Route>
    </Routes>
  );
}

export default App;
