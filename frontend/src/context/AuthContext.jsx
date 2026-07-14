import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [voter, setVoter] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [adminRes, voterRes] = await Promise.allSettled([
      api.get("/admin/me"),
      api.get("/voter/me"),
    ]);

    setAdmin(adminRes.status === "fulfilled" ? adminRes.value.data.admin : null);
    setVoter(voterRes.status === "fulfilled" ? voterRes.value.data.voter : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const loginAdmin = async (adminName, adminPassword) => {
    const { data } = await api.post("/admin/login", { adminName, adminPassword });
    setAdmin(data.admin);
    return data;
  };

  const loginVoter = async (voterId, password) => {
    const { data } = await api.post("/voter/login", { voterId, password });
    setVoter(data.voter);
    return data;
  };

  const logoutAdmin = async () => {
    await api.get("/admin/logout");
    setAdmin(null);
  };

  const logoutVoter = async () => {
    await api.get("/voter/logout");
    setVoter(null);
  };

  const setVoterHasVoted = () => {
    setVoter((prev) => (prev ? { ...prev, isVoted: true } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        voter,
        loading,
        loginAdmin,
        loginVoter,
        logoutAdmin,
        logoutVoter,
        setVoterHasVoted,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
