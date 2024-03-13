import { useState} from "react";
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: 'user',
    avatar_url: 'https://osu.ppy.sh/images/layout/avatar-guest.png',
  });

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
