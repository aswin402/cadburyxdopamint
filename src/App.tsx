import { useState } from "react";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/login";
import MeetSantaPage from "./pages/meet-santa";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "login" | "meet-santa">("home");
  const [userName, setUserName] = useState<string | null>(null);
  const [unicode, setUnicode] = useState<string | null>(null);

  const navigateToHome = () => {
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToLogin = () => {
    setCurrentPage("login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToMeetSanta = () => {
    setCurrentPage("meet-santa");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "meet-santa") {
    return (
      <MeetSantaPage
        userName={userName}
        unicode={unicode}
        onEndCall={navigateToHome}
      />
    );
  }

  if (currentPage === "login") {
    return (
      <LoginPage
        onBackToHome={navigateToHome}
        onLoginSuccess={(name, code) => {
          setUserName(name);
          setUnicode(code);
        }}
        onNavigateToMeetSanta={navigateToMeetSanta}
      />
    );
  }

  return (
    <Homepage
      onNavigateToLogin={navigateToLogin}
      onNavigateToHome={navigateToHome}
    />
  );
}

export default App;