import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import {TestPage} from "./pages/TestPage/TestPage";
import {MainPage} from "./pages/StylePage/StylePage";
import {Layout} from "./layout/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import {ExpoCreatePage} from "./pages/ExpoCreatePage/ExpoCreatePage";

function App() {
    return (
        <Layout>
            <Routes>
                <Route element={<MainPage/>} path="/"></Route>
                <Route element={<TestPage/>} path="/redux-test"></Route>
                <Route element={<AuthPage/>} path="/registration"></Route>
                <Route element={<ExpoCreatePage/>} path='/expocreate'></Route>
            </Routes>
        </Layout>
    );
}

export default App;
