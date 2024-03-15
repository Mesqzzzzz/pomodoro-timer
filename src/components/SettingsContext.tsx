// SettingsContext.js

import React from "react";

const defaultValue = {
  workMinutes: 25,
  breakMinutes: 15,
  setWorkMinutes: (minutes: number) => {},
  setBreakMinutes: (minutes: number) => {},
  setShowSettings: (settings: boolean) => {},
};

const SettingsContext = React.createContext(defaultValue);

export default SettingsContext;
