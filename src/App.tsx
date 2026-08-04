import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/login";
import MeetSantaPage from "./pages/meet-santa";
import CompanionPickerPage from "./pages/companion/PickerPage";
import CompanionChatPage from "./pages/companion/ChatPage";
import CompanionLauncher from "./components/companion/CompanionLauncher";
import ScrollToTop from "./components/ScrollToTop";

function HomeLayout() {
  return (
    <>
      <Homepage />
      <CompanionLauncher />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/meet-santa" element={<MeetSantaPage />} />
        <Route path="/companions" element={<CompanionPickerPage />} />
        <Route path="/companions/:companionId" element={<CompanionChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
