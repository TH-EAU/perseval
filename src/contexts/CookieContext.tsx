// CookieContext.js
import React, { createContext, ReactNode, useContext } from "react";
import useCookie from "react-use-cookie";

interface CookieContextType {
  cookieValue: string;
  updateCookie: (value: string) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export const CookieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cookieValue, setCookieValue] = useCookie("hassub", "false");

  const updateCookie = (value: string) => {
    setCookieValue(value);
  };

  return (
    <CookieContext.Provider value={{ cookieValue, updateCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieContext = (): CookieContextType => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieContext must be used within a CookieProvider");
  }
  return context;
};
