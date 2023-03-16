import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/StylePage/StylePage";
import { Layout } from "./layout/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import { ExpoCreatePage } from "./pages/ExpoCreatePage/ExpoCreatePage";
import { EventOverviewPage } from "./pages/EventOverviewPage/EventOverviewPage";
import { ExpoMainPage } from './pages/ExpoCreatePage/ExpoMainForm.tsx/ExpoCreateMainForm';
import { ExpoSettings } from "./pages/ExpoCreatePage/ExpoSettings/ExpoSettings";
import { ExpoCreateExhibitsPage } from './pages/ExpoCreatePage/ExpoCreateExhibits/ExpoCreateExhibits';
import { ExpoCreateNewPage } from './pages/ExpoCreatePage/ExpoCreateNewPage/ExpoCreateNewPage';

function App() {

    return (
        <Layout>
            <Routes>
                <Route element={<MainPage />} path="/"></Route>
                <Route element={<TestPage />} path="/redux-test"></Route>
                <Route element={<AuthPage />} path="/registration"></Route>
                <Route element={<ExpoCreatePage />} path="/expo">
                    <Route path="main-info" element={<ExpoMainPage />} />
                </Route>
                <Route element={<ExpoCreatePage />} path="/expo/:id/*">
                    <Route path="main-info" element={<ExpoMainPage />} />
                    <Route path="exhibits-page" element={<ExpoCreateExhibitsPage />} />
                    <Route path="create-page" element={<ExpoCreateNewPage />} />
                    <Route path="pages/:page_id" element={<ExpoCreateNewPage />} />
                    <Route path="exhibits" element={<MainPage />} />
                    <Route path="settings" element={<ExpoSettings />} />
                </Route>
                <Route element={<EventOverviewPage />} path="/event"></Route>
            </Routes>
        </Layout>
    );
}

export default App;
