import React, { useState, createContext, ReactNode } from "react";

interface AppContextProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  roles: string;
  setRoles: (roles: string) => void;
  user: string | null;
  setUser: (user: string | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [roles, setRoles] = useState(String);
  const [user, setUser] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        roles,
        setRoles,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
