import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/StylePage/StylePage";
import { Layout } from "./layout/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import { ExpoCreatePage } from "./pages/ExpoCreatePage/ExpoCreatePage";
import { EventOverviewPage } from "./pages/EventOverviewPage/EventOverviewPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<MainPage />} path="/"></Route>
        <Route element={<TestPage />} path="/redux-test"></Route>
        <Route element={<AuthPage />} path="/registration"></Route>
        <Route element={<ExpoCreatePage />} path="/expo/"></Route>
        <Route element={<ExpoCreatePage />} path="/expo/:id"></Route>
        <Route element={<EventOverviewPage />} path="/event"></Route>
      </Routes>
    </Layout>
  );
}

export default App;
