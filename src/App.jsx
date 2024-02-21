import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleInitialData } from "./Actions/Shared";
import Dashboard from "./Components/Dashboard";
import Leaderboard from "./Components/Leaderboard";
import NewQuestion from "./Components/NewQuestion";
import { Routes, Route } from "react-router-dom";
import QuestionPage from "./Components/QuestionPage";
import Login from "./Components/login";
import { withLoggedIn } from "./withLoggedIn";
import { withLoggedOut } from "./withLoggedOut";
import RootLayout from "./Components/RootLayout";
import NotFound from "./Components/404";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Routes>
      <Route path="/login" exact element={withLoggedOut(Login)()} />
      <Route element={withLoggedIn(RootLayout)()}>
        <Route index element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/addNewQuestion" element={<NewQuestion />} />
        <Route path="/question/:id" element={<QuestionPage />} />
      </Route>
      <Route path="*" element={withLoggedIn(NotFound)()} />
    </Routes>
  );
};

export default App;
