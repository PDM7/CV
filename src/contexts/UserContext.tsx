import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ReactNode } from "react";
import type { Perfil } from "../types/profile";
import { defaultData } from "../default.data";
import { useNavigate } from "react-router-dom";
import Repository from "../bd/Repository";

interface UserContextType {
  perfil: Perfil;
  setPerfil: Dispatch<SetStateAction<Perfil>>;
  savePerfil: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const nav = useNavigate();
  const repo = new Repository();

  const [perfil, setPerfil] = useState<Perfil>(() => {
    const stored = localStorage.getItem("profile");
    const initialPerfil = stored ? JSON.parse(stored) : defaultData;

    const perfilAtualizado = repo.saveProfile(initialPerfil);

    return perfilAtualizado;
  });

  const savePerfil = () => {
    const perfilAtualizado = repo.saveProfile(perfil);

    setPerfil(perfilAtualizado);
  };

  const logout = () => {
    setPerfil(defaultData);
    localStorage.removeItem("profile");
    nav("/");
  };

  return (
    <UserContext.Provider value={{ perfil, setPerfil, savePerfil, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
