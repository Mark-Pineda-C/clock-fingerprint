import { createContext, useContext } from "react";
import { UserData } from "./MapUtils";

export type AuthContextType = {
  user: UserData | undefined
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);