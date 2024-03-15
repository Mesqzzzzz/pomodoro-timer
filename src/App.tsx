import "./App.css";
import Timer from "./components/Timer";
import Settings from "./Settings";
import SettingsContext from "./components/SettingsContext";
import { useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  const contextValue = {
    workMinutes: workMinutes,
    breakMinutes: breakMinutes,
    setWorkMinutes: setWorkMinutes,
    setBreakMinutes: setBreakMinutes,
    showSettings,
    setShowSettings,
  };

  return (
    <div className="bg-image">
      <main>
        <SettingsContext.Provider value={contextValue}>
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </main>
    </div>
  );
}

export default App;
