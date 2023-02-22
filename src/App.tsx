import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { GroupWidget } from "./common/Widget/GroupWidget";
import { ButtonArt } from "./button.art/ButtonArt";

function App() {
    return (
        <Routes>
            <Route element={<MainPage />} path="/"></Route>
            <Route element={<TestPage />} path="/redux-test"></Route>
            <Route element={<GroupWidget />} path='/widget'></Route>
            <Route element={<ButtonArt name={"Кнопка"} />} path='/button-art'></Route>
        </Routes>
    );
}

export default App;
