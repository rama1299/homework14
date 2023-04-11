import { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isServer = typeof window === "undefined";

    if (isServer) return;

    const token = window?.localStorage?.getItem("token");

    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ isLogin, setIsLogin }}>{children}</GlobalContext.Provider>
  );
}

function useGlobalContext() {
  return useContext(GlobalContext);
}

export { GlobalContextProvider, useGlobalContext };
