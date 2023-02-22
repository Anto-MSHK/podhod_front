import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/StylePage/StylePage";
import { Test } from "./common/Test/Test";
import { Header } from "./layout/Header/Header";
import { Layout } from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<MainPage />} path="/"></Route>
        <Route element={<TestPage />} path="/redux-test"></Route>
        <Route element={<Test />} path="/widget"></Route>
      </Routes>
    </Layout>
  );
}

export default App;
