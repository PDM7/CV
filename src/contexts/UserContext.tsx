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
  savePerfil: (file?: File) => Promise<void>;
  isSaving: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const nav = useNavigate();
  const repo = new Repository();

  const [perfil, setPerfil] = useState<Perfil>(() => {
    const stored = localStorage.getItem("profile");
    return stored ? JSON.parse(stored) : defaultData;
  });

  const [isSaving, setIsSaving] = useState(false);

  const savePerfil = async (file?: File) => {
    setIsSaving(true);
    let fotoURL = perfil.foto;

    if (file) {
      try {
        fotoURL = await repo.uploadToImgBB(file);
      } catch (err) {
        console.error("Falha ao enviar imagem:", err);
      }
    }

    const perfilAtualizado = await repo.saveProfile({ ...perfil, foto: fotoURL });
    setPerfil(perfilAtualizado);
    setIsSaving(false);
  };

  const logout = () => {
    setPerfil(defaultData);
    localStorage.removeItem("profile");
    nav("/login");
  };

  return (
    <UserContext.Provider value={{ perfil, setPerfil, savePerfil, isSaving, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
