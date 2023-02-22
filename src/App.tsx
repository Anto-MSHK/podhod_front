import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/MainPage/MainPage";
import {Autumn2010} from "./pages/Autumn2010/autumn2010";
import { Test } from './common/Test/Test';


function App() {
    return (
        <Routes>
            <Route element={<MainPage />} path="/"></Route>
            <Route element={<TestPage />} path="/redux-test"></Route>
            <Route element={<Autumn2010 />} path={"/uikit1"}></Route>
            <Route element={<Test />} path='/widget'></Route>
        </Routes>
    );
}

export default App;
