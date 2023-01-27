import React, { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState("00");
  const [restartTime, setRestartTime] = useState(false);

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        socketConnected,
        setSocketConnected,
        userId,
        setUserId,
        currentTime,
        setCurrentTime,
        restartTime,
        setRestartTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
