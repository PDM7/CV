import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ReactNode } from "react";
import type { Perfil } from "../types/profile";
import { useNavigate } from "react-router-dom";
import Repository from "../bd/Repository";

interface UserContextType {
  perfil: Perfil;
  setPerfil: Dispatch<SetStateAction<Perfil>>;
  savePerfil: (file?: File) => Promise<void>;
  isSaving: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  exportarPerfil: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const nav = useNavigate();
  const repo = new Repository();

  // estado local pode ser null, mas o contexto não será exposto até ter valor
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("profile");

    if (!stored) {
      nav("/inicio");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setPerfil(parsed);
    } catch (err) {
      console.error("Perfil inválido no localStorage:", err);
      localStorage.removeItem("profile");
      nav("/inicio");
    } finally {
      setIsLoading(false);
    }
  }, [nav]);

  const login = async (email: string, senha: string) => {
    const user = await repo.login(email, senha);
    if (!user) throw new Error("Credenciais inválidas");

    setPerfil(user);
    localStorage.setItem("profile", JSON.stringify(user));
    nav("/");
  };

  const exportarPerfil = () => {
    if (!perfil) return;

    const dataStr = JSON.stringify(perfil, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "perfil.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const savePerfil = async (file?: File) => {
    if (!perfil) return;
    setIsSaving(true);

    let fotoURL = perfil.foto;
    if (file) {
      try {
        fotoURL = await repo.uploadToImgBB(file);
      } catch (err) {
        console.error("Falha ao enviar imagem:", err);
      }
    }

    const perfilAtualizado = await repo.saveProfile({
      ...perfil,
      foto: fotoURL,
    });

    setPerfil(perfilAtualizado);
    localStorage.setItem("profile", JSON.stringify(perfilAtualizado));
    setIsSaving(false);
  };

  const logout = () => {
    localStorage.removeItem("profile");
    nav("/inicio");
  };

  if (isLoading || !perfil) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        perfil: perfil,
        setPerfil: setPerfil as Dispatch<SetStateAction<Perfil>>,
        savePerfil,
        isSaving,
        logout,
        login,
        exportarPerfil
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
