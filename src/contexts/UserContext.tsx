import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { ReactNode } from "react";
import type { Perfil } from "../types/user";
import { defaultData } from "../default.data";

interface UserContextType {
    perfil: Perfil;
    setPerfil: Dispatch<SetStateAction<Perfil>>;
    savePerfil: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [perfil, setPerfil] = useState<Perfil>(
    JSON.parse(localStorage.getItem("profile") || JSON.stringify(defaultData))
  );

  const savePerfil = () => {
    localStorage.setItem("profile", JSON.stringify(perfil));
  };

  return (
    <UserContext.Provider value={{ perfil, setPerfil, savePerfil }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
