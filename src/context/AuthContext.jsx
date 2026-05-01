import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("qurbanihat_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async ({ name, email, photoURL, password }) => {
    // Mock registration
    const users = JSON.parse(localStorage.getItem("qurbanihat_users") || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("এই ইমেইলটি আগে থেকে নিবন্ধিত।");
    }
    const newUser = { name, email, photoURL: photoURL || "", password, uid: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem("qurbanihat_users", JSON.stringify(users));
    return newUser;
  };

  const login = async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("qurbanihat_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem("qurbanihat_user", JSON.stringify(safeUser));
    return safeUser;
  };

  const googleLogin = async () => {
    // Mock Google login
    const mockGoogleUser = {
      uid: "google_" + Date.now(),
      name: "Google User",
      email: "googleuser@gmail.com",
      photoURL: "https://ui-avatars.com/api/?name=Google+User&background=4CAF50&color=fff",
    };
    setUser(mockGoogleUser);
    localStorage.setItem("qurbanihat_user", JSON.stringify(mockGoogleUser));
    return mockGoogleUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("qurbanihat_user");
  };

  const updateProfile = ({ name, photoURL }) => {
    const updated = { ...user, name, photoURL };
    setUser(updated);
    localStorage.setItem("qurbanihat_user", JSON.stringify(updated));
    // Update in users list too
    const users = JSON.parse(localStorage.getItem("qurbanihat_users") || "[]");
    const idx = users.findIndex((u) => u.uid === user.uid);
    if (idx !== -1) {
      users[idx] = { ...users[idx], name, photoURL };
      localStorage.setItem("qurbanihat_users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
