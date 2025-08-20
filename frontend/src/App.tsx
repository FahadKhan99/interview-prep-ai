import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import UserProvider from "./context/userContext";

type Props = {};

const App = (props: Props) => {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:lessonId"
              element={<InterviewPrep />}
            />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
