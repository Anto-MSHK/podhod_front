import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { MainPage } from "./pages/StylePage/StylePage";
import { Layout } from "./layout/Layout";
import Auth from "./pages/Auth/Auth";
import { EventEdit } from "./pages/EventEdit/EventEdit";
import { EventsList } from "./pages/EventsList/EventsList";
import { TextBlockForm } from "./components/TextBlockForm/TextBlockForm";

function App() {
	return (
		<Layout>
			<Routes>
				<Route element={<MainPage />} path="/"></Route>
				<Route element={<TestPage />} path="/redux-test"></Route>
				<Route element={<Auth />} path="/registration"></Route>
				<Route element={<EventEdit />} path="/expo/"></Route>
				<Route element={<EventEdit />} path="/expo/:id"></Route>
				<Route element={<EventsList />} path="/event"></Route>

			</Routes>
		</Layout>
	);
}

export default App;
